'use client'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@autospace/ui/src/components/organisms/IsValet'
import { ValetHome } from '@autospace/ui/src/components/templates/ValetHome'

// home page của web-valet
export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
