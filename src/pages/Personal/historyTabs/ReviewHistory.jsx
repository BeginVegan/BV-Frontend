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
  Grid,
  HStack,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRestaurantDetail } from './hooks/useRestaurantDetail';

const ReviewHistory = () => {
  const [reviewList, setReviewList] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false); 
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

  useEffect(() => {
    getReview();
  }, [forceUpdate]);
  const templateColumns = useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' });

  return (
    reviewList && reviewList.length > 0 ?
      (
        <VStack align={'flex-start'}>
          <Grid w={"100%"} templateColumns={templateColumns} gap={4} height={'80vh'} overflowY={'auto'} padding={4}>
            {reviewList.map((review, idx) => (
              <RestaurantReviewCard
                key={idx}
                idx={idx}
                restaurantNo={review.restaurantNo}
                img={review.reviewPhotoDir}
                reviewNo={review.reviewNo}
                content={review.reviewContent}
                refresh={() => setForceUpdate(!forceUpdate)}
              />
            ))}
          </Grid> 
        </VStack>
      )
      : 
      (
        <Flex justifyContent="center" mt={'2rem'} alignItems="center" height="100%">
          <Text fontSize={'2xl'}>리뷰가 없습니다 😂</Text>
        </Flex>
      )
  );  
  

};
export default ReviewHistory;

const RestaurantReviewCard = ({ restaurantNo,idx, img, reviewNo, content, refresh }) => {
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

  const deleteReview = (reviewNo) => {
    Swal.fire({
      icon: 'question',
      title: '정말 삭제하시겠습니까?',
      text: '삭제 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          const result = await Axios.delete(`mypage/review/${reviewNo}`)
          if (result.status === 200 ) {
            Swal.fire({
              icon: 'success',
              title: '리뷰 삭제 성공',
              text: '고객의 리뷰는 가게에 큰 힘이 됩니다',
            })
            refresh()
          } else {
            Swal.fire({
              icon:'error',
              title:'리뷰 삭제 실패',
              text: '다시 시도해 주세요'
            })
          }
        } catch (error) {
          Swal.fire({
            icon:'error',
            title:'리뷰 삭제 실패',
            text: '다시 시도해 주세요'
          })
        }
      }
    });
  }
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
                <Text>{content}</Text>
              </Stack>

              {isMobile && (
              <CardBody w={'100%'}>
                <Box ml="2rem" mt={"1rem"} p="1rem" w="15rem" h="15rem">
                  <Image w="100%" h="100%"  src={img ? img : 'https://bv-image.s3.ap-northeast-2.amazonaws.com/logoSVG.svg'} alt={"리뷰 이미지"} borderRadius="lg" />
                </Box>
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
                <Button
                  variant="solid"
                  colorScheme="teal"
                  onClick={() => deleteReview(reviewNo)}
                >
                  리뷰 삭제
                </Button>
              </ButtonGroup>
            </CardFooter>
          </VStack>
          <Divider orientation="vertical" />
          <Spacer />
          {!isMobile && (
            <CardBody w={'100%'}>
              <Box ml="2rem" mt={"1rem"} p="1rem" w="15rem" h="15rem">
                <Image w="100%" h="100%"  src={img? img: 'https://bv-image.s3.ap-northeast-2.amazonaws.com/logoSVG.svg'} alt={"리뷰 이미지"} borderRadius="lg" />
              </Box>
            </CardBody>
          )}
        </Card>
      </HStack>
    </div>
  );
};
