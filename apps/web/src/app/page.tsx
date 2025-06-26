'use client';
import { useQuery } from '@apollo/client';
import { CompaniesDocument } from '@autospace/network/src/gql/generated';
export default function Home() {
  const { data } = useQuery(CompaniesDocument);

  return (
    <main>
      Hello world
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
