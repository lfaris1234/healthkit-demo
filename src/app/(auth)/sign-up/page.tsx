import WelcomeHero from "./components/WelcomeHero";
import SignUpForm from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="grid gap-8">
      <WelcomeHero />
      <SignUpForm />
    </div>
  );
}
