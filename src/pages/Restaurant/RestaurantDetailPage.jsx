import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Axios from '@/api/apiConfig';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiHeart3Line } from 'react-icons/ri';
import { ROUTES } from '@/routes/ROUTES';
import { useLocation, useNavigate } from 'react-router-dom';
import VeganLevel from '@/components/restaurant/VeganLevel';

const RestaurantDetailPage = () => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const navigator = useNavigate();
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
          //알람으로 에러 메시지 핸들링르 변경 예정
          console.log(error.response.data);
        }
      }
    };

    getRestaurant();
  }, []);

  const StarRating = ({ roundedStarRating }) => {
    const starRating = Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} color={index < roundedStarRating ? 'yellow.400' : 'gray.300'} />
    ));

    return (
      <Text fontWeight={200} fontSize="m">
        {starRating}
      </Text>
    );
  };

  const FormatTime12Hour = timeString => {
    const [hours, minutes, seconds] = timeString.split(':');
    let period = 'AM';
    let formattedHours = parseInt(hours);

    if (formattedHours >= 12) {
      period = 'PM';
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    }

    return `${period} ${formattedHours}:${minutes}`;
  };

  const FormattedDateTime = ({ timestamp }) => {
    const date = new Date(timestamp);
    const formattedDateTime = date.toLocaleString();

    return (
      <Text fontWeight={200} color={'gray.400'} fontSize="sm">
        {formattedDateTime}
      </Text>
    );
  };

  const RestaurantMenu = ({ menuList }) => (
    <React.Fragment>
      {menuList.map(menu => (
        <HStack key={menu.menuNo} w={'600px'} justifyContent={'space-around'}>
          <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
            <Text fontWeight={400} fontSize="md">
              {menu.menuName}
              <Text ml={2} display={'inline'} fontWeight={400} color={'gray.600'} fontSize="md">
                {menu.menuPrice.toLocaleString()} 원
              </Text>
            </Text>
            <Text fontWeight={200} color={'gray.600'} fontSize="sm">
              {menu.menuDetail}
            </Text>
          </VStack>
          <Image objectFit="cover" h={'90px'} w={'120px'} src={menu.menuPhotoDir} />
        </HStack>
      ))}
    </React.Fragment>
  );

  const bookmarkRestaurant = restaurantNo => {
    // Axios request
    axios
      .get('https://example.com/api')
      .then(response => {
        // Handle response data
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  const ReservationMenu = ({ reservationNo }) => {
    const [reservationMenuInfo, setReservationMenuInfo] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const res = await Axios.get(`reservation/${reservationNo}`);
        if (res.status === 200) {
          const data = res.data.reservationMenuList;
          setReservationMenuInfo(data);
        }
      };

      fetchData();
    }, [reservationNo]);
    if (reservationMenuInfo === null) return <Spinner />;
    else if (reservationMenuInfo.length > 1) {
      return reservationMenuInfo[0].menuName + ' 외  ' + (reservationMenuInfo.length - 1) + '개';
    } else return reservationMenuInfo[0].menuName;
  };

  const RestaurntReivew = ({ reviewList }) => (
    // 수정 필요 : 리뷰 ?
    <React.Fragment>
      {reviewList.map(review => (
        <HStack w={'600px'} gap={4} alignItems={'flex-start'} justifyContent={'space-around'}>
          <VStack w={'150px'} gap={0} alignItems={'flex-start'} justifyContent={'space-around'}>
            <Text fontWeight={400} fontSize="lg" color={'gray.400'}>
              {review.memberEmail}
            </Text>
            {/* 수정 필요 : 백엔드에서 이미지 얻어오는 방식 확정 후 이미지 띄어주는 방식 변경 예정입니다. */}
            <Box>
              <Image objectFit="cover" h={'120px'} w={'120px'} src={review.reviewPhotoDir} />
            </Box>
          </VStack>
          <VStack w={'450px'} alignItems={'flex-start'}>
            <HStack justifyContent="space-between" w="100%">
              <Box>
                <StarRating roundedStarRating={Math.round(review.reviewStar)} starSize={24} />
              </Box>
              <Box textAlign="right">
                <Text fontWeight={400} fontSize="md" color={'gray.400'}>
                  <ReservationMenu reservationNo={review.reservationNo} />
                </Text>
              </Box>
            </HStack>
            <HStack justifyContent="space-between" w="100%">
              <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                <FormattedDateTime timestamp={review.reviewTime} />
              </Text>
            </HStack>
            <Box>
              <Text fontWeight={400} color={'black'} fontSize="sm">
                {review.reviewContent}
              </Text>
            </Box>
          </VStack>
        </HStack>
      ))}
    </React.Fragment>
  );

  if (!restaurantInfo) {
    // restaurantInfo가 존재하지 않으면 Spinner을 반환하여 조건부 렌더링 처리
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Adjust this if needed
        }}
      >
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </div>
    );
  }

  return (
    <Stack maxW={'100vw'} justifyContent={'center'} alignItems={'center'} pb={4}>
      <Box>
        <Flex
          py={6}
          backgroundSize={'cover'}
          justify={'center'}
          align={'center'}
          backgroundPosition={'center center'}
          gap={4}
        >
          {/* 수정 필요 : 백엔드에서 이미지 얻어오는 방식 확정 후 이미지 띄어주는 방식 변경 예정입니다. */}
          <Image
            objectFit="cover"
            h={'240px'}
            w={'320px'}
            src={'https://bv-image.s3.ap-northeast-2.amazonaws.com/restaurant/restaurant.jpg'}
          />
          <Image
            objectFit="cover"
            h={'240px'}
            w={'320px'}
            src={'https://bv-image.s3.ap-northeast-2.amazonaws.com/restaurant/restaurant.jpg'}
          />
        </Flex>
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
              <StarIcon boxSize={5} color={'yellow.500'} />
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
              <Button
                color={'white'}
                bgColor={'red.200'}
                _hover={{ bgColor: 'red.400' }}
                onClick={() => navigator(ROUTES.RESTAURANT_RESERVATION)}
              >
                주문하기
              </Button>
              {/* {수정 필요 : 즐겨찾기 여부 확인하는 백엔드 API 필요하여 수정 예정입니다. + 유저 이메일 정보 확인 하는법 체크} */}
              <RiHeart3Line size={30} fill="red" onClick={bookmarkRestaurant} />
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
              <Text>010-0000-0000</Text>
            </HStack>
            <HStack gap={4}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                가격대
              </Text>
              <Text>{restaurantInfo.restaurant.restaurantAvgPrice.toLocaleString()}원</Text>
            </HStack>
            <HStack gap={4}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                운영 시간
              </Text>
              <Text>
                {FormatTime12Hour(restaurantInfo.restaurant.restaurantOpen)} ~{' '}
                {FormatTime12Hour(restaurantInfo.restaurant.restaurantClose)}
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
              {/* 수정 필요 : VeganLevel 컴포넌트 사용법 확인 후 수정 예정입니다. */}
              <VeganLevel level={restaurantInfo.restaurant.restaurantVeganLevel} />
            </HStack>
          </VStack>
          <VStack gap={2} py={4} alignItems={'flex-start'}>
            <Text fontWeight={600} color={'gray.400'} fontSize="md">
              메뉴
            </Text>
            <RestaurantMenu menuList={restaurantInfo.restaurant.menuList} />
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
              <RestaurntReivew reviewList={restaurantInfo.review} />
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Stack>
  );
};

export default RestaurantDetailPage;
