import { SearchGaragesQuery } from '@autospace/network/src/gql/generated'
import { useState } from 'react'
import { toast } from '../molecules/Toast'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormTypeBookSlot } from '@autospace/forms/src/bookSlot'
import { Switch } from '../atoms/Switch'
import { dividerClasses } from '@mui/material'
import { Marker } from './map/MapMarker'
import { Map } from './map/Map'
import { ParkingIcon } from '../atoms/ParkingIcon'
import { IconUser } from '@tabler/icons-react'
import { Directions } from './Directions'
import { Panel } from './map/Panel'
import { DefaultZoomControls } from './map/ZoomControls'

export const ManageValets = ({
  garage,
}: {
  garage: SearchGaragesQuery['searchGarages'][number]
}) => {
  // state cho switch
  const [showValet, setShowValet] = useState(false)

  // 
  const { setValue } = useFormContext<FormTypeBookSlot>()
  // valet lay tu form_popup
  const { valet } = useWatch<FormTypeBookSlot>()

  // lat, long cua garage
  const lat = garage.address?.lat
  const lng = garage.address?.lng
  if (!lat || !lng) {
    toast('Garage location not set.')
    return <div>Something went wrong.</div>
  }

  return (
    <div className="p-2 space-y-3 bg-gray-25">
      <div className="text-xl font-bold">Valet</div>
      <p className="text-sm text-gray">
        Our valets will whisk your car away to its reserved spot and bring it
        back when you&apos;re ready. It&apos;s like magic, but with cars!
      </p>

      {/* init là false */}
      <Switch
        checked={showValet}
        onChange={(e) => {
          setShowValet(e)

          if (!e) {
            // tắt switch thì set valet = false
            setValue('valet', undefined, {
              shouldValidate: true,
            })
            // set diff_location = false
            setValue('valet.differentLocations', false)
          } else {
            // same pickup & drop_off
            setValue('valet.pickupInfo', {
              lat,
              lng,
            })
            setValue('valet.dropoffInfo', {
              lat,
              lng,
            })
          }
        }}
        label={'Need valet?'}
      />

      {showValet ? (
        <div>
          <div className="mb-6 space-y-3">
            <p className="text-sm text-gray">
              Want your car delivered somewhere else? No problem! Choose a
              different drop-off point and we&apos;ll make sure your ride is
              there waiting for you.
            </p>
            <Switch
              // init là false <=> 1 user marker
              checked={valet?.differentLocations || false}
              onChange={(e) => {
                setValue('valet.differentLocations', e)
                if (!e) {
                  // switch tắt(init) thì 1 marker 'dropoff & pickup'
                  // lat,long trùng pickup
                  setValue('valet.dropoffInfo', {
                    lat: valet?.pickupInfo?.lat || lat,
                    lng: valet?.pickupInfo?.lng || lng,
                  })
                } else {
                  setValue('valet.dropoffInfo', {
                    lat,
                    lng,
                  })
                }
              }}
              label={'Add a different drop off location?'}
            />
          </div>
          <Map
            initialViewState={{
              latitude: lat,
              longitude: lng,
              zoom: 13,
            }}
            height="50vh"
          >
            <Panel position="right-center">
              <DefaultZoomControls />
            </Panel>
            <Marker latitude={lat} longitude={lng}>
              <ParkingIcon />
            </Marker>
            {valet?.pickupInfo?.lng && valet?.pickupInfo?.lat ? (
              <>
                {/* marker 'pickup' || marker 'pickup & dropoff' */}
                <Marker
                  pitchAlignment="auto"
                  longitude={valet?.pickupInfo?.lng}
                  latitude={valet?.pickupInfo?.lat}
                  draggable
                  onDragEnd={({ lngLat }) => {
                    const { lat, lng } = lngLat
                    // 
                    setValue('valet.pickupInfo.lat', lat || 0)
                    setValue('valet.pickupInfo.lng', lng || 0)
                    // switch2 tắt thì set pickup = dropoff
                    if (!valet.differentLocations) {
                      setValue('valet.dropoffInfo.lat', lat || 0)
                      setValue('valet.dropoffInfo.lng', lng || 0)
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    <IconUser />
                    <span>
                      Pickup {!valet.differentLocations ? '& drop off' : null}
                    </span>
                  </div>
                </Marker>
                <Directions
                  sourceId={'pickup_route'}
                  // lat,long của garage
                  origin={{ lat, lng }}
                  destination={{
                    // lat,long của đích
                    lat: valet.pickupInfo.lat,
                    lng: valet.pickupInfo.lng,
                  }}
                  setDistance={(distance) => {
                    setValue('valet.pickupInfo.distance', distance)
                  }}
                />
              </>
            ) : null}

            {valet?.differentLocations &&
            valet?.dropoffInfo?.lng &&
            valet?.dropoffInfo?.lat ? (
              <>
                {/* thêm marker 'dropoff' riêng */}
                <Marker
                  pitchAlignment="auto"
                  longitude={valet.dropoffInfo.lng}
                  latitude={valet.dropoffInfo.lat}
                  draggable
                  onDragEnd={({ lngLat }) => {
                    const { lat, lng } = lngLat
                    setValue('valet.dropoffInfo.lat', lat || 0)
                    setValue('valet.dropoffInfo.lng', lng || 0)
                  }}
                >
                  <div className="flex flex-col items-center">
                    <IconUser />
                    <span>Drop off</span>
                  </div>
                </Marker>
                <Directions
                  sourceId={'dropoff_route'}
                  origin={{ lat, lng }}
                  destination={{
                    lat: valet.dropoffInfo.lat,
                    lng: valet.dropoffInfo.lng,
                  }}
                  setDistance={(distance) => {
                    setValue('valet.dropoffInfo.distance', distance)
                  }}
                />
              </>
            ) : null}
          </Map>
        </div>
      ) : null}
    </div>
  )
}
