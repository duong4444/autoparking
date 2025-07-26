import { useLazyQuery } from '@apollo/client';
import { SearchGaragesDocument } from '@autospace/network/src/gql/generated';
import { useEffect } from 'react';
import { GarageMarker } from './GarageMarker';
import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarages';
import { useFormContext } from 'react-hook-form';
import { IconInfoCircle } from '@tabler/icons-react';
import { useConvertSearchFormToVariables } from '@autospace/forms/src/adapters/searchFormAdapter';
import { Panel } from '../map/Panel';
import { Loader } from '../../molecules/Loader';
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

  if (data?.searchGarages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    );
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  );
};
