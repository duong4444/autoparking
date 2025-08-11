import { IsAdmin } from '@autospace/ui/src/components/organisms/IsAdmin';
import { AdminHome } from '@autospace/ui/src/components/templates/AdminHome';
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn';

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        <IsAdmin>
          <AdminHome />
        </IsAdmin>
      </IsLoggedIn>
    </main>
  );
}
