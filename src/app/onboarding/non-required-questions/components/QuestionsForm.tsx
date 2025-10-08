"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Quick = { gender: "" | "Male" | "Female"; animalProtein: "" | "Yes" | "No" };
type Detail = { dietary: string; conditions: string; medication: string; supplements: string; goals: string };

export default function QuestionsForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [quick, setQuick] = useState<Quick>({ gender: "", animalProtein: "" });
  const [detail, setDetail] = useState<Detail>({ dietary: "", conditions: "", medication: "", supplements: "", goals: "" });

  const saveAndGo = () => {
    localStorage.setItem("onboarding.quick", JSON.stringify(quick));
    localStorage.setItem("onboarding.detail", JSON.stringify(detail));
    router.push("/dashboard");
  };

  const pill = (active: boolean) =>
    `h-11 rounded-md border text-[15px] font-medium ${
      active
        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
        : "border-gray-300 bg-white text-gray-900"
    }`;

  if (step === 1) {
    return (
      <div className="rounded-2xl border overflow-hidden max-w-sm">
        <img src="/images/cooking.png" alt="Cooking" className="h-56 w-full object-cover object-center" />

        <div className="p-5 grid gap-5">
          <h2 className="font-serif text-xl font-semibold">Let’s know more about you</h2>

          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">Gender</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["Male", "Female"] as const).map((g) => (
                <button key={g} type="button" onClick={() => setQuick((s) => ({ ...s, gender: g }))} className={pill(quick.gender === g)}>
                  {g}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">Do you eat animal protein?</legend>
            <p className="text-xs text-gray-500 -mt-1">Including meat, fish, seafood, dairy, and eggs.</p>
            <div className="grid grid-cols-2 gap-2">
              {(["Yes", "No"] as const).map((v) => (
                <button key={v} type="button" onClick={() => setQuick((s) => ({ ...s, animalProtein: v }))} className={pill(quick.animalProtein === v)}>
                  {v}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex items-center justify-between">
            <button className="text-[15px] text-[var(--color-primary)] underline underline-offset-2" onClick={() => router.push("/dashboard")} type="button">
              Skip for now
            </button>
            <button className="h-11 rounded-md bg-[var(--color-primary)] px-4 text-white text-[15px] font-medium" onClick={() => setStep(2)} type="button">
              Continue questionnaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  // step 2 – “Non required questions”
  return (
    <div className="rounded-2xl border overflow-hidden max-w-sm">
      <img src="/images/cooking.png" alt="Cooking" className="h-56 w-full object-cover object-center" />

      <div className="p-5 grid gap-4">
        <h2 className="font-serif text-xl font-semibold">Let’s know more about you</h2>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Dietary restrictions and allergens</span>
          <textarea
            className="min-h-24 rounded-md border border-gray-300 p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 focus:border-[var(--color-primary)]"
            placeholder="Type any dietary restrictions here"
            value={detail.dietary}
            onChange={(e) => setDetail((s) => ({ ...s, dietary: e.target.value }))}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Medical Conditions</span>
          <textarea
            className="min-h-24 rounded-md border border-gray-300 p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 focus:border-[var(--color-primary)]"
            placeholder="Type any medical conditions here"
            value={detail.conditions}
            onChange={(e) => setDetail((s) => ({ ...s, conditions: e.target.value }))}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Medication</span>
          <textarea
            className="min-h-24 rounded-md border border-gray-300 p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 focus:border-[var(--color-primary)]"
            placeholder="Type any medication here"
            value={detail.medication}
            onChange={(e) => setDetail((s) => ({ ...s, medication: e.target.value }))}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Supplements</span>
          <textarea
            className="min-h-24 rounded-md border border-gray-300 p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 focus:border-[var(--color-primary)]"
            placeholder="Type any supplements here"
            value={detail.supplements}
            onChange={(e) => setDetail((s) => ({ ...s, supplements: e.target.value }))}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Health goals</span>
          <textarea
            className="min-h-24 rounded-md border border-gray-300 p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 focus:border-[var(--color-primary)]"
            placeholder="Type your goals"
            value={detail.goals}
            onChange={(e) => setDetail((s) => ({ ...s, goals: e.target.value }))}
          />
        </label>

        <div className="flex items-center justify-between">
          <button className="text-[15px] text-[var(--color-primary)] underline underline-offset-2" onClick={() => router.push("/dashboard")} type="button">
            Skip for now
          </button>
          <button className="h-11 rounded-md bg-[var(--color-primary)] px-4 text-white text-[15px] font-medium" onClick={saveAndGo} type="button">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
