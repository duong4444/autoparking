import { ManageAdmins } from '@autospace/ui/src/components/templates/ManageAdmins';
import { IsAdmin } from '@autospace/ui/src/components/organisms/IsAdmin';
import { IsLoggedIn } from '@autospace/ui/src/components/organisms/IsLoggedIn';

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        <IsAdmin>
          <ManageAdmins />
        </IsAdmin>
      </IsLoggedIn>
    </main>
  );
}
