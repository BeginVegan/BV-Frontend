import { Heading, Box, HStack, VStack, StackDivider, Text, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '@/api/apiConfig';
import VeganLevel from '@/components/restaurant/VeganLevel';
import Loading from '@/components/common/Loading';
import RestaurantImg from '@/pages/Restaurant/RestaurantImg';
import RestaurantMenu from '@/pages/Restaurant/RestaurantMenu';
import BookmarkCheck from '@/pages/Restaurant/BookmarkCheck';
import RestaurntReview from '@/pages/Restaurant/RestaurntReview';
import FormatTime12Hour from '@/pages/Restaurant/FormatTime12Hour';
import BookButton from '@/pages/Restaurant//BookButton';
import { useQuery } from 'react-query';
import { RiCloseLine } from 'react-icons/ri';

const RestaurantDetail = ({ restaurantNo, setIsDetailOpen, setSelectedRestaurantNo }) => {
  const getRestaurant = async () => {
    try {
      const res = await Axios.get(`restaurant/${restaurantNo}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error.response.data);
      }
    }
  };

  const { data: restaurantInfo, isLoading, refetch } = useQuery('getRestaurantInfo', getRestaurant);
  const navigator = useNavigate();

  useEffect(() => {
    refetch();
  }, [restaurantNo]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        cursor={'pointer'}
        borderRightRadius={'lg'}
        py={1}
        px={1}
        position={'absolute'}
        top={'calc(2vh)'}
        left={'781px'}
        bg={'white'}
        _hover={{
          borderColor: 'red.600',
        }}
        onClick={() => {
          setSelectedRestaurantNo(null);
          setIsDetailOpen(false);
        }}
        borderRight={'2px solid'}
        borderTop={'2px solid'}
        borderBottom={'2px solid'}
        borderRightColor={'gray.400'}
        borderTopColor={'gray.400'}
        borderBottomColor={'gray.400'}
        zIndex={1000}
      >
        <RiCloseLine size={30} />
      </Box>
      <Flex
        flexDirection={'column'}
        overflow={'hidden'}
        left={381}
        h={'calc(100vh - 75px)'}
        bgColor={'white'}
        position={'absolute'}
        zIndex={1000}
        width={400}
        overflowY={'scroll'}
        alignItems={'center'}
        borderLeft={'1px solid'}
        borderColor={'gray.200'}
      >
        <Box backgroundPosition={'center center'}>
          <RestaurantImg
            ImgWidth={400}
            ImgHight={300}
            imageDir={restaurantInfo.restaurant.restaurantPhotoDir}
          />
        </Box>
        <VStack w={'92%'} align={'flex-start'} divider={<StackDivider borderColor={'gray.200'} />}>
          <HStack pt={4} pb={1} w={'full'}>
            <Box w={'full'} display={'flex'}>
              <BookmarkCheck restaurantNo={restaurantNo} />
              <Heading
                ml={1}
                display={'inline-block'}
                cursor={'pointer'}
                fontWeight={400}
                fontSize={'2xl'}
                onClick={() => navigator(`/restaurant/${restaurantNo}`)}
              >
                {restaurantInfo.restaurant.restaurantName}
              </Heading>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <BookButton isSmall={true} restaurantNo={restaurantNo} />
            </Box>
          </HStack>
          <VStack w={'full'} alignItems={'left'} gap={2} py={4}>
            <HStack gap={2}>
              <Text fontWeight={400} color={'green.400'} fontSize="md">
                주소
              </Text>
              <Text fontSize={restaurantInfo.restaurant.restaurantAddress.length > 18 && 'sm'}>
                {restaurantInfo.restaurant.restaurantAddress.split('&')[0]}
              </Text>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight={400} color={'green.400'} fontSize="md">
                전화번호
              </Text>
              <Text fontSize="sm">{restaurantInfo.restaurant.restaurantPhone}</Text>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight={400} color={'green.400'} fontSize="sm">
                1인 평균 가격
              </Text>
              <Text fontSize="sm">
                {restaurantInfo.restaurant.restaurantAvgPrice.toLocaleString()}원
              </Text>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight={400} color={'green.400'} fontSize="md">
                운영시간
              </Text>
              <Text fontSize="sm">
                <FormatTime12Hour timeString={restaurantInfo.restaurant.restaurantOpen} /> ~{' '}
                <FormatTime12Hour timeString={restaurantInfo.restaurant.restaurantClose} />
              </Text>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight={400} color={'green.400'} fontSize="md">
                식당상세
              </Text>
              <Text fontSize={'sm'} w={260}>
                {restaurantInfo.restaurant.restaurantDetail.split('.')[0] + '.'}
              </Text>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight={400} color={'green.400'} fontSize="md">
                비건레벨
              </Text>
              <VeganLevel isSmall={true} level={restaurantInfo.restaurant.restaurantVeganLevel} />
            </HStack>
          </VStack>
          <VStack w={'100%'} gap={2} py={4}>
            <Text fontWeight={400} alignSelf={'flex-start'} color={'green.400'} fontSize="md">
              메뉴
            </Text>
            <RestaurantMenu menuList={restaurantInfo.restaurant.menuList} />
          </VStack>
          <Box w={'100%'}>
            <Text pt={4} pb={2} fontWeight={400} color={'green.400'} fontSize="md">
              리뷰 {restaurantInfo.review.length}개
            </Text>
            <VStack
              gap={4}
              py={4}
              alignItems={'flex-start'}
              divider={<StackDivider borderColor={'green.200'} />}
            >
              <RestaurntReview reviewList={restaurantInfo.review} />
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
export default RestaurantDetail;
