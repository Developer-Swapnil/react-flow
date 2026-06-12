import type { ReactNode } from "react";
import { clsx } from "clsx";

type BadgeProps = {
  tone?: "green" | "yellow" | "red" | "neutral";
  children: ReactNode;
};

export const Badge = ({ tone = "neutral", children }: BadgeProps) => (
  <span className={clsx("badge", `badge-${tone}`)}>{children}</span>
);
