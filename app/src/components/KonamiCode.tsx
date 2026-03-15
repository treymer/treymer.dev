"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export default function KonamiCode() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setKeySequence((prev) => {
      const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setShowAchievement(true);
        return [];
      }

      return newSequence;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (showAchievement) {
      const timer = setTimeout(() => setShowAchievement(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showAchievement]);

  if (!showAchievement) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setShowAchievement(false)}
    >
      <div className="animate-bounce-in mx-4 rounded-2xl border-2 border-[#D4A017]/50 bg-gradient-to-br from-[#3D2314] to-[#2C1810] p-8 text-center shadow-2xl shadow-[#D4A017]/20">
        <div className="mb-4 text-6xl">🐉</div>
        <h2 className="font-display text-2xl font-bold text-[#D4A017]">
          Achievement Unlocked!
        </h2>
        <p className="mt-2 text-lg font-semibold text-[#F4E4C1]">
          Dragon Tamer
        </p>
        <p className="mt-1 text-sm text-[#C4A882]">
          You found the secret code! +1000 XP
        </p>
        <div className="mt-4 text-xs text-[#8B7355]">
          Click anywhere to dismiss
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
