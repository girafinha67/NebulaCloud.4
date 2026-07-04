'use client'

import { useState, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function FloatingInput({
  label,
  className,
  value: controlledValue,
  onChange: controlledOnChange,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [internalValue, setInternalValue] = useState('')
  const [focused, setFocused] = useState(false)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? (controlledValue as string) : internalValue
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        onChange={(e) => {
          if (isControlled) controlledOnChange?.(e)
          else setInternalValue(e.target.value)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          'peer h-14 w-full rounded-2xl border border-border bg-card/40 px-4 pt-4 text-sm text-foreground outline-none transition-all placeholder:text-transparent focus:border-accent/60 focus:bg-card/60',
          className,
        )}
        placeholder={label}
      />
      <label
        className={cn(
          'pointer-events-none absolute left-4 text-muted-foreground transition-all',
          active ? 'top-2 text-[11px]' : 'top-1/2 -translate-y-1/2 text-sm',
        )}
      >
        {label}
      </label>
    </div>
  )
}
