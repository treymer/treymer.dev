import currentlyData from "@/data/currently.json";

type CurrentlyItem = {
  icon: string;
  label: string;
  value: string;
  sub: string;
};

const items: CurrentlyItem[] = [
  currentlyData.playing,
  currentlyData.learning,
  currentlyData.reading,
  currentlyData.building,
  currentlyData.riding,
  currentlyData.shipping,
];

export default function Currently() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="title-purple-glow inline-block">
          <h2 className="font-display text-3xl font-semibold text-[#F4E4C1] sm:text-4xl">
            Currently
          </h2>
        </div>
        <p className="mt-2 text-[#A08060]">What I&apos;m up to right now</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="group relative rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(109,40,217,0.15)]"
            >
              {/* Icon */}
              <div className="mb-3 text-3xl" role="img" aria-label={item.label}>
                {item.icon}
              </div>

              {/* Label */}
              <p className="text-xs font-medium uppercase tracking-wider text-[#6D28D9]">
                {item.label}
              </p>

              {/* Value */}
              <h3 className="mt-1 font-display font-semibold text-[#2D1B0E]">
                {item.value}
              </h3>

              {/* Sub */}
              <p className="mt-1 text-sm text-[#5C3D2E]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
