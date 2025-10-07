import { ButtonHTMLAttributes } from "react";
export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return <button className={`px-3 py-2 rounded bg-[var(--color-primary)] text-white ${className}`} {...rest} />;
}
