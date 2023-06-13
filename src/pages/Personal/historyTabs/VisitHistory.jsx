import Axios from '@/api/apiConfig';
import { COLORS } from '@/constants/colors';
import {
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

  useEffect(() => {
    const getReservations = async () => {
      const res = await Axios.get('reservation/list/memberEmail');
      if (res.status === 200) {
        setReservationList(res.data);
      }
    };
    getReservations();
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

  return (
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
      <Flex height={'80vh'} overflowY={'auto'}>
        <VStack marginTop={'2rem'} align={'start'}>
          {sortedReservationList.map((restaurant, idx) => {
            return <RestaurantCards key={idx} id={idx} restaurant={restaurant} />;
          })}
        </VStack>
      </Flex>
    </VStack>
  );
};

export default VisitHistory;

const RestaurantCards = ({ restaurant, id }) => {
  const { data } = useRestaurantDetail(restaurant.restaurantNo);
  const { restaurantName, restaurantDetail, restaurantPhotoDir, restaurantStar } = data || {};
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  
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
          >
            <CardBody w={isMobile ? '100%' : '30%'}>
              <Image
                w={'100rem'}
                h={'100%'}
                pointerEvents="none"
                src={restaurantPhotoDir}
                alt={restaurant.alt}
                borderRadius="lg"
              />
            </CardBody>
            <Divider orientation="vertical" />
            <VStack w={'70%'}>
              <Stack ml={isMobile ? '2rem' : 0} w={'100%'} mt="6" spacing="3">
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
                <ButtonGroup spacing="2">
                  {/* 여기에 상세페이지로 링크 */}
                  <Button
                    variant="solid"
                    colorScheme="green"
                    onClick={() => navigate(`/restaurant/${restaurant.restaurantNo}`)}
                  >
                    상세 페이지
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </VStack>
          </Card>
        </HStack>
      )}
    </div>
  );
};
