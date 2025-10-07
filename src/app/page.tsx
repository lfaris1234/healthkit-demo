import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <img src="/placeholder.jpg" alt="wellness" className="h-40 w-40 rounded-xl object-cover" />
      <h1 className="text-3xl font-semibold">Take control of your health</h1>
      <p className="text-gray-600">
        Personalized insights, recipes, and kit tracking—designed for everyday habits.
      </p>

      <div className="flex gap-3">
        <Link
          href="/(auth)/sign-up"
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          Get Started
        </Link>
        <Link
          href="/(auth)/login"
          className="rounded-md border px-4 py-2 text-[var(--color-primary)] border-[var(--color-primary)]"
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
}
