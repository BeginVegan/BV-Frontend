import {
  Button,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import VeganLevel from '@/components/restaurant/VeganLevel';
import { useForm } from 'react-hook-form';
import Axios from '@/api/apiConfig';
import { RiCloseLine } from 'react-icons/ri';

const SearchFilter = ({
  setIsFilterOpen,
  setRestaurants,
  query,
  setIsLoading,
  currentLocation,
  setIsRestaurantsNull,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const [veganLevel, setVeganLevel] = useState(1);
  const [selectedGu, setSelectedGu] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleGuClick = value => {
    if (selectedGu === value) {
      setValue('gu', null);
      setSelectedGu(null);
    } else {
      setValue('gu', value);
      setSelectedGu(value);
    }
  };

  const handleOrderClick = value => {
    if (selectedOrder === value) {
      setValue('order', null);
      setSelectedOrder(null);
    } else {
      setValue('order', value);
      setSelectedOrder(value);
    }
  };

  const setNewData = async () => {
    const res = await Axios.get(`/restaurant/search?keyword=${query}`);
    return res.data;
  };

  // 현재위치와 식당위치 사이의 거리를 구한다.
  const distance = (currentLocation, restaurant) => {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = deg2rad(currentLocation.latitude - restaurant.restaurantX); // 경도(x)
    const dLon = deg2rad(currentLocation.longitude - restaurant.restaurantY); // 위도(y)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(currentLocation.latitude)) *
        Math.cos(deg2rad(restaurant.restaurantX)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 간의 거리 (단위: km)
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  //data: 필터에서 선택한 값
  const filterSet = async data => {
    setIsLoading(true);
    const newRestaurants = await setNewData();

    //조건에 맞는 데이터를 걸러 줌
    let filterRestaurants = newRestaurants.filter(rest => {
      if (data.gu != '') {
        return (
          rest.restaurantAddressGu == data.gu &&
          rest.restaurantVeganLevel <= data.restaurantVeganLevel
        );
      } else {
        return rest.restaurantVeganLevel <= data.restaurantVeganLevel;
      }
    });

    //정렬함
    if (filterRestaurants != null && filterRestaurants.length > 0) {
      filterRestaurants = filterRestaurants.sort(function (a, b) {
        if (data.order == '평점순') {
          return b.restaurantStar - a.restaurantStar;
        } else if (data.order == '거리순') {
          return distance(currentLocation, a) - distance(currentLocation, b);
        }
      });
    } else {
      setIsRestaurantsNull(true);
    }
    setRestaurants(filterRestaurants);
    setIsFilterOpen(false);
    setIsLoading(false);
  };

  const gus = [
    '강남구',
    '강동구',
    '강북구',
    '구로구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '성북구',
    '용산구',
    '종로구',
    '중구',
  ];

  const orders = ['평점순', '거리순'];

  return (
    <GridItem
      h={'calc(100vh - 60px)'}
      w={'430px'}
      bgColor={'white'}
      position={'absolute'}
      zIndex={'0'}
    >
      <Stack spacing={4} p={4} divider={<StackDivider borderColor={'gray.400'} />}>
        <Stack direction={'column'}>
          <HStack justifyContent={'space-between'}>
            <Text
              textTransform={'uppercase'}
              color={'green.400'}
              fontWeight={600}
              fontSize={'lg'}
              p={2}
              rounded={'md'}
              display={'inline-block'}
            >
              검색 필터
            </Text>
            <RiCloseLine size={24} onClick={() => setIsFilterOpen(false)} cursor={'pointer'} />
          </HStack>
          <SimpleGrid columns={2} spacing={5}>
            <input {...register('order')} type="hidden" />

            {orders.map(order => (
              <Button
                key={order}
                type="button"
                rounded={'full'}
                backgroundColor={selectedOrder === order ? 'green.300' : 'gray.100'}
                _hover={{ backgroundColor: selectedOrder === order ? 'green.400' : 'gray.200' }}
                onClick={() => handleOrderClick(order)}
              >
                {order}
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
        <Stack direction={'column'}>
          <Text
            textTransform={'uppercase'}
            color={'green.400'}
            fontWeight={600}
            fontSize={'lg'}
            p={2}
            rounded={'md'}
            display={'inline-block'}
          >
            지역
          </Text>
          <SimpleGrid columns={2} spacing={5}>
            <input {...register('gu')} type="hidden" />
            {gus.map(gu => (
              <Button
                key={gu}
                type="button"
                rounded={'full'}
                backgroundColor={selectedGu === gu ? 'green.300' : 'gray.100'}
                _hover={{ backgroundColor: selectedGu === gu ? 'green.400' : 'gray.200' }}
                onClick={() => handleGuClick(gu)}
              >
                {gu}
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
        <Stack direction={'column'}>
          <Text
            textTransform={'uppercase'}
            color={'green.400'}
            fontWeight={600}
            fontSize={'lg'}
            p={2}
            rounded={'md'}
            display={'inline-block'}
          >
            비건레벨
          </Text>
          <Input
            {...register('restaurantVeganLevel')}
            type="number"
            display={'none'}
            value={7}
          ></Input>
          <VeganLevel setValue={setValue} isClickable={true} />
        </Stack>
        <SimpleGrid columns={2} spacing={5}>
          <Button
            rounded={'full'}
            bgColor={'red.200'}
            _hover={{ bgColor: 'red.400' }}
            onClick={() => setIsFilterOpen(false)}
          >
            취소
          </Button>
          <Button
            rounded={'full'}
            bgColor={'green.200'}
            _hover={{ bgColor: 'green.400' }}
            onClick={handleSubmit(filterSet)} //filterSet: 필터에서 선택한 값
          >
            적용
          </Button>
        </SimpleGrid>
      </Stack>
    </GridItem>
  );
};

export default SearchFilter;
