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

const BookmarkPage = () => {
  return (
    <VStack width={'100%'} spacing={'2rem'} paddingLeft={'2rem'}>
      <Text fontSize={'5xl'} fontWeight={'extrabold'}>
        즐겨찾기
      </Text>
      <Divider />
      <SimpleGrid
        height={'85vh'}
        overflow={'auto'}
        width={'100%'}
        columns={{ base: 1, md: 2 }}
        spacing={10}
        align={'center'}
      >
        {RESTUARANTS.map((restuarant, idx) => {
          return (
            <div key={idx}>
              <HStack align={'flex-start'} spacing={'2rem'}>
                <Text fontWeight={'extrabold'} fontSize={'4xl'}>
                  {restuarant.id}
                </Text>
                <Card maxW="sm">
                  <CardBody>
                    <Image src={restuarant.image} alt={restuarant.alt} borderRadius="lg" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{restuarant.name}</Heading>
                      <Text>{restuarant.description}</Text>
                      <HStack>
                        <AiFillStar color="gold" size={'2rem'} />
                        <Text color="blue.600" fontSize="2xl">
                          {restuarant.star}
                        </Text>
                      </HStack>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="green">
                        상세페이지
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </HStack>
            </div>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};
export default BookmarkPage;
