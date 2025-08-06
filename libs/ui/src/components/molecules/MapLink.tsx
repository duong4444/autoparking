import { LatLng } from '@autospace/util/types';
import { IconMap2 } from '@tabler/icons-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface IMapLinkProps {
  waypoints: LatLng[];
  children?: ReactNode;
  className?: string;
}

export const MapLink = ({
  waypoints,
  children = <IconMap2 />,
  className,
}: IMapLinkProps) => {
  if (waypoints.length === 0) {
    return null;
  }

  if (waypoints.length === 1) {
    console.log('log waypoint1: ', waypoints);

    const { lat, lng } = waypoints[0];
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    return (
      <Link
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </Link>
    );
  }

  // https://www.google.com/maps/place/21%C2%B000'18.6%22N+105%C2%B047'56.7%22E/@21.0084215,105.7993588,1955m/data=!3m1!1e3!4m4!3m3!8m2!3d21.005158!4d105.799087?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D

  console.log('log waypoint ngoai`: ', waypoints);
// 0: {lat: 21.03512765141595, lng: 105.8327704803286}
// 1: lat: 21.03421438273777 lng: 105.8459884063553 __typename: "Address"

  const origin = waypoints[0];
  const destination = waypoints[waypoints.length - 1];
  const waypointsParam = waypoints
    .slice(1, -1)
    .map(({ lat, lng }) => `${lat},${lng}`)
    .join('|');
  console.log("waypointsParam: ",waypointsParam);
  

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypointsParam}`;
  console.log("gg_map_url: ",googleMapsUrl);
  // https://www.google.com/maps/dir/?api=1&origin=21.03241987552367,105.8268481628239&destination=21.03421438273777,105.8459884063553&waypoints=
  
  return (
    <Link
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
};
