import { Button, GridItem, Input, SimpleGrid, Stack, StackDivider, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import VeganLevel from '@/components/restaurant/VeganLevel';
import { useForm } from 'react-hook-form';
import Axios from '@/api/apiConfig';

const SearchFilter = ({ setIsFilterOpen, setRestaurants, query, setIsLoading }) => {
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

  //data: 필터에서 선택한 값
  const filterSet = async data => {
    // console.log(data);

    setIsLoading(true);
    const newRestaurants = await setNewData();

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

    if (filterRestaurants) {
      filterRestaurants = filterRestaurants.sort(function (a, b) {
        if (data.order == '평점순') {
          return b.restaurantStar - a.restaurantStar;
        } // 인기순 정렬!!!!
      });
    } else {
      return null;
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

  const orders = ['평점순', '인기순'];

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
          <VeganLevel setValue={setValue} />
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
