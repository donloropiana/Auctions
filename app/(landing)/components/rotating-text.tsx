'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const items = [
  { id: 1, content: 'Wines' },
  { id: 2, content: 'Spirits' },
  { id: 3, content: 'Auctions' },
]

export function RotatingText({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((state) => {
        if (state >= items.length - 1) return 0
        return state + 1
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence>
        <motion.h1
          key={items[index].id}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: 'easeIn',
            duration: 0.4,
            damping: 1,
            stiffness: 100,
          }}
          className="absolute inset-x-0 mx-auto whitespace-nowrap text-6xl font-thin text-white md:text-7xl lg:text-9xl"
        >
          {items[index].content}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}
