import Axios from '@/api/apiConfig';
import { ROUTES } from '@/routes/ROUTES';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRestaurantDetail } from './historyTabs/hooks/useRestaurantDetail';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  const getBookmarks = async () => {
    try {
      const res = await Axios.get('mypage/bookmark/userEmail');
      if (res.status === 200) {
        setBookmarks(res.data);
      } else {
        console.log(`Unexpected status code ${res.status}`);
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarks', error);
      setBookmarks([]);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, [forceUpdate]);

  const navigate = useNavigate();
  return (
    <VStack width={'100%'} spacing={'2rem'} paddingLeft={'2rem'}>
      <Text fontSize={'3xl'} mt={'2rem'} fontWeight={'extrabold'}>
        즐겨찾기
      </Text>
      <Divider />
      {!bookmarks || bookmarks.length < 1 ? (
        <VStack h="85vh" spacing={'1rem'}>
          <Text mt={'3rem'} mb={'3rem'} fontSize={'2xl'}>
            등록된 가게가 없습니다 😂
          </Text>
          <Text fontSize={'2xl'}>지금 한번 둘러보시겠어요 ?</Text>
          <HStack spacing={'1rem'}>
            <Text fontSize={'xl'}>➞ 예약 베스트</Text>
            <Button
              colorScheme="green"
              size={'sm'}
              onClick={() => navigate(ROUTES.BEST_RAW + 'reservation')}
            >
              GO
            </Button>
          </HStack>
          <HStack spacing={'1rem'}>
            <Text fontSize={'xl'}>➞ 평점 베스트</Text>
            <Button
              colorScheme="green"
              size={'sm'}
              onClick={() => navigate(ROUTES.BEST_RAW + 'star')}
            >
              GO
            </Button>
          </HStack>
          <HStack spacing={'1rem'}>
            <Text fontSize={'xl'}>➞ 리뷰 베스트</Text>
            <Button
              colorScheme="green"
              size={'sm'}
              onClick={() => navigate(ROUTES.BEST_RAW + 'review')}
            >
              GO
            </Button>
          </HStack>
        </VStack>
      ) : (
        <SimpleGrid
          justifyItems={'center'}
          gap={4}
          height={'85vh'}
          overflow={'auto'}
          width={'100%'}
          columns={{ base: 1, md: 2 }}
          spacing={10}
          align={'center'}
        >
          {bookmarks &&
            bookmarks.map((bookmark, idx) => (
              <BookmarkCard
                restuarantNo={bookmark.restaurantNo}
                key={idx}
                idx={idx}
                refresh={() => setForceUpdate(!forceUpdate)}
              />
            ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
export default BookmarkPage;

const BookmarkCard = ({ restuarantNo, idx, refresh }) => {
  const { data } = useRestaurantDetail(restuarantNo);
  const navigate = useNavigate();

  const deleteBookmark = async restaurantNo => {
    const result = await Axios.delete(`mypage/bookmark/${restaurantNo}`);
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '즐겨찾기 삭제 성공',
        text: '더 나은 서비스로 만나 뵙겠습니다',
      });
      refresh();
    } else {
      Swal.fire({
        icon: 'error',
        title: '즐겨찾기 삭제 실패',
        text: '다시 시도해 주세요',
      });
    }
    refresh();
  };
  if (!data) return <></>;
  return (
    <div>
      <HStack align={'flex-start'} spacing={'2rem'}>
        <Text fontWeight={'extrabold'} fontSize={'4xl'}>
          {idx + 1}
        </Text>
        <Card maxW="sm">
          <CardBody>
            <Box ml="2rem" mt={'1rem'} p="1rem" w="15rem" h="15rem">
              <Image
                w={'100%'}
                h={'100%'}
                src={
                  data.restuarantPhotoDir
                    ? data.restuarantPhotoDir
                    : 'https://bv-image.s3.ap-northeast-2.amazonaws.com/logoSVG.svg'
                }
                alt={'식당 이미지'}
                borderRadius="lg"
              />
            </Box>
            <Stack mt="6" spacing="3">
              <Heading size="md">{data.restuarantName}</Heading>
              <Text>{data.restuarantDetail}</Text>
              <HStack>
                <AiFillStar color="gold" size={'40px'} />
                <Text color="blue.600" fontSize="2xl">
                  {data.restaurantStar.toFixed(1)}
                </Text>
              </HStack>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="green"
                onClick={() => navigate(`/restaurant/${data.restaurantNo}`)}
              >
                상세페이지
              </Button>
              <Button
                variant="solid"
                colorScheme="teal"
                onClick={() => deleteBookmark(data.restaurantNo)}
              >
                즐겨찾기 삭제
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </HStack>
    </div>
  );
};
