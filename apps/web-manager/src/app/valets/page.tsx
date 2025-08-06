import { ManageValets } from '@autospace/ui/src/components/templates/ManageValets'
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn'

// path /valets của web-manager
export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}
