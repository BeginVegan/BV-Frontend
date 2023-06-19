import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import BestRestaurantCard from '@/components/restaurant/BestRestaurantCard';
import { useQuery } from 'react-query';
import RestaurantService from '@/api/RestaurantService';
import LoadingPage from '../Loading/LoadingPage';

const categoryDetail = {
  reservation: {
    title: '예약',
  },
  star: {
    title: '평점',
  },
  review: {
    title: '리뷰',
  },
};

const BestPage = () => {
  const { category } = useParams();
  const pageDetail = categoryDetail[category];
  const { data: bestList, isLoading } = useQuery(
    'getBestRestaurantList',
    RestaurantService.getBestRestaurantList
  );

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <>
      <Stack justify={'center'} align={'center'}>
        <Flex
          w={'full'}
          h={'15vh'}
          bgColor={COLORS.GREEN200}
          backgroundSize={'cover'}
          justify={'center'}
          align={'center'}
          backgroundPosition={'center center'}
          shadow={' rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}
        >
          <Text
            color={'white'}
            fontWeight={400}
            lineHeight={1.2}
            fontSize={{ base: '2xl', md: '3xl' }}
          >
            {pageDetail.title} 베스트 10곳
          </Text>
        </Flex>
        <Stack py={4} spacing={4}>
          {!isLoading &&
            bestList[category].map((restaurant, index) => (
              <BestRestaurantCard
                key={restaurant.restaurantNo}
                restaurantId={restaurant.restaurantNo}
                restaurantImg={restaurant.restaurantPhotoDir}
                restaurantName={index + 1 + '. ' + restaurant.restaurantName}
                restaurantAddress={restaurant.restaurantAddress}
                restaurantStar={restaurant.restaurantStar}
                restaurantDetail={restaurant.restaurantDetail}
              />
            ))}
        </Stack>
      </Stack>
    </>
  );
};

export default BestPage;
