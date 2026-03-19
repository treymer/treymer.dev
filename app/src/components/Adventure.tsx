"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | "select"
  | "encounter1"
  | "encounter2"
  | "combat"
  | "victory"
  | "defeat";

type DieSize = 6 | 8 | 10 | 12;

interface CharClass {
  id: "fighter" | "wizard" | "rogue" | "bard";
  name: string;
  icon: string;
  flavor: string;
  maxHp: number;
  atkDie: DieSize;
  atkBonus: number;
  skillBonus: number;
  special: string;
  specialDesc: string;
  specialCooldown: number;
}

interface CombatLogEntry {
  turn: number;
  actor: "player" | "dragon";
  text: string;
  isCrit?: boolean;
}

interface CombatState {
  playerHp: number;
  playerMaxHp: number;
  dragonHp: number;
  turn: number;
  specialLastUsed: number | null;
  potionUsed: boolean;
  log: CombatLogEntry[];
}

interface CombatRollInfo {
  raw: number;
  total: number | null;  // null = Second Wind (no attack roll)
  hit: boolean | null;   // null = Fireball (always hits)
  isSecondWind: boolean;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CHARS: CharClass[] = [
  {
    id: "fighter",
    name: "Gareth Ironshield",
    icon: "⚔️",
    flavor: "Frontline tank. High HP, reliable damage. Uses d10.",
    maxHp: 30,
    atkDie: 10,
    atkBonus: 4,
    skillBonus: 2,
    special: "Second Wind",
    specialDesc: "Heal 8 HP (costs your attack)",
    specialCooldown: 99,
  },
  {
    id: "wizard",
    name: "Lyra Spellweave",
    icon: "🔮",
    flavor: "Glass cannon. Low HP but ignores dragon armor. Uses d6.",
    maxHp: 18,
    atkDie: 6,
    atkBonus: 2,
    skillBonus: 3,
    special: "Fireball",
    specialDesc: "3d6 damage, always hits (3-turn cooldown)",
    specialCooldown: 3,
  },
  {
    id: "rogue",
    name: "Shade Nightfall",
    icon: "🗡️",
    flavor: "Burst damage. Doubles attack dice on Sneak Attack. Uses d8.",
    maxHp: 22,
    atkDie: 8,
    atkBonus: 3,
    skillBonus: 4,
    special: "Sneak Attack",
    specialDesc: "Double your attack dice (2-turn cooldown)",
    specialCooldown: 2,
  },
  {
    id: "bard",
    name: "Finnegan Silverstring",
    icon: "🎸",
    flavor: "Support/damage hybrid. Heals on special. Uses d6.",
    maxHp: 20,
    atkDie: 6,
    atkBonus: 2,
    skillBonus: 2,
    special: "Battle Hymn",
    specialDesc: "+1d6 damage AND heal 4 HP (2-turn cooldown)",
    specialCooldown: 2,
  },
];

const ENCOUNTER_1 = {
  title: "The Crumbling Bridge",
  description:
    "A rope bridge spans a chasm of magma. The planks are rotten, the ropes fraying. One wrong step and it's over.",
  prompt: "Roll a d20 to cross safely. DC 12.",
  dc: 12,
  successText:
    "You read the bridge perfectly, stepping only where the ropes hold. You find a healing herb on the far side. (+5 HP)",
  failureText:
    "A plank gives way. You barely catch the rope — but your leg drags through smoke and heat. (−5 HP)",
  successHp: 5,
  failureHp: -5,
};

// Encounter 2 branches based on encounter 1 outcome
const ENCOUNTER_2_SUCCESS = {
  title: "The Guardian Shade",
  description:
    "A spectral warrior bars the passage — wreathed in shadow, face unseen. It has stood here since Malachar first rose. Your clean crossing has not gone unnoticed.",
  prompt: "Roll a d20 to banish it. DC 15.",
  dc: 15,
  successText:
    "Your willpower is iron. The shade dissolves with a keening cry, leaving behind a faint warmth. (+4 HP)",
  failureText:
    "Its claws find purchase. The cold is worse than any blade. (−8 HP)",
  successHp: 4,
  failureHp: -8,
};

const ENCOUNTER_2_FAILURE = {
  title: "The Serpent Nest",
  description:
    "Your fall dropped you into a lower cavern — a winding back-passage through the rock. It would be a gift, except it's filled with sleeping shadow serpents coiled across every surface.",
  prompt: "Roll a d20 to sneak through without waking them. DC 13.",
  dc: 13,
  successText:
    "You move without sound, barely breathing. The serpents stir but don't wake. You emerge into the dragon's antechamber — battered, but alive. (+3 HP)",
  failureText:
    "One eye opens. Then a dozen. Fangs find you before you can run. The venom burns. (−7 HP)",
  successHp: 3,
  failureHp: -7,
};

const DRAGON = {
  name: "Malachar the Ancient",
  maxHp: 60,
  ac: 14,
  atkMin: 4,
  atkMax: 14,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rollDie(sides: number): number {
  return Math.ceil(Math.random() * sides);
}

function HpBar({ hp, maxHp }: { hp: number; maxHp: number }) {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const color = pct > 60 ? "#0EA89A" : pct > 30 ? "#D4A017" : "#CC2222";
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#2D1B0E]/30">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function DiceWidget({
  spinning,
  value,
  finalValue,
}: {
  spinning: boolean;
  value: number;
  finalValue: number | null;
}) {
  const borderColor = spinning
    ? "border-[#D4A017]"
    : finalValue === null
    ? "border-[#8B6914]"
    : finalValue >= 15
    ? "border-[#0EA89A]"
    : finalValue >= 10
    ? "border-[#D4A017]"
    : "border-[#CC2222]";

  const textColor = spinning
    ? "text-[#D4A017]"
    : finalValue === null
    ? "text-[var(--text-muted)]"
    : finalValue >= 15
    ? "text-[#0EA89A]"
    : finalValue >= 10
    ? "text-[#D4A017]"
    : "text-[#CC2222]";

  return (
    <div
      className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-4 bg-[#F4E4C1] shadow-lg transition-all duration-200 ${borderColor} ${spinning ? "animate-pulse" : ""}`}
    >
      <span className={`font-display text-4xl font-bold ${textColor}`}>
        {value}
      </span>
    </div>
  );
}

// ─── Scene illustrations ──────────────────────────────────────────────────────

function SelectSVG() {
  return (
    <svg viewBox="0 0 600 160" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sel-glow" cx="50%" cy="100%" r="65%">
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0D0800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sel-t1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8800" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0D0800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sel-t2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8800" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0D0800" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="160" fill="#0D0800" />
      <rect width="600" height="160" fill="url(#sel-glow)" />
      <rect x="0" y="0" width="192" height="160" fill="#181000" />
      <rect x="408" y="0" width="192" height="160" fill="#181000" />
      {/* Archway */}
      <path d="M192,160 L192,68 Q300,8 408,68 L408,160Z" fill="#0D0800" />
      <path d="M180,160 L180,68 Q300,3 420,68 L420,160" stroke="#2A1E08" strokeWidth="16" fill="none" />
      <path d="M192,68 Q300,8 408,68" stroke="#4A3010" strokeWidth="5" fill="none" />
      {/* Keystone */}
      <path d="M287,12 L300,6 L313,12 L308,26 L292,26Z" fill="#3A2808" />
      {/* Torch halos */}
      <ellipse cx="184" cy="98" rx="52" ry="42" fill="url(#sel-t1)" />
      <ellipse cx="416" cy="98" rx="52" ry="42" fill="url(#sel-t2)" />
      {/* Left torch */}
      <rect x="180" y="100" width="8" height="20" fill="#5C3D1E" rx="1" />
      <ellipse cx="184" cy="97" rx="6" ry="10" fill="#FF8800" />
      <ellipse cx="184" cy="91" rx="4" ry="7" fill="#FFCC00" opacity="0.85" />
      <ellipse cx="184" cy="86" rx="2" ry="4" fill="#FFFFFF" opacity="0.5" />
      {/* Right torch */}
      <rect x="412" y="100" width="8" height="20" fill="#5C3D1E" rx="1" />
      <ellipse cx="416" cy="97" rx="6" ry="10" fill="#FF8800" />
      <ellipse cx="416" cy="91" rx="4" ry="7" fill="#FFCC00" opacity="0.85" />
      <ellipse cx="416" cy="86" rx="2" ry="4" fill="#FFFFFF" opacity="0.5" />
      {/* Distant light at tunnel end */}
      <circle cx="300" cy="135" r="28" fill="#D4A017" opacity="0.07" />
      <circle cx="300" cy="135" r="10" fill="#FF8800" opacity="0.12" />
      <line x1="192" y1="159" x2="408" y2="159" stroke="#2A1E08" strokeWidth="2" />
    </svg>
  );
}

function BridgeSVG() {
  const planks = [0, 1, 2, 3, 5, 7, 8, 9, 10];
  return (
    <svg viewBox="0 0 600 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="br-lava" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#FF6600" />
          <stop offset="40%" stopColor="#CC2200" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0D0500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="180" fill="#120800" />
      <rect width="600" height="180" fill="url(#br-lava)" />
      {/* Cliffs */}
      <path d="M0,0 L0,180 L195,180 L195,88 Q182,78 162,84 L138,72 L0,0Z" fill="#2A1608" />
      <path d="M600,0 L600,180 L405,180 L405,88 Q418,78 438,84 L462,72 L600,0Z" fill="#2A1608" />
      {/* Lava surface */}
      <ellipse cx="300" cy="174" rx="220" ry="30" fill="#FF4400" />
      <ellipse cx="300" cy="175" rx="162" ry="21" fill="#FF7700" opacity="0.8" />
      <ellipse cx="292" cy="176" rx="88" ry="14" fill="#FFB300" opacity="0.55" />
      {/* Bridge ropes */}
      <path d="M195,88 Q300,116 405,88" stroke="#8B6914" strokeWidth="2.5" fill="none" />
      <path d="M195,96 Q300,124 405,96" stroke="#8B6914" strokeWidth="2.5" fill="none" />
      {/* Planks */}
      {planks.map((i) => {
        const t = i / 10;
        const x = 195 + t * 210;
        const sag = Math.sin(t * Math.PI) * 28;
        return <rect key={i} x={x - 3} y={87 + sag} width="6" height="11" fill="#4A2E12" rx="1" />;
      })}
      {/* Broken plank dangling */}
      <line x1="327" y1="102" x2="332" y2="120" stroke="#4A2E12" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      {/* Steam wisps */}
      <path d="M248,148 C246,133 252,122 248,107" stroke="white" strokeWidth="2" fill="none" opacity="0.1" strokeLinecap="round" />
      <path d="M308,143 C306,127 312,115 308,100" stroke="white" strokeWidth="2" fill="none" opacity="0.08" strokeLinecap="round" />
      <path d="M362,148 C360,133 366,121 362,106" stroke="white" strokeWidth="2" fill="none" opacity="0.1" strokeLinecap="round" />
      {/* Embers */}
      <circle cx="262" cy="128" r="1.5" fill="#FF8800" opacity="0.7" />
      <circle cx="338" cy="118" r="1" fill="#FFAA00" opacity="0.6" />
      <circle cx="294" cy="136" r="1" fill="#FF6600" opacity="0.5" />
    </svg>
  );
}

function ShadeSVG() {
  return (
    <svg viewBox="0 0 600 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sh-glow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1A0D2E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sh-fig" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8C0FF" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#7B61FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3D1F8C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="180" fill="#0F0818" />
      {/* Stone wall bands */}
      {[28, 68, 108, 148].map((y) => (
        <rect key={y} x="0" y={y} width="600" height="7" fill="#160D22" opacity="0.5" />
      ))}
      {/* Side walls */}
      <rect x="0" y="0" width="200" height="180" fill="#160D22" />
      <rect x="400" y="0" width="200" height="180" fill="#160D22" />
      {/* Archway */}
      <path d="M200,180 L200,78 Q300,28 400,78 L400,180Z" fill="#0F0818" />
      <path d="M188,180 L188,78 Q300,22 412,78 L412,180" stroke="#221440" strokeWidth="16" fill="none" />
      <path d="M200,78 Q300,28 400,78" stroke="#3D2460" strokeWidth="5" fill="none" />
      {/* Spectral glow */}
      <ellipse cx="300" cy="90" rx="85" ry="92" fill="url(#sh-glow)" />
      {/* Figure body */}
      <ellipse cx="300" cy="96" rx="22" ry="52" fill="url(#sh-fig)" opacity="0.8" />
      {/* Arms */}
      <path d="M278,80 L244,98 L252,108" stroke="#9B8FFF" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M322,80 L356,98 L348,108" stroke="#9B8FFF" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
      {/* Head */}
      <circle cx="300" cy="46" r="15" fill="#C0B8FF" opacity="0.72" />
      {/* Eyes */}
      <circle cx="294" cy="44" r="3" fill="#FFFFFF" opacity="0.95" />
      <circle cx="306" cy="44" r="3" fill="#FFFFFF" opacity="0.95" />
      {/* Spectral sword */}
      <path d="M322,62 L362,104" stroke="#C8C4FF" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M316,68 L322,62 L328,68" stroke="#C8C4FF" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Floating wisps */}
      <circle cx="232" cy="52" r="4" fill="#7B61FF" opacity="0.5" />
      <circle cx="368" cy="68" r="3" fill="#7B61FF" opacity="0.4" />
      <circle cx="258" cy="142" r="2.5" fill="#9B8FFF" opacity="0.5" />
      <circle cx="342" cy="132" r="3.5" fill="#7B61FF" opacity="0.4" />
      <circle cx="218" cy="118" r="2" fill="#8B7FFF" opacity="0.35" />
      {/* Ground mist */}
      <ellipse cx="300" cy="176" rx="115" ry="12" fill="#3D1F8C" opacity="0.18" />
    </svg>
  );
}

function SerpentsSVG() {
  const stalactites: [number, number][] = [[58,48],[118,36],[178,28],[252,44],[332,32],[402,50],[468,40],[528,26]];
  const stalagmites: [number, number][] = [[78,24],[158,34],[282,20],[382,38],[482,26],[548,18]];
  return (
    <svg viewBox="0 0 600 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ser-amb" cx="50%" cy="75%" r="60%">
          <stop offset="0%" stopColor="#003318" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#050F08" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="180" fill="#060C08" />
      <rect width="600" height="180" fill="url(#ser-amb)" />
      {/* Stalactites */}
      {stalactites.map(([x, h], i) => (
        <path key={i} d={`M${x - 9},0 L${x},${h} L${x + 9},0Z`} fill="#0C1A0E" />
      ))}
      {/* Ground */}
      <rect x="0" y="154" width="600" height="26" fill="#0C1A0E" />
      {/* Stalagmites */}
      {stalagmites.map(([x, h], i) => (
        <path key={i} d={`M${x - 7},180 L${x},${180 - h} L${x + 7},180Z`} fill="#0C1A0E" />
      ))}
      {/* Serpent bodies — double-stroked for scale effect */}
      <path d="M40,158 Q70,138 108,146 Q138,153 160,138 Q182,124 200,134" stroke="#172E1C" strokeWidth="17" fill="none" strokeLinecap="round" />
      <path d="M40,158 Q70,138 108,146 Q138,153 160,138 Q182,124 200,134" stroke="#102212" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M175,153 Q210,128 258,138 Q296,148 318,128 Q340,108 378,122 Q412,136 432,122" stroke="#172E1C" strokeWidth="19" fill="none" strokeLinecap="round" />
      <path d="M175,153 Q210,128 258,138 Q296,148 318,128 Q340,108 378,122 Q412,136 432,122" stroke="#102212" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M425,142 Q458,127 490,138 Q518,148 542,133 Q562,122 580,135" stroke="#172E1C" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d="M425,142 Q458,127 490,138 Q518,148 542,133 Q562,122 580,135" stroke="#102212" strokeWidth="11" fill="none" strokeLinecap="round" />
      {/* Eyes — pairs with glow rings */}
      {([[195,132],[205,132],[426,120],[436,120],[574,131],[583,131]] as [number,number][]).map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#003322" opacity="0.8" />
          <circle cx={x} cy={y} r="2" fill="#00FF88" opacity="0.95" />
        </g>
      ))}
      {/* Distant eyes in darkness */}
      <circle cx="292" cy="74" r="1.8" fill="#00AA55" opacity="0.55" />
      <circle cx="302" cy="74" r="1.8" fill="#00AA55" opacity="0.55" />
      <circle cx="98" cy="100" r="1.4" fill="#008844" opacity="0.38" />
      <circle cx="107" cy="100" r="1.4" fill="#008844" opacity="0.38" />
    </svg>
  );
}

