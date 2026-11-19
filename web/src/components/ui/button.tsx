import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

// Provey-style controls: solid fills, a soft 8px corner, a darker fill on hover. 44px minimum height.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,translate] duration-200 ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-55 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-dark",
        secondary: "bg-cream text-brand hover:bg-cream-dark",
        cream: "bg-cream text-brand-dark hover:bg-white",
        white: "bg-white text-brand hover:bg-cream",
        outline: "border-brand/70 bg-transparent text-brand hover:border-brand hover:bg-brand hover:text-white",
        "outline-light": "border-white/60 bg-transparent text-white hover:border-white hover:bg-white hover:text-brand",
        ghost: "text-ink hover:bg-brand-soft hover:text-brand",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "h-auto px-0 text-brand hover:text-brand-dark [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out-expo hover:[&_svg:last-child]:translate-x-0.5",
      },
      size: {
        default: "h-12 gap-2.5 px-6 text-[0.9375rem]",
        sm: "h-11 gap-2 px-4 text-sm",
        lg: "h-14 gap-3 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-11",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
