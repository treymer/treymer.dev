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
        <h2 className="font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
          Currently
        </h2>
        <p className="mt-2 text-stone-500">What I&apos;m up to right now</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="group relative rounded-xl border border-stone-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-3 text-3xl" role="img" aria-label={item.label}>
                {item.icon}
              </div>

              {/* Label */}
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                {item.label}
              </p>

              {/* Value */}
              <h3 className="mt-1 font-display font-semibold text-stone-900">
                {item.value}
              </h3>

              {/* Sub */}
              <p className="mt-1 text-sm text-stone-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
