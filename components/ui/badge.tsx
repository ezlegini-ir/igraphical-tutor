import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground  hover:bg-primary/80",
        green:
          "border-[1px] border-green-600 bg-green-100 text-green-800 hover:bg-green-200",
        red: "border-[1px] border-red-600 bg-red-100 text-red-800 hover:bg-red-200",
        blue: "border-[1px] border-blue-400 bg-blue-50 text-blue-800 hover:bg-blue-200",
        richBlue:
          "border-[2px] border-blue-400 bg-blue-100 text-blue-800 hover:bg-blue-200",
        gray: "border-[1px] border-slate-400 bg-slate-50 text-gray-800 hover:bg-gray-200",
        orange:
          "border-[1px] border-orange-400 bg-orange-50 text-orange-800 hover:bg-orange-100",

        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-white  hover:bg-destructive/80",
        outline: "text-foreground",
        primary:
          "border-transparent bg-primary/10 text-secondary-foreground hover:bg-primary/100 hover:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
