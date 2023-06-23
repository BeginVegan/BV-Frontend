import {
  Heading,
  Box,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Text,
  Card,
  CardBody,
  Flex,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from '@/api/apiConfig';
import VeganLevel from '@/components/restaurant/VeganLevel';
import Loading from '@/components/common/Loading';
import RestaurantImg from '@/pages/Restaurant/RestaurantImg';
import RestaurantMenu from '@/pages/Restaurant/RestaurantMenu';
import BookmarkCheck from '@/pages/Restaurant/BookmarkCheck';
import RestaurntReview from '@/pages/Restaurant/RestaurntReview';
import FormatTime12Hour from '@/pages/Restaurant/FormatTime12Hour';
import BookButton from '@/pages/Restaurant//BookButton';

const RestaurantDetailPage = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const _hereIAm = useLocation();
  const restaurantNo = _hereIAm.pathname.split('/')[2];

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const res = await Axios.get(`restaurant/${restaurantNo}`);
        if (res.status === 200) {
          setRestaurantInfo(res.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log(error.response.data);
        }
      }
    };
    getRestaurant();
  }, [restaurantNo]);

  if (!restaurantInfo) {
    return <Loading />;
  }

  return (
    <Stack mt={8} mb={10} maxW={'100vw'} justifyContent={'center'} alignItems={'center'} pb={4}>
      <Card>
        <CardBody>
          <Box>
            <RestaurantImg imageDir={restaurantInfo.restaurant.restaurantPhotoDir} />
            <VStack align={'flex-start'} divider={<StackDivider borderColor={'gray.200'} />}>
              <HStack py={4} w={'full'} justifyContent={'space-between'}>
                <Box display={'flex'} alignItems={'center'}>
                  <Heading
                    display={'inline-block'}
                    cursor={'pointer'}
                    pr={4}
                    fontWeight={400}
                    fontSize={'2xl'}
                  >
                    {restaurantInfo.restaurant.restaurantName}
                  </Heading>
                  <StarIcon boxSize={5} color={'yellow.400'} />
                  <Text
                    display={'inline-block'}
                    fontWeight={400}
                    color={'gray.500'}
                    fontSize="xl"
                    ml={2}
                  >
                    {restaurantInfo.restaurant.restaurantStar}
                  </Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={4}>
                  <BookButton restaurantNo={restaurantNo} />
                  <BookmarkCheck restaurantNo={restaurantNo} />
                </Box>
              </HStack>
              <VStack alignItems={'left'} gap={2} py={4}>
                <HStack gap={4}>
                  <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                    주소
                  </Text>
                  <Text>{restaurantInfo.restaurant.restaurantAddress}</Text>
                </HStack>
                <HStack gap={4}>
                  <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                    전화번호
                  </Text>
                  <Text>{restaurantInfo.restaurant.restaurantPhone}</Text>
                </HStack>
                <HStack gap={4}>
                  <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                    1인 평균 가격
                  </Text>
                  <Text>{restaurantInfo.restaurant.restaurantAvgPrice.toLocaleString()}원</Text>
                </HStack>
                <HStack gap={4}>
                  <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                    운영 시간
                  </Text>
                  <Text>
                    <FormatTime12Hour timeString={restaurantInfo.restaurant.restaurantOpen} /> ~{' '}
                    <FormatTime12Hour timeString={restaurantInfo.restaurant.restaurantClose} />
                  </Text>
                </HStack>
                <HStack gap={4}>
                  <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                    식당 상세
                  </Text>
                  <Text>{restaurantInfo.restaurant.restaurantDetail}</Text>
                </HStack>
                <HStack gap={4}>
                  <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                    비건 레벨
                  </Text>
                  <VeganLevel level={restaurantInfo.restaurant.restaurantVeganLevel} />
                </HStack>
              </VStack>
              <VStack w={'full'} gap={2} py={4} alignItems={'center'}>
                <Text alignSelf={'flex-start'} fontWeight={600} color={'gray.400'} fontSize="md">
                  메뉴
                </Text>
                <Flex direction={'column'} gap={4} w={'80%'}>
                  <RestaurantMenu menuList={restaurantInfo.restaurant.menuList} />
                </Flex>
              </VStack>
              <Box>
                <Text pt={4} pb={2} fontWeight={600} color={'gray.400'} fontSize="md">
                  리뷰 {restaurantInfo.review.length}개
                </Text>
                <VStack
                  gap={4}
                  py={4}
                  alignItems={'flex-start'}
                  divider={<StackDivider borderColor={'gray.200'} />}
                >
                  <RestaurntReview reviewList={restaurantInfo.review} />
                </VStack>
              </Box>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Stack>
  );
};
export default RestaurantDetailPage;
