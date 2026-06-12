import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "icon";
  children: ReactNode;
};

export const Button = ({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) => (
  <button className={clsx("button", `button-${variant}`, `button-${size}`, className)} {...props}>
    {children}
  </button>
);
