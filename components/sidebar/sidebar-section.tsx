import type { LucideIcon } from 'lucide-react'

import { SidebarElement } from './sidebar-element'

export const SidebarSection = ({
  title,
  expanded,
  items,
  currentPage,
  Icon,
}: {
  title: string
  expanded: boolean
  items: { id: string; name: string | null }[] | null
  currentPage: string
  Icon: LucideIcon
}) => (
  <div className="px-3 py-2 pt-4">
    <h3 className="px-4 text-lg text-secondary-foreground">{title}</h3>
    <div className="h-[210px] overflow-y-auto">
      <div className="grid gap-1 py-2">
        {items && items.length > 0 ? (
          items.map((item, i) => (
            <SidebarElement
              key={i}
              expanded={expanded}
              current={currentPage}
              href={`/${title.toLowerCase()}/${item.id}`}
              title={item.name ?? ''}
              Icon={Icon}
            />
          ))
        ) : (
          <span className="mx-4 w-44 rounded-md border border-dashed px-3 py-2 text-sm">
            No {title.toLowerCase()} added yet
          </span>
        )}
      </div>
    </div>
  </div>
)
