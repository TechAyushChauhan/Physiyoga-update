
"use client"

import * as React from "react"
import { cn } from "./cn"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500 text-white",
      className
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge }


