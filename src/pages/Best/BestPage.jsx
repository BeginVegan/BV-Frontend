import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Flex, Text, useBreakpointValue, Skeleton } from '@chakra-ui/react';
import BestRestaurantCard from '@/components/restaurant/BestRestaurantCard';
import { useQuery } from 'react-query';
import RestaurantService from '@/api/RestaurantService';

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

  return (
    <>
      <Stack pb={10}>
        <Flex py={6} justify={'center'} align={'center'}>
          <Text
            color={'balck'}
            fontWeight={400}
            lineHeight={1.2}
            fontSize={{ base: '2xl', md: '3xl' }}
          >
            {pageDetail.title} 베스트 10곳
          </Text>
        </Flex>
        <Stack spacing={4}>
          {isLoading && (
            <>
              <Skeleton w={'774px'} height={'238px'} borderRadius="lg"></Skeleton>
              <Skeleton w={'774px'} height={'238px'} borderRadius="lg"></Skeleton>
              <Skeleton w={'774px'} height={'238px'} borderRadius="lg"></Skeleton>
              <Skeleton w={'774px'} height={'238px'} borderRadius="lg"></Skeleton>
            </>
          )}
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
