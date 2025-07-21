import { SearchGaragesQuery } from '@autospace/network/src/gql/generated';
import { useKeypress } from '@autospace/util/hooks/keys';
import { useState } from 'react';
import { Marker } from '../map/MapMarker';
import { FormProviderBookSlot } from '@autospace/forms/src/bookSlot';
import { Dialog } from '../../atoms/Dialog';
import { ParkingIcon } from '../../atoms/ParkingIcon';
import { useWatch } from 'react-hook-form';
import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarages';
import { BookSlotPopup } from '../BookSlotPopup';

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number];
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const { endTime, startTime } = useWatch<FormTypeSearchGarage>();
  useKeypress(['Escape'], () => setShowPopup(false));
  if (!marker?.address?.lat || !marker.address.lng) {
    return null;
  }

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
          <BookSlotPopup garage={marker}/>
        </FormProviderBookSlot>
      </Dialog>
      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e: any) => {
          e.originalEvent.stopPropagation();
          setShowPopup((state) => !state);
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  );
};
