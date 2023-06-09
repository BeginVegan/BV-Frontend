import Axios from '@/api/apiConfig';
import { Flex, HStack, Stack, VStack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRestaurantDetail } from './hooks/useRestaurantDetail';

const RESTUARANTS = [
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당이었당',
    menu: '박복자 보끔밥',
    price: '30000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당이었당',
    menu: '박복자 보끔밥',
    price: '30000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당이었당',
    menu: '박복자 보끔밥',
    price: '30000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당이었당',
    menu: '박복자 보끔밥',
    price: '30000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당이었당',
    menu: '박복자 보끔밥',
    price: '30000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당이었당',
    menu: '박복자 보끔밥',
    price: '30000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
];
const ReviewHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviewList, setReviewList] = useState(null);

  useEffect(() => {
    const getReview = async () => {
      const res = await Axios.get('mypage/review/userEmail');
      console.log('review', res);
      if (res.status === 200) {
        console.log('review', res.data);
        setReviewList(res.data);
      }
    };
    getReview();
  }, []);

  return (
    <VStack align={'flex-start'}>
      <Flex height={'80vh'} overflowY={'auto'}>
        <VStack marginTop={'2rem'} align={'start'}>
          {reviewList.map((review, idx) => {
            return <RestaurantReviewCard key={idx} restaurantNo={review.restaurantNo} />;
          })}
        </VStack>
      </Flex>
    </VStack>
  );
};
export default ReviewHistory;

const RestaurantReviewCard = ({ restaurantNo, key }) => {
  const { data } = useRestaurantDetail(restaurantNo);
  console.log('!!!!!!!!!!!', data);

  const getHowMany = list => {
    if (list.length > 1) {
      return list[0].menuName + ' 외 ' + (list.length - 1) + '개';
    }
    return list[0].menuName;
  };
  return (
    <div key={restaurantNo}>
      <HStack
        w={'100%'}
        spacing={'2rem'}
        align={'flex-start'}
        marginBottom={'2rem'}
        paddingRight={'2rem'}
      >
        <Text fontWeight={'extrabold'} fontSize={'4xl'}>
          {key + 1}
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
                  <Text>{getHowMany(data.reservationMenuList)}</Text>
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
                  {/* <Text>{data.}</Text> */}
                </Stack>
                <br />
                {/* <Text>{restaurant.description}</Text> */}
              </Stack>

              {isMobile && (
                <CardBody w={'100%'}>
                  {/* <Image
                    pointerEvents="none"
                    src={restaurant.image}
                    alt={restaurant.alt}
                    borderRadius="lg"
                  /> */}
                </CardBody>
              )}
            </Stack>
            <Spacer />
            <CardFooter w={'100%'}>
              <ButtonGroup spacing="2">
                {/* 여기에 상세페이지로 링크 */}
                <Button variant="solid" colorScheme="green">
                  상세 페이지
                </Button>
              </ButtonGroup>
            </CardFooter>
          </VStack>
          <Divider orientation="vertical" />
          <Spacer />
          {!isMobile && (
            <CardBody w={'30%'}>
              {/* <Image src={restaurant.image} alt={restaurant.alt} borderRadius="lg" /> */}
            </CardBody>
          )}
        </Card>
      </HStack>
    </div>
  );
};
