'use client';
import { useCallback } from 'react';
import { Map } from '../organisms/map/Map';
import { Panel } from '../organisms/map/Panel';
import { DefaultZoomControls } from '../organisms/map/ZoomControls';
import { ViewStateChangeEvent } from 'react-map-gl';
import { initialViewState } from '@autospace/util/constants';
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'

export const SearchPage = () => {
  // useCallBack: memoize hàm giữa các lần render ,tránh tạo lại ko cần thiết
  // ViewStateChangeEvent: cấu trúc sự kiện thay đổi trạng thái bản đồ như drag,zoom,...
  const handleMapChange = useCallback(
    // target: instance của bđồ Mapbox
    (target: ViewStateChangeEvent['target']) => {
      // lấy danh giới hiện tại của bđồ, góc ĐB,TN
      const bounds = target.getBounds();
      console.log('bounds', bounds);
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lat || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lat || 0,
      };
      console.log(
        'locationFilter in handleMapChange_SearchPage: ',
        locationFilter,
      );
    },
    [],
  );
  return (
    // gọi handleMapChange khi bđồ load xong, kết thúc kéo bđồ,kết thúc zoom
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <Panel position='left-top'>
        <SearchPlaceBox />
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
    </Map>
  );
};
