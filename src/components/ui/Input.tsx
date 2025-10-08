import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={
        "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none " +
        "placeholder:text-gray-400 focus:border-[var(--color-primary)] " +
        className
      }
    />
  );
}
