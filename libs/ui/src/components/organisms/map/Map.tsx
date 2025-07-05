// MapGL cpn để render bản đồ Mapbox
// useMap cho phép truy cập vào instance của bản đồ Mapbox hiện tại để thêm sự kiện , cấu hình
import MapGl, { useMap } from 'react-map-gl';

//
type MapProps = React.ComponentProps<typeof MapGl> & { height?: string };

export const Map = ({ height = 'calc(100vh - 4rem)', ...props }: MapProps) => {
  return (
    <MapGl
      {...props}
      projection={{ name: 'globe' }} // bản đồ dạng cầu 3d
      mapStyle="mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3" // style đc tạo bởi người dùng
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ height }}
      scrollZoom={false}
    >
      {/* cấu hình hiệu ứng sương mù cho bản đồ */}
      <StyleMap />
      {/* truyền cpn con như markers, popup, ... */}
      {props.children}
    </MapGl>
  );
};

export const StyleMap = () => {
  const { current } = useMap(); // instace của bđồ hiện tại

  current?.on('style.load', () => {
    // chạy khi bđồ đc tải xong , setFog cấu hình hiệu ứng Fog
    current?.getMap().setFog({
      // getMap giúp truy cập đtượng bđồ gốc(Mapbox GL JS thay vì React wrapper)
      color: 'rgb(255, 255, 255)', // Lower atmosphere
      range: [1, 10], // kcách sương mù xuất hiện từ gân 1(gần camera) đến 10(xa camera)
      // @ts-ignore
      'high-color': 'rgb(200, 200, 200)', // Upper atmosphere
      'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(150, 150, 150)', // Background color
      'star-intensity': 0.5, // Background star brightness (default 0.35 at low zooms )
    });
  });
  return null; // ko render bất kỳ UI nào mà chỉ thêm hiệu ứng fog vào bđồ khi style của bđồ đc tải
};
