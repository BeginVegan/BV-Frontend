import Axios from '@/api/apiConfig';
import SearchFilter from '@/components/search/SearchFilter';
import { Grid, GridItem, Heading, Icon, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiEqualizerLine } from 'react-icons/ri';
import KakaoMap from './KakaoMap';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { useParams } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import LoadingPage from '../Loading/LoadingPage';

const SearchResultPage = () => {
  // const { query } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [isRestaurantsNull, setIsRestaurantsNull] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.571848, lng: 127.00116 });
  const [isPanto, setIsPanto] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.571848, lng: 127.00116 });
  const [openMarker, setOpenMarker] = useState(null);

  // const { data, isFetching } = useRestaurantQuery();
  // useEffect(() => {
  //   if (!isFetching) {
  //     console.log(data);
  //   }
  // }, [isFetching]);

  // const onClick = () => {
  //   if (!isFetching) {
  //     console.log(data);
  //   }
  // };

  const { query } = useParams();

  // const { data: restaurants, isLoading } = ucseQuery('getRestaurantSearhList', () =>
  //   RestaurantService.getRestaurantSearchList(query)
  // );

  const searchData = async () => {
    const res = await Axios.get(`/restaurant/search?keyword=${query}`);
    if (!(res.data && res.data.length > 0)) {
      setIsRestaurantsNull(true);
    }
    setRestaurants(res.data);
  };

  useEffect(() => {
    searchData();
    setIsLoading(false);
  }, [query]);

  const reFetchData = () => {
    setIsFilterOpen(true);
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  // const { kakao } = window;

  // const positions = [
  //   {
  //     title: '국립중앙박물관',
  //     latlng: new kakao.maps.LatLng(37.52385, 126.98047),
  //   },
  //   {
  //     title: '카카오',
  //     latlng: new kakao.maps.LatLng(33.450705, 126.570677),
  //   },
  //   {
  //     title: '생태연못',
  //     latlng: new kakao.maps.LatLng(33.450936, 126.569477),
  //   },
  //   {
  //     title: '텃밭',
  //     latlng: new kakao.maps.LatLng(33.450879, 126.56994),
  //   },
  //   {
  //     title: '근린공원',
  //     latlng: new kakao.maps.LatLng(33.451393, 126.570738),
  //   },
  // ];

  // 마커 이미지의 이미지 주소입니다
  // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

  // useEffect(() => {
  //   const container = document.getElementById('map');
  //   const options = {
  //     center: new kakao.maps.LatLng(37.52385, 126.98047),
  //     level: 7,
  //   };
  //   const map = new kakao.maps.Map(container, options);
  //   presentMarks(map);
  //   // getCurrentPos();
  // }, []);

  // const presentMarks = map => {
  //   for (let i = 0; i < positions.length; i++) {
  //     // 마커 이미지의 이미지 크기 입니다
  //     const imageSize = new kakao.maps.Size(24, 35);

  //     // 마커 이미지를 생성합니다
  //     const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  //     // 마커를 생성합니다
  //     let marker = new kakao.maps.Marker({
  //       map: map, // 마커를 표시할 지도
  //       position: positions[i].latlng, // 마커를 표시할 위치
  //       title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
  //       image: markerImage, // 마커 이미지
  //     });
  //     // 정보 창을 생성합니다
  //     const content = `
  //         <div style="position: relative; text-align: center;">
  //           <div style="padding: 10px; width:10rem; margin:0;">
  //             <p style="margin: 0;">${marker.Gb}</p>
  //             <p style="margin: 0;">추가 내용</p>
  //           </div>
  //         </div>
  //         `;
  //     const infowindow = new kakao.maps.InfoWindow({
  //       content: content,
  //     });

  //     kakao.maps.event.addListener(marker, 'mouseover', function () {
  //       // 정보 창을 지도에 표시합니다
  //       infowindow.open(map, marker);
  //     });
  //     // 마커에서 마우스가 벗어날 때 정보 창을 닫는 이벤트 리스너를 추가합니다
  //     kakao.maps.event.addListener(marker, 'mouseout', function () {
  //       infowindow.close();
  //     });
  //     marker.setMap(map);
  //   }
  // };

  /**
   * @description
   * https환경이면 현재 위치를 가져와서 그 위치로 지도 시점 옮겨줌
   */
  // const getCurrentPos = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     getPosSuccess,
  //     () => alert('위치 정보를 가져오는데 실패했습니다.'),
  //     {
  //       enableHighAccuracy: true,
  //       maximumAge: 30000,
  //       timeout: 27000,
  //     }
  //   );
  // };

  // // 3) 정상적으로 현재위치 가져올 경우 실행
  // const getPosSuccess = pos => {
  //   // 현재 위치(위도, 경도) 가져온다.
  //   let currentPos = new window.kakao.maps.LatLng(
  //     pos.coords.latitude, // 위도
  //     pos.coords.longitude // 경도
  //   );
  //   // 지도를 이동 시킨다.
  //   map.panTo(currentPos);

  //   // 기존 마커를 제거하고 새로운 마커를 넣는다.
  //   marker.setMap(null);
  //   marker.setPosition(currentPos);
  //   marker.setMap(map);
  // };

  return (
    <Grid
      h={'calc(100vh - 60px)'}
      mx={'0'}
      pr={'0'}
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(9, 1fr)"
      spacing={10}
      overflow={'hidden'}
      gap={0.4}
    >
      {isFilterOpen && (
        <SearchFilter
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          setIsFilterOpen={setIsFilterOpen}
          query={query}
          setIsLoading={setIsLoading}
          currentLocation={currentLocation}
          setIsRestaurantsNull={setIsRestaurantsNull}
        />
      )}
      <GridItem pt={4} ml={'auto'} rowSpan={1} colSpan={2} minW={'450px'}>
        <Stack spacing={4}>
          <Stack direction={'row'} alignItems={'center'}>
            <Text
              textTransform={'uppercase'}
              color={'green.400'}
              fontWeight={600}
              fontSize={'xl'}
              p={2}
              rounded={'md'}
              display={'inline-block'}
            >
              '{query}' 검색결과
            </Text>
            <Stack
              cursor={'pointer'}
              direction={'row'}
              alignItems={'center'}
              onClick={() => reFetchData()}
            >
              <Icon as={RiEqualizerLine} boxSize={6} />
              <Text
                textTransform={'uppercase'}
                color={'gray.600'}
                fontWeight={400}
                fontSize={'lg'}
                rounded={'md'}
                display={'inline-block'}
              >
                필터
              </Text>
            </Stack>
          </Stack>
          <Stack
            alignItems={'center'}
            h={'calc(100vh - 160px)'}
            overflowY={'scroll'}
            sx={{
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              },
              '&::-webkit-scrollbar-thumb:active': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
            divider={<StackDivider borderColor={'gray.100'} />}
          >
            {restaurants &&
              restaurants.length > 0 &&
              restaurants.map((restaurant, idx) => (
                <RestaurantCard
                  key={idx}
                  restaurant={restaurant}
                  mapCenter={mapCenter}
                  setMapCenter={setMapCenter}
                  setOpenMarker={setOpenMarker}
                  setIsPanto={setIsPanto}
                />
              ))}
            {!(restaurants && restaurants.length > 0) && isRestaurantsNull && (
              <Stack>
                <Heading as="h3" size="lg">
                  검색 결과가 존재하지 않습니다.
                </Heading>
                <Text>단어의 철자가 정확한지 확인해 보세요.</Text>
                <Text>한글을 영어로 입력했는지 확인해 보세요.</Text>
                <Text>일반적인 검색어로 다시 검색해 보세요.</Text>
                <Text>검색 옵션을 변경해서 다시 검색해 보세요.</Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </GridItem>
      <GridItem
        boxShadow={
          'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
        }
        rowSpan={1}
        colSpan={7}
        bg="papayawhip"
      >
        {/* 지도 들어갈 곳*/}
        {/* <div id="map" style={{ width: '100%', height: '100%' }}></div> */}
        {restaurants && restaurants.length > 0 && (
          <KakaoMap
            restaurants={restaurants}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
            openMarker={openMarker}
            setOpenMarker={setOpenMarker}
            isPanto={isPanto}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default SearchResultPage;
