"use client";
import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "subtle";
type ButtonSize = "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
    "disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles =
    variant === "primary"
      ? "bg-[var(--color-primary)] text-white hover:brightness-95 focus:ring-[var(--color-primary)]"
      : variant === "outline"
      ? "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
      : variant === "subtle"
      ? "bg-muted text-gray-900 hover:bg-gray-200"
      : /* ghost */
        "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10";

  const sizeStyles = size === "lg" ? "h-11 px-5 w-full" : "h-10 px-4";

  return <button className={`${base} ${variantStyles} ${sizeStyles} ${className}`} {...rest} />;
}
