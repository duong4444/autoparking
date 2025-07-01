'use client';
import { useQuery } from '@apollo/client';
import { CompaniesDocument } from '@autospace/network/src/gql/generated';
import { BrandIcon } from '@autospace/ui/src/components/atoms/BrandIcon';
import { Button } from '@autospace/ui/src/components/atoms/Button';
import { useSession, signOut } from 'next-auth/react';
import {Sidebar} from "@autospace/ui/src/components/organisms/Sidebar"

import Link from 'next/link';
export default function Home() {
  const { data } = useQuery(CompaniesDocument);
  const { data: sessionData, status } = useSession();
  return (
    <main className='p-8'>
      <div>
        {data?.companies.map((company) => (
          <div
            key={company.id}
            className="p-4 rounded bg-cyan-200"
          >
            {company.displayName}
          </div>
        ))}
      </div>
    </main>
  );
}
