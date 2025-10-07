export default function WelcomeHero() {
  return (
    <section className="rounded-xl bg-muted p-4 sm:p-6">
      <div className="flex items-center gap-4">
        <img
          src="/placeholder.jpg"
          alt="fresh lemons and mint"
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p className="text-gray-600 text-sm">
            Create your account to unlock your dashboard, scan kits, and get nutrition guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
