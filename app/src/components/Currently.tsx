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
        <h2 className="font-display text-3xl font-semibold text-[#D4A017] sm:text-4xl">
          Currently
        </h2>
        <p className="mt-2 text-[#8B7355]">What I&apos;m up to right now</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="group relative rounded-xl border border-[#5C3D2E] bg-[#3D2314] p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/40 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-3 text-3xl" role="img" aria-label={item.label}>
                {item.icon}
              </div>

              {/* Label */}
              <p className="text-xs font-medium uppercase tracking-wider text-[#D4A017]">
                {item.label}
              </p>

              {/* Value */}
              <h3 className="mt-1 font-display font-semibold text-[#F4E4C1]">
                {item.value}
              </h3>

              {/* Sub */}
              <p className="mt-1 text-sm text-[#C4A882]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
