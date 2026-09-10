'use client'

import * as React from 'react'
import { Check, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }
>(({ className, checked, indeterminate, ...props }, ref) => (
  <div className="relative inline-flex items-center">
    <input
      type="checkbox"
      ref={el => {
        if (el) el.indeterminate = !!indeterminate
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as { current: HTMLInputElement | null }).current = el
      }}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary cursor-pointer appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        (checked || indeterminate) && 'bg-primary border-primary',
        className
      )}
      checked={checked}
      {...props}
    />
    {checked ? (
      <Check className="absolute left-0 top-0 h-4 w-4 text-primary-foreground pointer-events-none" />
    ) : indeterminate ? (
      <Minus className="absolute left-0 top-0 h-4 w-4 text-primary-foreground pointer-events-none" />
    ) : null}
  </div>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }
