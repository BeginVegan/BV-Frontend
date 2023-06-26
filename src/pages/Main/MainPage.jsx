import Hero from '@/components/Layout/Hero';
import BestStoreCard from '@/components/main/BestStoreCard';
import { useProgressiveImage } from '@/hooks/useProgressiveImage';
import { ROUTES } from '@/routes/ROUTES';
import { Flex, Heading, Skeleton } from '@chakra-ui/react';

const MainPage = () => {
  const card1loaded = useProgressiveImage('/images/main_card1.jpg');
  const card2loaded = useProgressiveImage('/images/main_card2.jpg');
  const card3loaded = useProgressiveImage('/images/main_card3.jpg');

  return (
    <>
      <Hero />
      <Flex p={4} m={'auto'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
        <Heading alignSelf={'flex-start'} pb={5} fontSize={'2xl'} color={'green.600'}>
          믿고보는 맛집 리스트
        </Heading>

        <Flex flexWrap="wrap" gridGap={{ base: '8', xl: '16', lg: '8' }}>
          <BestStoreCard
            heading={'예약 베스트 10곳'}
            description={'핫한 곳 방문하기'}
            img={card1loaded}
            href={ROUTES.BEST_RAW + 'reservation'}
            onLoad={() => setLoading(true)}
          />
          <BestStoreCard
            heading={'평점 베스트 10곳'}
            description={'믿고가는 가게'}
            img={card2loaded}
            href={ROUTES.BEST_RAW + 'star'}
          />
          <BestStoreCard
            heading={'리뷰 베스트 10곳'}
            description={'리뷰가 곧 힘이다'}
            img={card3loaded}
            href={ROUTES.BEST_RAW + 'review'}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default MainPage;
