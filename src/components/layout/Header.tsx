import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">WellWise</Link>
        <nav className="text-sm flex gap-4">
          <Link href="/sign-up">Sign up</Link>
          <Link href="/login">Log in</Link>
        </nav>
      </div>
    </header>
  );
}
