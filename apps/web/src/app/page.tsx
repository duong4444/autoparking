'use client';
import { useQuery } from '@apollo/client';
import { CompaniesDocument } from '@autospace/network/src/gql/generated';
import { BrandIcon } from '@autospace/ui/src/components/atoms/BrandIcon';
import { Button } from '@autospace/ui/src/components/atoms/Button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
export default function Home() {
  const { data } = useQuery(CompaniesDocument);
  const { data: sessionData, status } = useSession();
  return (
    <main>
      {sessionData?.user?.uid ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <BrandIcon />
      <Button loading>Haha</Button>
      <div className="bg-cyan-200 animate-wiggle-fade">AutoParking</div>
      <div>
        {data?.companies.map((company) => (
          <div
            key={company.id}
            className="p-4 rounded bg-cyan-400 border-amber-600 border-1"
          >
            {company.displayName}
          </div>
        ))}
      </div>
    </main>
  );
}
