import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">WellWise</Link>
        <nav className="text-sm space-x-4">
          <Link href="/(auth)/sign-up">Sign up</Link>
          <Link href="/(auth)/login">Log in</Link>
        </nav>
      </div>
    </header>
  );
}
