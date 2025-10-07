"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthContext } from "@/context/AuthContext";

type Form = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
};

const emailOk = (e: string) => /^\S+@\S+\.\S+$/.test(e);
const pwOk = (p: string) => p.length >= 8;

export default function SignUpForm() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthContext();

  const onChange =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = k === "agree" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((s) => ({ ...s, [k]: value as any }));
    };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!emailOk(form.email)) e.email = "Enter a valid email";
    if (!pwOk(form.password)) e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.agree) e.agree = "Please accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/sign-up", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      });
      // store demo user in client state
      setUser(res.data.user);
      router.push("/onboarding/non-required-questions");
    } catch (err) {
      setErrors({ email: "This email may already be registered" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-xl border p-4 sm:p-6">
      <h3 className="text-lg font-semibold">Create your account</h3>

      <label className="grid gap-1">
        <span className="text-sm text-gray-700">Name</span>
        <input
          className="w-full rounded border p-2"
          placeholder="Kelly Walters"
          value={form.name}
          onChange={onChange("name")}
        />
        {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-gray-700">Email</span>
        <input
          className="w-full rounded border p-2"
          placeholder="kelly@example.com"
          value={form.email}
          onChange={onChange("email")}
          type="email"
        />
        {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm text-gray-700">Password</span>
          <input
            className="w-full rounded border p-2"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={onChange("password")}
          />
          {errors.password && <span className="text-xs text-red-600">{errors.password}</span>}
        </label>

        <label className="grid gap-1">
          <span className="text-sm text-gray-700">Confirm</span>
          <input
            className="w-full rounded border p-2"
            placeholder="••••••••"
            type="password"
            value={form.confirm}
            onChange={onChange("confirm")}
          />
          {errors.confirm && <span className="text-xs text-red-600">{errors.confirm}</span>}
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.agree} onChange={onChange("agree")} />
        I agree to the Terms & Privacy.
      </label>
      {errors.agree && <span className="text-xs text-red-600">{errors.agree}</span>}

      <button
        disabled={loading}
        className="mt-2 rounded-md bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-xs text-gray-500">
        By continuing you agree to our Terms and acknowledge our Privacy Policy.
      </p>
    </form>
  );
}
