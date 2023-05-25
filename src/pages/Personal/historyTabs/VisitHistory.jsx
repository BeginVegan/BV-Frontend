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
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

const RESTUARANTS = [
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
  {
    id: '1',
    name: '식당1',
    description: '맛있는 식당',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'tmp',
    star: '4.5',
  },
];
const VisitHistory = () => {
  return (
    <VStack align={'flex-start'}>
      <RadioGroup defaultValue="2">
        <Stack spacing={5} direction="row">
          <Radio colorScheme="green" value="1">
            최신순
          </Radio>
          <Radio colorScheme="green" value="2">
            방문횟수순
          </Radio>
        </Stack>
      </RadioGroup>
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
                    <CardBody w={'30%'}>
                      <Image src={restaurant.image} alt={restaurant.alt} borderRadius="lg" />
                    </CardBody>
                    <Divider orientation="vertical" />
                    <VStack w={'70%'}>
                      <Stack w={'100%'} mt="6" spacing="3">
                        <Heading size="md">{restaurant.name}</Heading>
                        <Text>{restaurant.description}</Text>
                        <HStack>
                          <AiFillStar color="gold" size={'2rem'} />
                          <Text color="blue.600" fontSize="2xl">
                            {restaurant.star}
                          </Text>
                        </HStack>
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
export default VisitHistory;
