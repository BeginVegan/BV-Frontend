import React from 'react';
import { Box, Container, Flex, Heading, Stack, useBreakpointValue } from '@chakra-ui/react';
import Hero from '@/components/Layout/Hero';
import BestStoreCard from '@/components/main/BestStoreCard';
import { ROUTES } from '@/routes/ROUTES';

const MainPage = () => {
  //   const navigate = useNavigate();
  //   const handleKeyDown = e => {
  //     if (e.key === 'Enter') handleSubmit();
  //   };
  //   const handleSubmit = () => {
  //     if (inputRef === null || inputRef.current.value === '') {
  //       Swal.fire({
  //         icon: 'question',
  //         title: '검색어를 입력해주세요',
  //         text: '지역, 식당 또는 음식',
  //       });
  //       return;
  //     }
  //     const query = inputRef.current.value;
  //     console.log(query);
  //     navigate('/search/' + query);
  //   };
  //   const inputRef = useRef(null);
  return (
    <>
      <Hero />
      <Flex p={4} m={'auto'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
        <Heading alignSelf={'flex-start'} pb={5} size="md" color={'green.600'}>
          믿고보는 맛집 리스트
        </Heading>
        <Flex flexWrap="wrap" gridGap={useBreakpointValue({ base: '8', xl: '16', lg: '8' })}>
          <BestStoreCard
            heading={'예약 베스트 10곳'}
            description={'핫한 곳 방문하기'}
            img={'/images/main_card1.jpg'}
            href={ROUTES.BEST_RAW + 'reservation'}
          />
          <BestStoreCard
            heading={'평점 베스트 10곳'}
            description={'믿고가는 가게'}
            img={'/images/main_card2.jpg'}
            href={ROUTES.BEST_RAW + 'star'}
          />
          <BestStoreCard
            heading={'리뷰 베스트 10곳'}
            description={'리뷰가 곧 힘이다'}
            img={'/images/main_card3.jpg'}
            href={ROUTES.BEST_RAW + 'review'}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default MainPage;
