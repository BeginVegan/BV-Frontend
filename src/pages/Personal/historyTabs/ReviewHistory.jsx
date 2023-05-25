import { StarRank } from '@/components/star/StarRank';
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
} from '@chakra-ui/react';

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
  return (
    <VStack align={'flex-start'}>
      <Flex height={'80vh'} overflowY={'auto'}>
        <VStack marginTop={'2rem'} align={'start'}>
          {RESTUARANTS.map((restaurant, idx) => {
            return (
              <div key={idx}>
                <HStack w={'100%'} spacing={'2rem'} align={'flex-start'} marginBottom={'2rem'}>
                  <Text fontWeight={'extrabold'} fontSize={'4xl'}>
                    {restaurant.id}
                  </Text>
                  <Card direction={{ base: 'column', sm: 'row' }}>
                    <VStack w={'70%'}>
                      <Stack paddingLeft={'1.5rem'} w={'100%'} mt="6" spacing="3">
                        <Heading size="md">{restaurant.name}</Heading>
                        <StarRank number={restaurant.star} />
                        <HStack spacing={'1rem'}>
                          <Box
                            backgroundColor={'green.100'}
                            paddingLeft={'0.5rem'}
                            paddingRight={'0.5rem'}
                          >
                            <Text color={'green'} fontWeight={'bold'}>
                              메뉴
                            </Text>
                          </Box>
                          <Text>{restaurant.menu}</Text>
                          <Box
                            backgroundColor={'green.100'}
                            paddingLeft={'0.5rem'}
                            paddingRight={'0.5rem'}
                          >
                            <Text color={'green'} fontWeight={'bold'}>
                              가격
                            </Text>
                          </Box>
                          <Text>{restaurant.price}</Text>
                        </HStack>
                        <br />
                        <Text>{restaurant.description}</Text>
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
                    <CardBody w={'30%'}>
                      <Image src={restaurant.image} alt={restaurant.alt} borderRadius="lg" />
                    </CardBody>
                  </Card>
                </HStack>
              </div>
            );
          })}
        </VStack>
      </Flex>
    </VStack>
  );
};
export default ReviewHistory;
