'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, checked, ...props }, ref) => (
  <div className="relative inline-flex items-center">
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary cursor-pointer appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked && 'bg-primary border-primary',
        className
      )}
      checked={checked}
      {...props}
    />
    {checked && (
      <Check className="absolute left-0 top-0 h-4 w-4 text-primary-foreground pointer-events-none" />
    )}
  </div>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }
