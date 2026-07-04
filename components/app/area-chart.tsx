'use client'

import { useId } from 'react'
import { motion } from 'motion/react'

export function AreaChart({
  data,
  height = 120,
  className,
  stroke = 'var(--accent)',
}: {
  data: number[]
  height?: number
  className?: string
  stroke?: string
}) {
  const id = useId()
  const width = 300
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data.map((d, i) => {
    const x = i * stepX
    const y = height - ((d - min) / range) * (height - 16) - 8
    return [x, y] as const
  })

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')

  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ width: '100%', height }}
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#fill-${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function RadialGauge({
  value,
  label,
  sublabel,
}: {
  value: number
  label: string
  sublabel?: string
}) {
  const r = 52
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid place-items-center">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="var(--secondary)"
            strokeWidth="10"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-semibold">{value}%</span>
        </div>
      </div>
      <p className="mt-1 text-sm font-medium">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
    </div>
  )
}
