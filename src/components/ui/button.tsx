import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-terminal font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "crt-button text-neon-green hover:text-terminal-black rounded-sm",
        terminal: "bg-terminal-dark border-2 border-neon-green/60 text-neon-green hover:bg-neon-green/10 hover:border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.4)] rounded-sm glow-text",
        cyber: "bg-gradient-to-r from-electric-blue/20 to-cyan-accent/20 border border-electric-blue/60 text-electric-blue hover:from-electric-blue/30 hover:to-cyan-accent/30 hover:border-electric-blue hover:shadow-[0_0_20px_hsl(var(--electric-blue)/0.4)] rounded-sm",
        destructive: "bg-red-error/20 border border-red-error/60 text-red-error hover:bg-red-error/30 hover:border-red-error hover:shadow-[0_0_20px_hsl(var(--red-error)/0.4)] rounded-sm",
        outline: "border-2 border-neon-green/40 bg-transparent text-neon-green hover:bg-neon-green/10 hover:border-neon-green/80 rounded-sm matrix-hover",
        secondary: "bg-electric-blue/20 border border-electric-blue/60 text-electric-blue hover:bg-electric-blue/30 hover:border-electric-blue rounded-sm",
        ghost: "text-neon-green hover:bg-neon-green/10 hover:text-neon-green-glow rounded-sm",
        link: "text-neon-green underline-offset-4 hover:underline hover:text-neon-green-glow",
        warning: "bg-amber-warning/20 border border-amber-warning/60 text-amber-warning hover:bg-amber-warning/30 hover:border-amber-warning hover:shadow-[0_0_20px_hsl(var(--amber-warning)/0.4)] rounded-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-12 rounded-sm px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-14 rounded-sm px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
