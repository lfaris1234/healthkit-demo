export default function Header() {
  return (
    <header className="px-4 py-3 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="/" className="font-semibold">HealthKit</a>
        <nav className="text-sm space-x-4">
          <a href="/(auth)/sign-up">Sign up</a>
          <a href="/(auth)/login">Log in</a>
        </nav>
      </div>
    </header>
  );
}
