import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import { getRecipes } from "@/lib/recipes";

export default function RecipesListPage() {
  const recipes = getRecipes();

  return (
    <div className="grid gap-4">
      <SideMenu title="Recipes" />

      <div className="grid gap-4 sm:grid-cols-2">
        {recipes.map((r) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            className="group overflow-hidden rounded-2xl border bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img src={r.hero} alt={r.title} className="h-48 w-full object-cover" />
              <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                {r.minutes}
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-base font-semibold">{r.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">{r.summary}</p>

              {/* tiny macro chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {r.macros.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-full border px-2 py-0.5 text-xs text-gray-700"
                  >
                    {m.value} {m.label}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-sm text-[var(--color-primary)]">
                View details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
