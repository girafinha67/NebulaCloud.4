'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const easeOut = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
