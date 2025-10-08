import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="text-gray-600 text-sm">This is a placeholder login page for the demo.</p>
      <Link
        href="/sign-up"
        className="rounded-md border px-4 py-2 text-[var(--color-primary)] border-[var(--color-primary)] w-fit"
      >
        Go to Sign up
      </Link>
    </div>
  );
}
