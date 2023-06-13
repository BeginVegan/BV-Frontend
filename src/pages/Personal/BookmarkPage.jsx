import Axios from '@/api/apiConfig';
import {
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
import { useRestaurantDetail } from './historyTabs/hooks/useRestaurantDetail';


const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState(null);
  useEffect(() => {
    const getReservations = async () => {
      const res = await Axios.get('mypage/bookmark/userEmail');
      if (res.status === 200) {
        setBookmarks(res.data);
        
      }
    };
    getReservations();
  }, []);

  return (
    <VStack width={'100%'} spacing={'2rem'} paddingLeft={'2rem'}>
      <Text fontSize={'5xl'} fontWeight={'extrabold'}>
        즐겨찾기
      </Text>
      <Divider />
      <SimpleGrid
        justifyItems={'center'}
        height={'85vh'}
        overflow={'auto'}
        width={'100%'}
        columns={{ base: 1, md: 2 }}
        spacing={10}
        align={'center'}
      >
       
        <BookmarkCard restuarantNo={1} key={0} idx={0} />
      </SimpleGrid>
    </VStack>
  );
};
export default BookmarkPage;

const BookmarkCard = ({ restuarantNo, idx }) => {
  const { data } = useRestaurantDetail(restuarantNo);
  

  if (!data) return <></>;
  return (
    <div>
      <HStack align={'flex-start'} spacing={'2rem'}>
        <Text fontWeight={'extrabold'} fontSize={'4xl'}>
          {idx + 1}
        </Text>
        <Card maxW="sm">
          <CardBody>
            <Image
              w={'100%'}
              h={'100%'}
              src={data.restuarantPhotoDir}
              
              alt={null}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{data.restuarantName}</Heading>
              <Text>{data.restuarantDetail}</Text>
              <HStack>
                <AiFillStar color="gold" size={'40px'} />
                <Text color="blue.600" fontSize="2xl">
                  {data.restaurantStar}
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
            </ButtonGroup>
          </CardFooter>
        </Card>
      </HStack>
    </div>
  );
};
