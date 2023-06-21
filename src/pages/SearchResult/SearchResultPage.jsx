import Axios from '@/api/apiConfig';
import SearchFilter from '@/components/search/SearchFilter';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KakaoMap from './KakaoMap';
import { useParams } from 'react-router-dom';
import SearchSidebar from './SearchSidebar';

const SearchResultPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
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

  return (
    <Flex w={'100vw'} h={'calc(100vh - 73px)'}>
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

      {!isLoading && (
        <SearchSidebar
          query={query}
          restaurants={restaurants}
          isRestaurantsNull={isRestaurantsNull}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          setOpenMarker={setOpenMarker}
          setIsPanto={setIsPanto}
          reFetchData={reFetchData}
          setOpenList={setOpenList}
          openList={openList}
          setIsFilterOpen={setIsFilterOpen}
        />
      )}

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
    </Flex>
  );
};

export default SearchResultPage;
