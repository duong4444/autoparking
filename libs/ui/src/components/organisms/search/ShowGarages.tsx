import { useLazyQuery } from '@apollo/client';
import { SearchGaragesDocument } from '@autospace/network/src/gql/generated';
import { useEffect } from 'react';
import { GarageMarker } from './GarageMarker';
import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarages';
import { useFormContext } from 'react-hook-form';
import { useConvertSearchFormToVariables } from '@autospace/forms/src/adapters/searchFormAdapter';
export const ShowGarages = () => {
  const [searchGarages, { loading, data, error }] = useLazyQuery(
    SearchGaragesDocument,
  );

  const { variables } = useConvertSearchFormToVariables();
  console.log('Variables gửi lên GraphQL:', JSON.stringify(variables, null, 2));

  useEffect(() => {
    if (variables) {
      searchGarages({ variables });
    }
  }, [searchGarages, variables]);

  console.log('data tu query: ', data);

  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  );
};
