import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
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
            fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
          >
            {pageDetail.title} 베스트 5곳
          </Text>
        </Flex>
        <Stack py={4} spacing={4}>
          {!isLoading ? (
            bestList[category].map((restaurant, index) => (
              <BestRestaurantCard
                key={restaurant.restaurantNo}
                storeId={restaurant.restaurantNo}
                storeImg={restaurant.restaurantPhotoDir}
                storeName={index + 1 + '. ' + restaurant.restaurantName}
                storeAddress={restaurant.restaurantAddress}
                storeStar={restaurant.restaurantStar}
                reviewDetail={restaurant.restaurantDetail}
              />
            ))
          ) : (
            <div>loading</div>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default BestPage;
