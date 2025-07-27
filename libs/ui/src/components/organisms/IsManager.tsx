'use client';
import { MyCompanyDocument } from '@autospace/network/src/gql/generated';
import { BaseComponent } from '@autospace/util/types';
import { useQuery } from '@apollo/client';
import { LoaderPanel } from '../molecules/Loader';
import { AlertSection } from '../molecules/AlertSection';
import { CreateCompany } from './CreateCompany'
import { ReactNode } from 'react';

type RenderPropChild = (id: number) => ReactNode;

// Render Prop Pattern 
export const IsManager = ({ children }: BaseComponent) => {
  const { data, loading } = useQuery(MyCompanyDocument);

  if (loading) {
    return <LoaderPanel text="Loading company..." />;
  }

  if (!data?.myCompany)
    return (
      <AlertSection>
        <div>You don&apos;t have a company yet.</div>
        <CreateCompany />
      </AlertSection>
    );

  return children;
};
