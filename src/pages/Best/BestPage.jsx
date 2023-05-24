import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import BestStoreCard from '@/components/store/BestStoreCard';
import { COLORS } from '@/constants/colors';

const categoryDetail = {
  reservation: {
    title: '예약',
  },
  grade: {
    title: '평점',
  },
  review: {
    title: '리뷰',
  },
};

const BestPage = () => {
  const { category } = useParams();
  const pageDetail = categoryDetail[category];
  const stores = [
    {
      storeId: '1',
      storeName: '농민백암왕순대',
      storeAddress: '강남역 어딘가 어디 112-12',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
      reviewDetail: {},
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
  ];

  return (
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
        {stores.map((store, index) => (
          <BestStoreCard
            storeId={store.storeId}
            storeName={index + 1 + '. ' + store.storeName}
            storeAddress={store.storeAddress}
            storeStar={store.storeStar}
            reviewDetail={store.reviewDetail}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default BestPage;
