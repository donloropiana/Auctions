'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'

interface AnimatedDivProps extends MotionProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedDiv({
  children,
  className,
  ...props
}: AnimatedDivProps) {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  )
}
