import * as React from "react";

import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-gradient-to-r from-sky-500 via-cyan-400 to-violet-400 text-slate-950 shadow-neon hover:-translate-y-0.5",
  outline: "border border-white/15 bg-white/5 text-foreground hover:border-cyan-300/40 hover:bg-white/10",
  ghost: "text-foreground hover:bg-white/10",
  secondary: "bg-cyan-400/15 text-cyan-100 hover:bg-cyan-400/25 hover:text-white"
} as const;

const sizeClasses = {
  default: "h-11 px-5 py-2.5",
  sm: "h-9 rounded-lg px-3",
  lg: "h-12 rounded-xl px-6 text-base",
  icon: "h-10 w-10"
} as const;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className
}: {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, className });

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className)
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
