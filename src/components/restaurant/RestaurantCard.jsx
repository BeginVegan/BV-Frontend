import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant, setMapCenter, setOpenMarker, setIsPanto }) => {
  const navigate = useNavigate();
  const size = restaurant.restaurantName.length > 8 ? 'lg' : 'xl';

  // console.log(restaurant.restaurantDetail);
  // const restaurantOpen = restaurant.restaurantOpen.substr(0, 5);
  // const restaurantClose = restaurant.restaurantClose.substr(0, 5);

  return (
    <Stack
      cursor={'pointer'}
      borderRadius="lg"
      w={'400px'}
      height={'100px'}
      direction={'row'}
      bg={useColorModeValue('white', 'gray.900')}
      onClick={() => {
        setMapCenter({ lat: restaurant.restaurantX, lng: restaurant.restaurantY });
        setOpenMarker({
          restaurantNo: restaurant.restaurantNo,
          title: restaurant.restaurantName,
          latlng: { lat: restaurant.restaurantX, lng: restaurant.restaurantY },
          isOpen: true,
        });
        setIsPanto(true);
      }}
    >
      <Flex flex={2}>
        <Image
          boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
          objectFit="cover"
          boxSize="100%"
          src={
            restaurant.restaurantPhotoDir
              ? `${restaurant.restaurantPhotoDir}`
              : 'https://bv-image.s3.ap-northeast-2.amazonaws.com/restaurant/default.png'
          }
        />
      </Flex>
      <Stack
        flex={4}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        p={1}
        pt={2}
      >
        <HStack>
          <Heading
            _hover={{
              cursor: 'pointer',
              color: 'blue.500',
            }}
            onClick={() => navigate(`/restaurant/${restaurant.restaurantNo}`)}
            fontSize={size}
          >
            {restaurant.restaurantName}
          </Heading>
          <StarIcon ml={4} boxSize={4} color={'yellow.500'} />
          <Text fontSize={'lg'} color={'gray.500'} fontWeight={600}>
            {restaurant.restaurantStar}
          </Text>
        </HStack>
        <Text fontWeight={400} color={'gray.500'} fontSize={'md'}>
          {restaurant.restaurantAddress}
        </Text>
        <Text fontWeight={300} color={'gray.500'} fontSize={'sm'}>
          전화번호: {restaurant.restaurantPhone}
        </Text>
      </Stack>
    </Stack>
  );
};

export default RestaurantCard;
