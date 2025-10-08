import Link from "next/link";

export default function WelcomeHero() {
  return (
    <section className="w-full rounded-2xl overflow-hidden border shadow-sm bg-white">

      <div className="grid grid-cols-1">
        <div className="-mx-6 sm:-mx-8 md:-mx-10">
          <img
            src="/images/hero.png"
            alt="fresh produce"
            className="h-72 md:h-96 w-full object-cover object-center"
          />
        </div>
        <div className="bg-[var(--color-primary)] text-white p-6 md:p-7">

          <h2 className="font-headline text-3xl leading-tight font-bold">
            Take control of your health by measuring what matters
          </h2>

          <div className="mt-5 grid gap-3">

            <Link
              href="/login"
              className="h-12 w-full rounded-md bg-white text-[var(--color-primary)] font-semibold grid place-items-center border border-white"
            >
              Log in with account
            </Link>
            <Link
              href="/sign-up"
              className="h-12 w-full rounded-md bg-[var(--color-accent)] text-white font-semibold grid place-items-center hover:opacity-90"
            >
              Sign up today
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
