import { notFound } from "next/navigation";
import SideMenu from "@/components/SideMenu";
import { getRecipe, getRecipes } from "@/lib/recipes";

export async function generateStaticParams() {
  // optional SSG; safe to omit if you prefer
  return getRecipes().map((r) => ({ id: r.id }));
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const r = getRecipe(params.id);
  if (!r) return notFound();

  return (
    <div className="grid gap-4">
      <SideMenu title={r.title} />

      <article className="overflow-hidden rounded-2xl border bg-white">
        {/* hero */}
        <div className="relative">
          <img src={r.hero} alt={r.title} className="h-64 w-full object-cover" />
          <div className="pointer-events-none absolute left-3 top-3 text-xl">‹</div>
          <div className="pointer-events-none absolute right-3 top-3 text-xl">≡</div>
        </div>

        {/* deep-blue band with summary + macros */}
        <section className="bg-[#0C3B66] px-4 pb-4 pt-3 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">{r.title}</h1>
            <span className="text-xs opacity-90">{r.minutes}</span>
          </div>
          <p className="mt-1 text-sm opacity-90">{r.summary}</p>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {r.macros.map((m) => (
              <div key={m.label} className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10 text-base font-semibold">
                  {m.value}
                </div>
                <div className="mt-1 text-xs opacity-90">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* details */}
        <section className="grid gap-6 p-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold">{r.leftTitle}</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
              {r.leftItems.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">{r.rightTitle}</h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
              {r.rightItems.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      <div className="flex justify-end">
        <a href="/recipes" className="text-sm text-[var(--color-primary)] underline">
          ← Back to recipes
        </a>
      </div>
    </div>
  );
}
