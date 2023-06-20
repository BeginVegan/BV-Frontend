import Axios from '@/api/apiConfig';
import SearchFilter from '@/components/search/SearchFilter';
import { Grid, GridItem, Heading, Icon, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiEqualizerLine } from 'react-icons/ri';
import KakaoMap from './KakaoMap';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { useParams } from 'react-router-dom';
import LoadingPage from '../Loading/LoadingPage';

const SearchResultPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [isRestaurantsNull, setIsRestaurantsNull] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.571848, lng: 127.00116 });
  const [isPanto, setIsPanto] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.571848, lng: 127.00116 });
  const [openMarker, setOpenMarker] = useState(null);
  const [selectedGu, setSelectedGu] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const { query } = useParams();

  const searchData = async () => {
    try {
      const res = await Axios.get(`/restaurant/search?keyword=${query}`);
      setRestaurants(res.data);
    } catch (error) {
      console.error(error);
      setIsRestaurantsNull(true);
      setRestaurants(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchData();
  }, [query]);

  const reFetchData = () => {
    setIsFilterOpen(true);
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

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
          selectedGu={selectedGu}
          setSelectedGu={setSelectedGu}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      )}
      <GridItem pt={4} ml={'auto'} rowSpan={1} colSpan={2} minW={'450px'}>
        <Stack spacing={4}>
          <Stack px={4} direction={'row'} minW={'450px'} justifyContent={'space-between'}>
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
              pr={4}
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
            gap={2}
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
