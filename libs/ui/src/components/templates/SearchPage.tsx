'use client';
import { useCallback } from 'react';
import { Map } from '../organisms/map/Map';
import { Panel } from '../organisms/map/Panel';
import { DefaultZoomControls } from '../organisms/map/ZoomControls';
import { ViewStateChangeEvent } from 'react-map-gl';
import { initialViewState } from '@autospace/util/constants';
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox';
import { FormTypeSearchGarage } from '@autospace/forms/src/searchGarages';
import { useFormContext } from 'react-hook-form';
import { IconType } from '../molecules/IconTypes';
import { IconArrowDown } from '@tabler/icons-react';
import { HtmlInput } from '../atoms/HtmlInput';
import { toLocalISOString } from '@autospace/util/date';
import { ShowGarages } from '../organisms/search/ShowGarages';
import { FilterSidebar } from '../organisms/search/FilterSidebar';

export const SearchPage = () => {
  const { register, setValue, watch } = useFormContext<FormTypeSearchGarage>();
  const formData = watch();
  console.log('formData trong searchPage: ', formData);

  // useCallBack: memoize hàm giữa các lần render ,tránh tạo lại ko cần thiết
  // ViewStateChangeEvent: cấu trúc sự kiện thay đổi trạng thái bản đồ như drag,zoom,...
  const handleMapChange = useCallback(
    // target: instance của bđồ Mapbox
    (target: ViewStateChangeEvent['target']) => {
      // lấy ranh giới hiện tại của bđồ, góc ĐB,TN
      const bounds = target.getBounds();
      console.log('bounds', bounds);
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      };
      console.log(
        'locationFilter in handleMapChange_SearchPage: ',
        locationFilter,
      );
      setValue('locationFilter', locationFilter);
    },
    [setValue],
  );
  return (
    // gọi handleMapChange khi bđồ load xong, kết thúc kéo bđồ,kết thúc zoom
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    > 
      {/* Marker */}
      <ShowGarages />
      {/* Datetime */}
      <Panel position="left-top">
        <div className="flex flex-col items-stretch">
          <SearchPlaceBox />
          <div className="flex relative pl-1 flex-col mt-1 bg-white/40 items-center gap-1 backdrop-blur-sm">
            <div className=" absolute left-[1px] top-1/2 -translate-y-1/2 ">
              <IconArrowDown className="p-1" />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.startTime} />
              <HtmlInput
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                min={toLocalISOString(new Date()).slice(0, 16)}
                {...register('startTime')}
              />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.endTime} />
              <HtmlInput
                min={toLocalISOString(new Date()).slice(0, 16)}
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                {...register('endTime')}
              />
            </div>
          </div>
        </div>
      </Panel>
      {/* Zoom in & zoom out */}
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      {/* FilterSideBar */}
      <Panel position="right-top">
        <FilterSidebar />
      </Panel>
    </Map>
  );
};