function DragonCombatSVG() {
  return (
    <svg viewBox="0 0 600 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dc-fire" cx="15%" cy="52%" r="55%">
          <stop offset="0%" stopColor="#FF8800" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#CC2200" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#1A0500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="180" fill="#050200" />
      <rect width="600" height="180" fill="url(#dc-fire)" />
      {/* Cave ceiling */}
      <path d="M0,0 L0,28 Q32,14 62,26 Q92,9 122,22 Q152,7 182,20 L182,0Z" fill="#120800" />
      <path d="M600,0 L600,32 Q568,14 538,28 Q508,11 478,26 Q448,7 418,20 L418,0Z" fill="#120800" />
      {/* Ground */}
      <rect x="0" y="164" width="600" height="16" fill="#120800" />
      {/* Treasure glints */}
      {[[78,161,2],[94,165,1.5],[112,160,2.5],[128,164,1.5],[65,164,1.5],[142,162,1]].map(([x,y,r],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#D4A017" opacity={0.5 + (i % 3) * 0.15} />
      ))}
      {/* Dragon body */}
      <ellipse cx="385" cy="95" rx="162" ry="68" fill="#290707" />
      {/* Neck */}
      <path d="M228,82 Q198,60 168,50 Q148,42 128,37" stroke="#290707" strokeWidth="34" fill="none" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="118" cy="37" rx="34" ry="19" fill="#290707" transform="rotate(-18,118,37)" />
      {/* Open jaw */}
      <path d="M88,44 Q104,56 130,52Z" fill="#1A0404" />
      {/* Eye */}
      <circle cx="106" cy="30" r="5" fill="#FF4400" opacity="0.9" />
      <circle cx="106" cy="30" r="2.5" fill="#FF9900" />
      {/* Wings */}
      <path d="M298,50 Q352,8 444,4 Q484,0 522,14 Q492,28 460,44 Q420,54 380,50Z" fill="#1C0505" />
      <path d="M316,84 Q372,38 452,28 Q492,24 532,34 Q502,54 470,64 Q428,74 388,80Z" fill="#180404" opacity="0.8" />
      {/* Tail */}
      <path d="M532,108 Q562,128 582,118 Q592,113 586,124" stroke="#290707" strokeWidth="20" fill="none" strokeLinecap="round" />
      {/* Claws */}
      <path d="M278,154 L266,167 M288,154 L282,169 M298,153 L295,168" stroke="#290707" strokeWidth="5" strokeLinecap="round" />
      {/* Fire breath */}
      <path d="M88,48 Q58,54 28,50 Q10,48 0,46" stroke="#FF8800" strokeWidth="20" fill="none" opacity="0.72" strokeLinecap="round" />
      <path d="M88,48 Q58,54 28,50 Q10,48 0,46" stroke="#FFCC00" strokeWidth="10" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M88,48 Q58,54 28,50 Q10,48 0,46" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.28" strokeLinecap="round" />
      {/* Hero silhouette */}
      <rect x="43" y="152" width="8" height="14" fill="#8B6914" rx="1" />
      <circle cx="47" cy="149" r="4" fill="#8B6914" />
      <line x1="41" y1="157" x2="34" y2="163" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="166" x2="41" y2="175" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
      <line x1="51" y1="166" x2="53" y2="175" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
      {/* Raised sword */}
      <line x1="34" y1="163" x2="24" y2="146" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VictorySVG() {
  const rays = Array.from({ length: 16 }, (_, i) => i);
  const particles: [number, number][] = [[132,58],[162,43],[202,28],[398,26],[438,40],[468,56],[502,78],[88,88],[520,100],[158,110]];
  return (
    <svg viewBox="0 0 600 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vic-glow" cx="50%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#1A0E00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="180" fill="#1A0E00" />
      <rect width="600" height="180" fill="url(#vic-glow)" />
      {/* Light rays */}
      {rays.map((i) => {
        const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
        return (
          <line key={i} x1="300" y1="38" x2={300 + Math.cos(angle) * 500} y2={38 + Math.sin(angle) * 420}
            stroke="#FFD700" strokeWidth="2" opacity="0.07" />
        );
      })}
      {/* Sun burst */}
      <circle cx="300" cy="38" r="42" fill="#D4A017" opacity="0.18" />
      <circle cx="300" cy="38" r="22" fill="#FFD700" opacity="0.38" />
      <circle cx="300" cy="38" r="8" fill="#FFFFFF" opacity="0.6" />
      {/* Defeated dragon — fading silhouette */}
      <path d="M155,130 Q240,88 342,100 Q420,110 482,138" stroke="#2A0808" strokeWidth="24" fill="none" opacity="0.38" strokeLinecap="round" />
      <path d="M342,100 Q382,68 420,62" stroke="#2A0808" strokeWidth="16" fill="none" opacity="0.28" strokeLinecap="round" />
      <circle cx="420" cy="62" r="10" fill="#1A0505" opacity="0.22" />
      <circle cx="452" cy="74" r="7" fill="#1A0505" opacity="0.15" />
      <circle cx="466" cy="90" r="4" fill="#1A0505" opacity="0.1" />
      {/* Victorious hero */}
      <rect x="293" y="133" width="14" height="28" fill="#D4A017" opacity="0.92" rx="2" />
      <circle cx="300" cy="128" r="7" fill="#D4A017" opacity="0.92" />
      <line x1="293" y1="143" x2="278" y2="130" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" opacity="0.92" />
      <line x1="307" y1="143" x2="322" y2="130" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" opacity="0.92" />
      <line x1="322" y1="130" x2="334" y2="114" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" opacity="0.92" />
      <line x1="296" y1="161" x2="291" y2="174" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" opacity="0.92" />
      <line x1="304" y1="161" x2="309" y2="174" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" opacity="0.92" />
      {/* Gold particles */}
      {particles.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#D4A017" opacity={0.3 + (i % 4) * 0.15} />
      ))}
    </svg>
  );
}

