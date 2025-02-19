'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { Logo } from '@/components/design-system/logo'
import { SidebarElement } from '@/components/sidebar/sidebar-element'
import { SidebarToggle } from '@/components/sidebar/sidebar-toggle'
import { sidebarPages } from '@/lib/data/settings'
import { cn } from '@/lib/utils'


type ReducedProject = {
  id: string
  title: string | null
}

type ReducedPlaylist = {
  id: string
  name: string | null
}

export function Sidebar({
  isExpandedInitially,
  projects,
  playlists,
}: {
  isExpandedInitially: boolean
  projects: ReducedProject[] | null
  playlists: ReducedPlaylist[] | null
}) {
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]
  const [expanded, setExpanded] = useState(isExpandedInitially)

  return (
    <motion.nav
      initial={{ width: expanded ? 215 : 60 }}
      animate={{ width: expanded ? 215 : 60 }}
      transition={{ duration: 0.15 }}
      className="hidden h-svh flex-col justify-between border-r pb-2 pt-5 sm:flex"
    >
      <div>
        <div className="flex h-7 w-full items-center justify-between group">
          <Logo
            className={cn('pl-[.8rem]', {
              'group-hover:hidden group-hover:px-0': !expanded,
            })}
            href="/home"
          />
          <SidebarToggle
            className={cn({
              'mr-3': expanded,
              'mx-auto hidden h-9 group-hover:inline-flex': !expanded,
            })}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </div>
        <div className="flex h-full flex-col gap-2 divide-y-[0.5px] divide-border py-4">
          <div className="flex flex-col gap-1 p-2">
            {sidebarPages.map((page) => (
              <SidebarElement
                key={page.href}
                current={currentPage}
                expanded={expanded}
                href={page.href}
                title={page.name}
                Icon={page.Icon}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
