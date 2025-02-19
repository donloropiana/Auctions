import { cookies } from 'next/headers'

import { Sidebar } from './sidebar'

export default async function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isExpandedInitially = cookieStore.get('sidebar_expanded')?.value === 'true'

  return (
    <div className="relative h-screen">
      <div className="flex flex-1 overflow-x-hidden sm:h-full">
        <Sidebar isExpandedInitially={isExpandedInitially} projects={[]} playlists={[]} />
        <main className="flex flex-1 flex-col sm:overflow-y-auto">
          <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        </main>
      </div>
    </div>
  )
}