function DefeatSVG() {
  return (
    <svg viewBox="0 0 600 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="def-red" cx="68%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#200404" />
          <stop offset="100%" stopColor="#050100" />
        </radialGradient>
      </defs>
      <rect width="600" height="180" fill="#050100" />
      <rect width="600" height="180" fill="url(#def-red)" />
      {/* Dragon mass — fills most of frame */}
      <ellipse cx="390" cy="82" rx="235" ry="95" fill="#130303" opacity="0.92" />
      {/* Head looming from upper right */}
      <ellipse cx="542" cy="44" rx="82" ry="50" fill="#130303" transform="rotate(14,542,44)" />
      {/* Open jaw */}
      <path d="M462,70 Q502,84 556,80 Q576,78 580,90 Q540,95 490,84Z" fill="#0C0202" />
      {/* Glowing eye */}
      <circle cx="530" cy="32" r="9" fill="#880000" opacity="0.8" />
      <circle cx="530" cy="32" r="5" fill="#CC2200" opacity="0.9" />
      <circle cx="530" cy="32" r="2.5" fill="#FF6600" />
      {/* Left wing spanning canvas */}
      <path d="M196,28 Q144,0 76,8 Q28,14 0,28 Q48,48 118,54 Q178,58 238,72Z" fill="#130303" opacity="0.8" />
      {/* Claws reaching down */}
      <path d="M240,150 L228,170 M258,148 L252,170 M276,146 L274,168" stroke="#130303" strokeWidth="10" strokeLinecap="round" />
      {/* Fallen hero — prone, bottom left */}
      <ellipse cx="78" cy="172" rx="19" ry="5" fill="#3D2810" opacity="0.75" />
      <path d="M60,164 Q74,159 92,162 Q97,164 94,168 Q78,170 60,164Z" fill="#5C3D2E" />
      <circle cx="60" cy="162" r="5" fill="#5C3D2E" />
      <line x1="53" y1="166" x2="96" y2="161" stroke="#8B6914" strokeWidth="2" opacity="0.55" strokeLinecap="round" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Adventure() {
  const [phase, setPhase] = useState<Phase>("select");
  const [char, setChar] = useState<CharClass | null>(null);
  const [encIndex, setEncIndex] = useState(0);
  const [encResult, setEncResult] = useState<"success" | "failure" | null>(null);
  const [enc1Result, setEnc1Result] = useState<"success" | "failure" | null>(null);
  const [encHp, setEncHp] = useState(0);
  const [combat, setCombat] = useState<CombatState | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [combatRollInfo, setCombatRollInfo] = useState<CombatRollInfo | null>(null);

  // Dice animation state
  const [diceValue, setDiceValue] = useState(20);
  const [diceSpinning, setDiceSpinning] = useState(false);
  const [diceFinal, setDiceFinal] = useState<number | null>(null);
  const rollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll to top on phase change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  // Defeat detection via effect
  useEffect(() => {
    if (combat && combat.playerHp <= 0 && phase === "combat") {
      setTimeout(() => setPhase("defeat"), 600);
    }
  }, [combat?.playerHp, phase]);

  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    };
  }, []);

  function spinDice(
    onSettle: (raw: number) => void
  ) {
    setDiceSpinning(true);
    setDiceFinal(null);
    let count = 0;
    rollIntervalRef.current = setInterval(() => {
      setDiceValue(Math.ceil(Math.random() * 20));
      if (++count >= 14) {
        clearInterval(rollIntervalRef.current!);
        const raw = rollDie(20);
        setDiceValue(raw);
        setDiceSpinning(false);
        setTimeout(() => {
          setDiceFinal(raw);
          onSettle(raw);
        }, 400);
      }
    }, 70);
  }

  // ── Character select ──────────────────────────────────────────────────────
  function selectChar(c: CharClass) {
    setChar(c);
    setEncHp(c.maxHp);
    setEncIndex(0);
    setEncResult(null);
    setEnc1Result(null);
    setCombatRollInfo(null);
    setDiceFinal(null);
    setDiceValue(20);
    setIsAnimating(false);
    setPhase("encounter1");
  }

  // ── Encounter roll ────────────────────────────────────────────────────────
  function getActiveEncounter() {
    if (encIndex === 0) return ENCOUNTER_1;
    return enc1Result === "success" ? ENCOUNTER_2_SUCCESS : ENCOUNTER_2_FAILURE;
  }

  function doEncounterRoll() {
    if (!char || isAnimating) return;
    setIsAnimating(true);
    const enc = getActiveEncounter();
    const bonus = char.skillBonus;

    spinDice((raw) => {
      const total = raw + bonus;
      const success = total >= enc.dc;
      const result = success ? "success" : "failure";
      setEncResult(result);
      if (encIndex === 0) setEnc1Result(result);
      setEncHp((hp) =>
        Math.min(
          char.maxHp,
          Math.max(1, hp + (success ? enc.successHp : enc.failureHp))
        )
      );
      setIsAnimating(false);
    });
  }

  function advanceEncounter() {
    if (encIndex === 0) {
      setEncIndex(1);
      setEncResult(null);
      setDiceFinal(null);
      setDiceValue(20);
      setPhase("encounter2");
    } else {
      // Enter combat
      setCombat({
        playerHp: encHp,
        playerMaxHp: char!.maxHp,
        dragonHp: DRAGON.maxHp,
        turn: 1,
        specialLastUsed: null,
        potionUsed: false,
        log: [],
      });
      setDiceFinal(null);
      setDiceValue(20);
      setPhase("combat");
    }
  }

  // ── Combat ────────────────────────────────────────────────────────────────
  function canUseSpecial(): boolean {
    if (!char || !combat) return false;
    if (combat.specialLastUsed === null) return true;
    return combat.turn - combat.specialLastUsed >= char.specialCooldown;
  }

  function doAttack(useSpecial: boolean) {
    if (!char || !combat || isAnimating) return;
    setIsAnimating(true);

    // Snapshot everything needed before async work
    const snapChar = char;
    const snapCombat = combat;
    const snapTurn = snapCombat.turn;
    const specialOk = useSpecial && canUseSpecial();

    // Compute outcome immediately (deterministic)
    let playerDmg = 0;
    let healAmount = 0;
    let logText = "";
    let isCrit = false;
    let rollInfo: CombatRollInfo;

    if (specialOk && snapChar.id === "fighter") {
      // Second Wind — no attack, just heal
      healAmount = 8;
      logText = `🛡️ ${snapChar.name} uses Second Wind! Recovers 8 HP.`;
      rollInfo = { raw: 0, total: null, hit: null, isSecondWind: true };
    } else {
      const rawAtk = rollDie(20);
      isCrit = rawAtk === 20;
      const totalAtk = rawAtk + snapChar.atkBonus;
      const isFireball = specialOk && snapChar.id === "wizard";
      const hits = isFireball ? true : totalAtk >= DRAGON.ac;
      rollInfo = {
        raw: rawAtk,
        total: totalAtk,
        hit: isFireball ? null : hits,
        isSecondWind: false,
      };

      if (!hits) {
        logText = `❌ Rolled ${rawAtk}+${snapChar.atkBonus}=${totalAtk} — miss! (need ≥${DRAGON.ac})`;
      } else {
        if (isFireball) {
          // 3d6 fireball
          playerDmg = rollDie(6) + rollDie(6) + rollDie(6);
          logText = `🔥 Fireball! ${playerDmg} damage (ignores armor)!`;
        } else if (specialOk && snapChar.id === "rogue") {
          // Double dice
          const dice1 = rollDie(snapChar.atkDie);
          const dice2 = rollDie(snapChar.atkDie);
          playerDmg = dice1 + dice2 + snapChar.atkBonus;
          if (isCrit) playerDmg *= 2;
          logText = `🗡️ Sneak Attack (${rawAtk}+${snapChar.atkBonus}=${totalAtk})${isCrit ? " CRIT!" : ""}! ${playerDmg} damage!`;
        } else if (specialOk && snapChar.id === "bard") {
          // +1d6 and heal 4
          const baseDmg = rollDie(snapChar.atkDie) + snapChar.atkBonus;
          const bonus = rollDie(6);
          playerDmg = isCrit ? (baseDmg + bonus) * 2 : baseDmg + bonus;
          healAmount = 4;
          logText = `🎸 Battle Hymn (${rawAtk}+${snapChar.atkBonus}=${totalAtk})${isCrit ? " CRIT!" : ""}! ${playerDmg} damage, +4 HP!`;
        } else {
          // Normal attack
          const rawDmg = rollDie(snapChar.atkDie) + snapChar.atkBonus;
          playerDmg = isCrit ? rawDmg * 2 : rawDmg;
          logText = `⚔️ Hit (${rawAtk}+${snapChar.atkBonus}=${totalAtk})${isCrit ? " CRIT!" : ""}! ${playerDmg} damage!`;
        }
      }
    }

    // Compute dragon counter-attack
    const dragonRaw = rollDie(20);
    const dragonHits = dragonRaw + 3 >= 10 + snapChar.skillBonus; // player's AC
    const dragonDmg = dragonHits
      ? DRAGON.atkMin + Math.floor(Math.random() * (DRAGON.atkMax - DRAGON.atkMin + 1))
      : 0;
    const dragonLogText = dragonHits
      ? `🔥 Malachar strikes for ${dragonDmg} damage!`
      : `💨 Malachar's claw swings wide! (rolled ${dragonRaw})`;

    spinDice(() => {
      setCombatRollInfo(rollInfo);
      // Apply player action
      setCombat((prev) => {
        if (!prev) return prev;
        const newDragonHp = Math.max(0, prev.dragonHp - playerDmg);
        const newPlayerHp = Math.min(
          prev.playerMaxHp,
          prev.playerHp + healAmount
        );
        return {
          ...prev,
          dragonHp: newDragonHp,
          playerHp: newPlayerHp,
          specialLastUsed: specialOk ? snapTurn : prev.specialLastUsed,
          log: [
            ...prev.log,
            { turn: snapTurn, actor: "player", text: logText, isCrit },
          ],
        };
      });

      const newDragonHp = Math.max(0, snapCombat.dragonHp - playerDmg);
      if (newDragonHp <= 0) {
        setPhase("victory");
        setIsAnimating(false);
        return;
      }

      // Dragon counter-attacks after delay
      setTimeout(() => {
        setCombat((prev) => {
          if (!prev) return prev;
          const newPlayerHp = Math.max(0, prev.playerHp - dragonDmg);
          return {
            ...prev,
            playerHp: newPlayerHp,
            turn: prev.turn + 1,
            log: [
              ...prev.log,
              { turn: snapTurn, actor: "dragon", text: dragonLogText },
            ],
          };
        });
        setIsAnimating(false);
      }, 900);
    });
  }

  function drinkPotion() {
    if (!char || !combat || isAnimating || combat.potionUsed) return;
    setIsAnimating(true);

    const snapChar = char;
    const snapTurn = combat.turn;
    const healAmount = 12;

    // Dragon still counter-attacks
    const dragonRaw = rollDie(20);
    const dragonHits = dragonRaw + 3 >= 10 + snapChar.skillBonus;
    const dragonDmg = dragonHits
      ? DRAGON.atkMin + Math.floor(Math.random() * (DRAGON.atkMax - DRAGON.atkMin + 1))
      : 0;
    const dragonLogText = dragonHits
      ? `🔥 Malachar strikes for ${dragonDmg} damage!`
      : `💨 Malachar's claw swings wide! (rolled ${dragonRaw})`;

    setCombat((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        playerHp: Math.min(prev.playerMaxHp, prev.playerHp + healAmount),
        potionUsed: true,
        log: [...prev.log, { turn: snapTurn, actor: "player", text: `🧪 Drank a healing potion! +${healAmount} HP.` }],
      };
    });

    setTimeout(() => {
      setCombat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          playerHp: Math.max(0, prev.playerHp - dragonDmg),
          turn: prev.turn + 1,
          log: [...prev.log, { turn: snapTurn, actor: "dragon", text: dragonLogText }],
        };
      });
      setIsAnimating(false);
    }, 800);
  }

  function restart() {
    setPhase("select");
    setChar(null);
    setEncResult(null);
    setEnc1Result(null);
    setCombat(null);
    setCombatRollInfo(null);
    setDiceFinal(null);
    setDiceValue(20);
    setIsAnimating(false);
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  const enc = getActiveEncounter();

  // Character Select
  if (phase === "select") {
    return (
      <div>
        <div className="mb-6">
          <SelectSVG />
        </div>
        <div className="mb-8">
          <h1 className="font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
            ⚔️ The Shadow of Malachar
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">
            A mini D&D adventure. Choose your hero.
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#6D28D9]/60 to-transparent" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CHARS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectChar(c)}
              className="group rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-5 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="font-display font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#CC2222]">
                    {c.name}
                  </p>
                  <p className="text-xs font-medium text-[#0EA89A]">
                    {c.id.charAt(0).toUpperCase() + c.id.slice(1)}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["HP", c.maxHp],
                  ["ATK", `d${c.atkDie}+${c.atkBonus}`],
                  ["Skill", `+${c.skillBonus}`],
                ].map(([label, val]) => (
                  <div key={label as string} className="rounded-lg bg-[#2D1B0E]/8 p-1.5">
                    <p className="text-xs text-[#A08060]">{label}</p>
                    <p className="font-mono text-sm font-bold text-[#2D1B0E]">{val}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-[#A08060]">{c.flavor}</p>
              <div className="mt-2 rounded-lg bg-[#6D28D9]/10 px-3 py-2">
                <p className="text-xs font-semibold text-[#6D28D9]">
                  ✦ {c.special}
                </p>
                <p className="text-xs text-[#5C3D2E]">{c.specialDesc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Encounters
  if (phase === "encounter1" || phase === "encounter2") {
    const EncSVG = phase === "encounter1" ? BridgeSVG
      : enc1Result === "success" ? ShadeSVG : SerpentsSVG;
    return (
      <div>
        <div className="mb-6">
          <EncSVG />
        </div>
        <p className="mb-2 text-sm font-medium text-[#6D28D9]">
          Encounter {encIndex + 1} of 2
        </p>
        <h2 className="mb-6 font-display text-3xl font-semibold text-[var(--text-primary)]">
          {enc.title}
        </h2>

        <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
          <p className="text-[#5C3D2E]">{enc.description}</p>

          {encResult === null && (
            <p className="mt-4 font-semibold text-[#2D1B0E]">{enc.prompt}</p>
          )}

          {encResult !== null && (
            <p className={`mt-4 font-medium ${encResult === "success" ? "text-[#0EA89A]" : "text-[#CC2222]"}`}>
              {encResult === "success" ? `✓ ${enc.successText}` : `✗ ${enc.failureText}`}
            </p>
          )}
        </div>

        {/* Dice */}
        {(diceSpinning || diceFinal !== null) && (
          <div className="mt-6 text-center">
            <DiceWidget spinning={diceSpinning} value={diceValue} finalValue={diceFinal} />
            {diceFinal !== null && (
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Rolled {diceFinal} + skill {char!.skillBonus} ={" "}
                <strong className="text-[var(--text-primary)]">
                  {diceFinal + char!.skillBonus}
                </strong>{" "}
                vs DC {enc.dc}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[var(--text-muted)]">
            HP:{" "}
            <strong className="text-[var(--text-primary)]">
              {encHp}/{char!.maxHp}
            </strong>
          </p>
          {encResult === null ? (
            <button
              type="button"
              onClick={doEncounterRoll}
              disabled={isAnimating}
              className="btn-primary rounded-lg px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              🎲 Roll d20
            </button>
          ) : (
            <button
              type="button"
              onClick={advanceEncounter}
              className="btn-primary rounded-lg px-5 py-2.5 text-sm font-semibold"
            >
              {encIndex === 0 ? "Continue →" : "Enter the Lair →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Combat
  if (phase === "combat" && combat) {
    const specialReady = canUseSpecial();
    const recentLog = [...combat.log].reverse().slice(0, 6);

    return (
      <div>
        <div className="mb-5">
          <DragonCombatSVG />
        </div>
        <h2 className="mb-4 font-display text-3xl font-semibold text-[var(--text-primary)]">
          🐉 {DRAGON.name}
        </h2>

        {/* HP bars */}
        <div className="mb-2 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-4 shadow-lg">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-medium text-[#A08060]">
                {char!.icon} {char!.name}
              </p>
              <p className="font-mono text-sm font-bold text-[#2D1B0E]">
                {combat.playerHp}/{combat.playerMaxHp}
              </p>
            </div>
            <HpBar hp={combat.playerHp} maxHp={combat.playerMaxHp} />
          </div>
          <div className="rounded-xl border border-[#CC2222]/40 bg-[#CC2222]/5 p-4 shadow-lg">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-medium text-[#A08060]">🐉 Malachar</p>
              <p className="font-mono text-sm font-bold text-[#CC2222]">
                {combat.dragonHp}/{DRAGON.maxHp}
              </p>
            </div>
            <HpBar hp={combat.dragonHp} maxHp={DRAGON.maxHp} />
          </div>
        </div>

        {/* Stat line */}
        <p className="mb-5 text-center text-xs text-[var(--text-muted)]">
          Your AC {10 + char!.skillBonus} · Dragon AC {DRAGON.ac} · Turn {combat.turn}
        </p>

        {/* Dice */}
        {(diceSpinning || diceFinal !== null) && (
          <div className="mb-4 text-center">
            <DiceWidget spinning={diceSpinning} value={diceValue} finalValue={diceFinal} />
            {diceFinal !== null && combatRollInfo && !combatRollInfo.isSecondWind && (
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {combatRollInfo.hit === null ? (
                  <>🔥 Fireball — <strong className="text-[#0EA89A]">auto hit!</strong></>
                ) : (
                  <>
                    Rolled {combatRollInfo.raw} + {char!.atkBonus} ={" "}
                    <strong className="text-[var(--text-primary)]">{combatRollInfo.total}</strong>
                    {" "}vs AC {DRAGON.ac} —{" "}
                    <strong className={combatRollInfo.hit ? "text-[#0EA89A]" : "text-[#CC2222]"}>
                      {combatRollInfo.hit ? "HIT!" : "miss"}
                    </strong>
                  </>
                )}
              </p>
            )}
            {diceFinal !== null && combatRollInfo?.isSecondWind && (
              <p className="mt-2 text-sm text-[#0EA89A] font-medium">Second Wind — no attack, just healing.</p>
            )}
          </div>
        )}

        {/* Action buttons */}
        {!isAnimating && (
          <div className="mb-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => doAttack(false)}
              className="btn-primary rounded-lg px-5 py-2.5 text-sm font-semibold"
            >
              ⚔️ Attack (d{char!.atkDie}+{char!.atkBonus})
            </button>
            <button
              type="button"
              onClick={() => doAttack(true)}
              disabled={!specialReady}
              className="btn-secondary rounded-lg px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              ✦ {char!.special}
              {!specialReady && (
                <span className="ml-1 text-xs opacity-70">
                  {char!.specialCooldown >= 99
                    ? "(once per battle)"
                    : `(${char!.specialCooldown - (combat.turn - (combat.specialLastUsed ?? 0))} turns)`}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={drinkPotion}
              disabled={combat.potionUsed}
              className="rounded-lg border border-[#0EA89A] bg-[#0EA89A]/10 px-5 py-2.5 text-sm font-semibold text-[#0EA89A] transition-colors hover:bg-[#0EA89A]/20 disabled:opacity-40"
            >
              🧪 Potion {combat.potionUsed ? "(used)" : "(+12 HP)"}
            </button>
          </div>
        )}

        {isAnimating && (
          <p className="mb-4 text-sm text-[var(--text-muted)] italic">Rolling...</p>
        )}

        {/* Combat log */}
        {recentLog.length > 0 && (
          <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-4 shadow-lg">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#A08060]">
              Combat Log — Turn {combat.turn}
            </p>
            <ul className="space-y-1">
              {recentLog.map((entry, i) => (
                <li
                  key={i}
                  className={`rounded px-2 py-1 text-sm ${
                    entry.actor === "player"
                      ? "bg-[#0EA89A]/10 text-[#2D1B0E]"
                      : "bg-[#CC2222]/10 text-[#5C3D2E]"
                  } ${entry.isCrit ? "font-bold" : ""} ${i > 0 ? "opacity-60" : ""}`}
                >
                  {entry.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Victory
  if (phase === "victory") {
    return (
      <div className="text-center">
        <div className="mb-6">
          <VictorySVG />
        </div>
        <h2 className="font-display text-4xl font-semibold text-[#D4A017]">
          Victory!
        </h2>
        <p className="mt-2 text-[var(--text-muted)]">The realm is saved.</p>
        <div className="mt-6 rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
          <p className="text-[#5C3D2E]">
            The last blow lands. Malachar lets out a sound like crumbling
            mountains and collapses. The fire in his eyes dims slowly — then
            goes dark. Silence fills the lair.
          </p>
          <p className="mt-3 text-[#5C3D2E]">
            You stand victorious where armies failed. Your name will be written
            in every history book, sung in every tavern, carved into every
            temple wall.
          </p>
          <p className="mt-3 italic text-[#A08060]">
            ...there&apos;s also an absurd amount of gold.
          </p>
        </div>
        {combat && (
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Finished with{" "}
            <strong className="text-[var(--text-primary)]">
              {combat.playerHp} HP
            </strong>{" "}
            remaining.
          </p>
        )}
        <button
          type="button"
          onClick={restart}
          className="btn-primary mt-6 rounded-lg px-6 py-3 text-sm font-semibold"
        >
          Play Again
        </button>
      </div>
    );
  }

  // Defeat
  if (phase === "defeat") {
    return (
      <div className="text-center">
        <div className="mb-6">
          <DefeatSVG />
        </div>
        <h2 className="font-display text-4xl font-semibold text-[#CC2222]">
          Defeated
        </h2>
        <p className="mt-2 text-[var(--text-muted)]">
          The dragon wins... this time.
        </p>
        <div className="mt-6 rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
          <p className="text-[#5C3D2E]">
            The dragon&apos;s tail sends you crashing into the far wall. The
            world goes dark and distant. Through dimming eyes, you see Malachar
            return to his hoard, utterly unbothered.
          </p>
          <p className="mt-3 italic text-[#A08060]">
            Some heroes are forged in fire. You were merely... a snack.
          </p>
        </div>
        <button
          type="button"
          onClick={restart}
          className="btn-primary mt-6 rounded-lg px-6 py-3 text-sm font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
}
