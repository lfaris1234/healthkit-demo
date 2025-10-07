import { ReactNode } from "react";
export default function Card({ children }: { children: ReactNode }) {
  return <div className="rounded border bg-white p-4 shadow-sm">{children}</div>;
}
