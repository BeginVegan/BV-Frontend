import Axios from '@/api/apiConfig';
import { StarRank } from '@/components/star/StarRank';
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
  HStack,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurantDetail } from './hooks/useRestaurantDetail';

const ReviewHistory = () => {
  const [reviewList, setReviewList] = useState(null);

  useEffect(() => {
    const getReview = async () => {
      const res = await Axios.get('mypage/review/userEmail');

      if (res.status === 200) {
        setReviewList(res.data);
      }
    };
    getReview();
  }, []);
  return (
    <VStack align={'flex-start'}>
      <Flex height={'80vh'} overflowY={'auto'}>
        <VStack marginTop={'2rem'} align={'start'}>
          {reviewList &&
            reviewList.map((review, idx) => {
              return (
                <RestaurantReviewCard
                  key={idx}
                  idx={idx}
                  restaurantNo={review.restaurantNo}
                  img={review.reviewPhotoDir}
                />
              );
            })}
        </VStack>
      </Flex>
    </VStack>
  );
};
export default ReviewHistory;

const RestaurantReviewCard = ({ restaurantNo,idx, img }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const { data } = useRestaurantDetail(restaurantNo);

  const getHowMany = list => {
    if (list.length > 1) {
      return list[0].menuName + ' 외 ' + (list.length - 1) + '개';
    }
    return list[0].menuName;
  };

  const getHowMuch = list => {
    return list.reduce((acc, menu) => acc + menu.menuPrice, 0);
  };

  if (!data) return <></>;
  return (
    <div >
      <HStack
        w={'100%'}
        spacing={'2rem'}
        align={'flex-start'}
        marginBottom={'2rem'}
        paddingRight={'2rem'}
      >
        <Text fontWeight={'extrabold'} fontSize={'4xl'}>
          {idx + 1}
        </Text>
        <Card
          _hover={{ borderWidth: '3px', borderColor: COLORS.GREEN200 }}
          variant="outline"
          shadow={'sm'}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack>
            <Stack w={'100%'} mt="6" spacing="3">
              <Stack ml="1rem" direction={'column'} spacing={'1rem'}>
                <Heading size="md">{data.restaurantName}</Heading>
                <StarRank number={data.restaurantStar} />
                <br />
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <Box
                    backgroundColor={'green.100'}
                    borderRadius={'10px'}
                    paddingLeft={'0.5rem'}
                    paddingRight={'0.5rem'}
                    w={'3em'}
                  >
                    <Text color={'green'} fontWeight={'bold'}>
                      메뉴
                    </Text>
                  </Box>
                  <Text>{getHowMany(data.menuList)}</Text>
                  <Box
                    backgroundColor={'green.100'}
                    borderRadius={'10px'}
                    paddingLeft={'0.5rem'}
                    paddingRight={'0.5rem'}
                    w={'3em'}
                  >
                    <Text color={'green'} fontWeight={'bold'}>
                      가격
                    </Text>
                  </Box>
                  <Text>{getHowMuch(data.menuList)}</Text>
                </Stack>
                <br />
                <Text>{data.restaurantDetail}</Text>
              </Stack>

              {isMobile && (
                <CardBody w={'100%'}>
                  <Image
                    pointerEvents="none"
                    src={data.reviewPhotoDir}
                    alt={img}
                    borderRadius="lg"
                  />
                </CardBody>
              )}
            </Stack>
            <Spacer />
            <CardFooter w={'100%'}>
              <ButtonGroup spacing="2">
                {/* 여기에 상세페이지로 링크 */}
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={() => navigate(`/restaurant/${restaurantNo}`)}
                >
                  상세 페이지
                </Button>
              </ButtonGroup>
            </CardFooter>
          </VStack>
          <Divider orientation="vertical" />
          <Spacer />
          {!isMobile && (
            <CardBody w={'30%'}>
              <Image w="100%" h="100%" src={data.reviewPhotoDir} alt={img} borderRadius="lg" />
            </CardBody>
          )}
        </Card>
      </HStack>
    </div>
  );
};
