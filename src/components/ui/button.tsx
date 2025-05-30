import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-slate-500 font-semibold shadow-xs transition-colors cursor-pointer hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:bg-slate-100 focus-visible:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-700 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-slate-300 bg-transparent",
      },
      size: {
        default: "px-3 py-2",
        sm: "rounded-md px-3 py-1.5",
        lg: "h-10 rounded-md px-8",
        icon: "p-2 hover:bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
