
"use client"

import * as React from "react"
import { cn } from "./cn"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost" | "secondary" | "outline"
    size?: "default" | "sm" | "lg" | "icon"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-200 hover:bg-gray-100",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  }

   

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }