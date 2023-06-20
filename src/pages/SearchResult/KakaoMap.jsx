import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';

const KakaoMap = ({
  restaurants,
  currentLocation,
  setCurrentLocation,
  mapCenter,
  setMapCenter,
  openMarker,
  setOpenMarker,
  isPanto,
}) => {
  const { kakao } = window;
  const [level, setLevel] = useState(5);
  const [locations, setLocations] = useState([]);
  // const [currentLocation, setCurrentLocation] = useState({ lat: 33.5563, lng: 126.79581 }); // 상위 컴포넌트로 꺼냄

  useEffect(() => {
    let newLocations = [];
    restaurants.forEach(restaurant => {
      newLocations.push({
        title: restaurant.restaurantName,
        latlng: { lat: restaurant.restaurantX, lng: restaurant.restaurantY },
        restaurantNo: restaurant.restaurantNo,
      });
    });
    setOpenMarker({
      restaurantNo: restaurants[0].restaurantNo,
      title: restaurants[0].restaurantName,
      latlng: { lat: restaurants[0].restaurantX, lng: restaurants[0].restaurantY },
      isOpen: true,
    });
    setLocations(newLocations);
    setMapCenter(newLocations[0].latlng);
    setCurrentLocation({ lat: newLocations[0].latlng.lat, lng: newLocations[0].latlng.lng });
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, [restaurants]);

  const successHandler = response => {
    // console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setCurrentLocation({ latitude, longitude });
  };

  const errorHandler = error => {
    console.log(error);
  };

  return (
    <>
      {locations.length != 0 && (
        <Map
          center={mapCenter}
          style={{ position: 'relative', width: '100%', height: '100%' }} // 지도 크기
          level={level} // 지도 확대 레벨
          isPanto={isPanto}
        >
          <MapMarker
            position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
            title="현재위치"
          />

          {locations.map((loc, idx) => (
            <CustomMapMarker loc={loc} setOpenMarker={setOpenMarker} key={idx} />
          ))}
          {openMarker && <CustomMapMarker loc={openMarker} setOpenMarker={setOpenMarker} />}

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

const CustomMapMarker = ({ loc, setOpenMarker }) => {
  // const [isOpen, setIsOpen] = useState(loc.isOpen == true ? true : false);

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
  }, [loc]);

  return (
    <MapMarker
      key={`${loc.title}-${loc.latlng.lat}`}
      position={loc.latlng}
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        size: { width: 24, height: 35 },
      }}
      // clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // 마커에 마우스오버 이벤트를 등록합니다
      onMouseOver={
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        () => {
          setOpenMarker({
            restaurantNo: loc.restaurantNo,
            title: loc.title,
            latlng: loc.latlng,
            isOpen: true,
          });
        }
      }
      onClick={() => navigate(`/restaurant/${loc.restaurantNo}`)}
      // 마커에 마우스아웃 이벤트를 등록합니다
      // onMouseOut={
      //   // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      //   () => {
      //     setOpenMarker(null);
      //   }
      // }
    >
      {loc.isOpen == true && (
        <CustomOverlayMap position={loc.latlng} yAnchor={1.5} zIndex={500}>
          <div style={markerStyle} onClick={() => navigate(`/restaurant/${loc.restaurantNo}`)}>
            <span style={{ fontSize: '18px', textAlign: 'center' }}>{loc.title}</span>
            <br />
            <span style={{ fontSize: '14px', textAlign: 'center' }}>
              {address && address.address_name}
            </span>
            <br />
            <span style={{ fontSize: '8px' }}>클릭시 이동합니다</span>
          </div>
        </CustomOverlayMap>
      )}
    </MapMarker>
  );
};
