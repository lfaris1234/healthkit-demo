import Link from "next/link";

export default function WelcomeHero() {
  return (
    <section className="rounded-xl overflow-hidden border">
      <div className="grid grid-cols-1">
        <img
          src="/images/hero.png"
          alt="fresh produce"
          className="h-48 w-full object-cover"
        />
        <div className="bg-[var(--color-primary)] text-white p-4">
          <h2 className="text-xl font-semibold leading-snug">
            Take control of your health by measuring what matters
          </h2>
          <div className="mt-3 grid gap-2">
            <Link
              href="/login"
              className="h-10 w-full rounded-md bg-white/95 text-[var(--color-primary)] grid place-items-center"
            >
              Log in with account
            </Link>
            <Link
              href="/sign-up"
              className="h-10 w-full rounded-md bg-white/15 border border-white/40 grid place-items-center"
            >
              Sign up today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
