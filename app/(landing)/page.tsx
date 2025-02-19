import type { Metadata } from 'next'

import { RotatingText } from './components/rotating-text'
import Footer from './footer'
import Header from './header'

export const metadata: Metadata = {
  title: { absolute: 'Auctions' },
}

export default async function Home() {
  return (
    <div className="flex h-svh flex-col overflow-x-hidden bg-gradient-to-b from-[#001024] to-[#000205]">
      <div className="flex h-full max-w-[1440px] flex-col items-center sm:mx-auto">
        <Header />
        <div className="flex grow flex-col items-center gap-y-10">
          <div className="flex h-full items-center justify-center">
            <div className="mt-10 space-y-12 px-4 lg:mt-32">
              <RotatingText className="h-12 w-screen text-center sm:h-28" />
              <div className="flex flex-col items-center space-y-20 md:space-y-40">
                <h2 className="text-center text-lg text-[hsl(0,0,89%)] sm:w-[600px] sm:text-xl">
                  The platform for wine and spirit auctions.
                </h2>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
