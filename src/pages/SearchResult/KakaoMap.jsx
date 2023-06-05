import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';

const KakaoMap = () => {
  const { kakao } = window;
  const [level, setLevel] = useState(3);

  const locations = [
    { title: '카카오', latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: '생태연못', latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: '텃밭', latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: '근린공원', latlng: { lat: 33.451393, lng: 126.570738 } },
  ];

  const [location, setLoacation] = useState({ latitude: 33.5563, longitude: 126.79581 }); // 현재 위치를 저장할 상태

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = response => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const errorHandler = error => {
    console.log(error);
  };

  return (
    <>
      {location && (
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
          style={{ position: 'relative', width: '100%', height: '100%' }} // 지도 크기
          level={level} // 지도 확대 레벨
        >
          <MapMarker
            position={{ lat: location.latitude, lng: location.longitude }}
            title="현재위치"
          />
          {locations.map((loc, idx) => (
            <CustomMapMarker loc={loc} key={idx} />
          ))}
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="32px"
            height="32px"
            bgColor={'white'}
            borderRadius="50%"
            boxShadow="md"
            _hover={{ bg: 'gray.200' }}
            pos={'absolute'}
            transform="translate(-110%, -120%)"
            left="100%"
            top="100%"
            zIndex={500}
            onClick={() => setLevel(level + 1)}
          >
            -
          </Button>
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            bgColor={'white'}
            justifyContent="center"
            width="32px"
            height="32px"
            borderRadius="50%"
            boxShadow="md"
            _hover={{ bg: 'gray.200' }}
            pos={'absolute'}
            transform="translate(-230%, -120%)"
            left="100%"
            top="100%"
            zIndex={500}
            onClick={() => setLevel(level - 1)}
          >
            +
          </Button>
        </Map>
      )}
    </>
  );
};

export default KakaoMap;

const CustomMapMarker = ({ loc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const markerStyle = {
    padding: '5px',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: '4px',
    height: 'full',
    width: 'full',
    minWidth: '150px',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  };

  const getAddress = (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  useEffect(() => {
    getAddress(loc.latlng.lat, loc.latlng.lng);
  }, []);
  return (
    <MapMarker
      key={`${loc.title}-${loc.latlng}`}
      position={loc.latlng}
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        size: { width: 24, height: 35 },
      }}
      // clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // 마커에 마우스오버 이벤트를 등록합니다
      onMouseOver={
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        () => setIsOpen(true)
      }
      onClick={() => navigate('/restaurant/1')}
      // 마커에 마우스아웃 이벤트를 등록합니다
      onMouseOut={
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        () => setIsOpen(false)
      }
    >
      {isOpen && (
        <CustomOverlayMap position={loc.latlng} yAnchor={1.5} zIndex={500}>
          <div style={markerStyle}>
            <span style={{ fontSize: '18px', textAlign: 'center' }}>{loc.title}</span>
            <br />
            <span style={{ fontSize: '14px', textAlign: 'center' }}>{address.address_name}</span>
            <br />
            <span style={{ fontSize: '8px' }} onClick={() => navigate('/restaurant/1')}>
              클릭시 이동합니다
            </span>
          </div>
        </CustomOverlayMap>
      )}
    </MapMarker>
  );
};
