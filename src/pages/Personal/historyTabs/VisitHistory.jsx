import Axios from '@/api/apiConfig';
import { COLORS } from '@/constants/colors';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRestaurantDetail } from './hooks/useRestaurantDetail';

const VisitHistory = () => {
  const [reservationList, setReservationList] = useState(null);
  const [sortBy, setSortBy] = useState('2');
  const [reviewList, setReviewList] = useState(null);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const res = await Axios.get('reservation/list/memberEmail');
        if (res.status === 200) {
          setReservationList(res.data);
        } else {
          setReservationList([]);
        }
      } catch (error) {
        setReservationList([]);
      }
    };

    const getReview = async () => {
      try {
        const res = await Axios.get('mypage/review/userEmail');
        if (res.status === 200) {
          setReviewList(res.data);
        } else {
          setReviewList([]);
        }
      } catch (error) {
        setReviewList([]);
      }
    };

    getReservations();
    getReview();
  }, []);

  const sortedReservationList = useMemo(() => {
    if (reservationList) {
      if (sortBy === '1') {
        // 최신순

        return [...reservationList].sort(
          (a, b) => new Date(b.reservationVisitTime) - new Date(a.reservationVisitTime)
        );
      } else {
        // 별점순

        return [...reservationList].sort((a, b) => b.restaurantStar - a.restaurantStar);
      }
    }
    return [];
  }, [reservationList, sortBy]);
  const templateColumns = useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' });

  return (
    <div>
      <VStack align={'flex-start'}>
        <RadioGroup defaultValue="2" onChange={setSortBy}>
          <Stack spacing={5} direction="row">
            <Radio colorScheme="green" value="1">
              최신순
            </Radio>
            <Radio colorScheme="green" value="2">
              별점순
            </Radio>
          </Stack>
        </RadioGroup>
      </VStack>
      {sortedReservationList && sortedReservationList.length > 0 ? (
        <Flex height={'80vh'} overflowY={'auto'}>
          <VStack w="100%" marginTop={'2rem'} align={'start'}>
            <Grid
              w={'100%'}
              templateColumns={templateColumns}
              gap={4}
              height={'80vh'}
              overflowY={'auto'}
              padding={4}
            >
              {sortedReservationList.map((restaurant, idx) => {
                return (
                  <RestaurantCards
                    reservationNo={restaurant.reservationNo}
                    reviewList={reviewList}
                    reservationVisitTime={restaurant.reservationVisitTime}
                    key={idx}
                    id={idx}
                    restaurant={restaurant}
                  />
                );
              })}
            </Grid>
          </VStack>
        </Flex>
      ) : (
        <VStack width="100%" height="100%" justifyContent="center" alignItems="center" mt={'3rem'}>
          <Text fontSize={'2xl'}>방문한 가게가 없습니다 😂</Text>
        </VStack>
      )}
    </div>
  );
};

export default VisitHistory;

const RestaurantCards = ({ reservationNo, reviewList, restaurant, id, reservationVisitTime }) => {
  const { data } = useRestaurantDetail(restaurant.restaurantNo);
  const { restaurantName, restaurantDetail, restaurantPhotoDir, restaurantStar, restaurantNo } =
    data || {};
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isReviewable, setIsReviewable] = useState(false);
  const navigate = useNavigate();
  const [s3ImageList, setS3ImageList] = useState(null);

  useEffect(() => {
    if (reviewList && data) {
      const now = new Date();
      const hasReview = reviewList.find(review => {
        return review.restaurantNo === restaurantNo && review.reservationNo === reservationNo;
      });

      if (!hasReview && reservationVisitTime < now) {
        setIsReviewable(true);
      }
    }
  }, [data]);

  const getS3ImageList = async () => {
    try {
      const res = await Axios.get(`restaurant/img/${restaurantPhotoDir}`);
      if (res.status === 200) {
        setS3ImageList(res.data);
      }
    } catch (error) {
      setS3ImageList(null);
    }
  };
  useEffect(() => {
    if (restaurantPhotoDir) {
      getS3ImageList();
    }
  }, [restaurantPhotoDir]);

  return (
    <div key={restaurant.id}>
      {data && (
        <HStack
          w={'100%'}
          spacing={'2rem'}
          align={'flex-start'}
          marginBottom={'2rem'}
          paddingRight={'2rem'}
        >
          <Text fontWeight={'extrabold'} fontSize={'4xl'}>
            {id + 1}
          </Text>
          <Card
            _hover={{ borderWidth: '3px', borderColor: COLORS.GREEN200 }}
            variant="outline"
            shadow={'sm'}
            direction={{ base: 'column', md: 'row' }}
            w="100%"
          >
            <CardBody w="100%">
              <Box ml="2rem" mt={'1rem'} p="1rem" w="15rem" h="15rem">
                <Image
                  w={'100%'}
                  h={'100%'}
                  pointerEvents="none"
                  src={s3ImageList && s3ImageList[0] ? s3ImageList[0] : null}
                  alt={'레스토랑 이미지'}
                  borderRadius="lg"
                />
              </Box>
            </CardBody>
            <Divider orientation="vertical" />
            <VStack w={'350px'}>
              <Stack ml={'3rem'} w={'350px'} pr={'4rem'} mt="6" spacing="3">
                <Heading size="md">{restaurantName}</Heading>
                {/* 상세정보 */}
                <Text>{restaurantDetail}</Text>
                <HStack>
                  <AiFillStar color="gold" size={'40px'} />
                  <Text color="blue.600" fontSize="2xl">
                    {restaurantStar}
                  </Text>
                </HStack>
              </Stack>
              <Spacer />
              <CardFooter w={'100%'}>
                <ButtonGroup spacing="4">
                  {/* 여기에 상세페이지로 링크 */}
                  <Button
                    variant="solid"
                    colorScheme="green"
                    onClick={() => navigate(`/restaurant/${restaurant.restaurantNo}`)}
                  >
                    상세 페이지
                  </Button>
                  {isReviewable && (
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      onClick={() =>
                        navigate(`/mypage/review`, {
                          state: {
                            reservationNo: reservationNo,
                            restaurantNo: restaurantNo,
                          },
                        })
                      }
                    >
                      리뷰 작성
                    </Button>
                  )}
                </ButtonGroup>
              </CardFooter>
            </VStack>
          </Card>
        </HStack>
      )}
    </div>
  );
};
