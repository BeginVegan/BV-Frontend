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

  return (
    <Stack
      cursor={'pointer'}
      borderRadius="lg"
      w={'400px'}
      h={'150px'}
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
          maxH={'100px'}
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
        <HStack h={'25px'}>
          <StarIcon boxSize={4} color={'yellow.500'} />
          <Text h={'25px'} w={'35px'} fontSize={'lg'} color={'gray.500'} fontWeight={600}>
            {restaurant.restaurantStar.toFixed(1)}
          </Text>
          <Heading
            h={'25px'}
            _hover={{
              cursor: 'pointer',
              color: 'blue.500',
            }}
            onClick={() => navigate(`/restaurant/${restaurant.restaurantNo}`)}
            fontSize={size}
          >
            {restaurant.restaurantName}
          </Heading>
        </HStack>
        <Text fontWeight={400} color={'gray.500'} fontSize={'md'}>
          {restaurant.restaurantAddress.length > 20
            ? restaurant.restaurantAddress.slice(0, 20) + '..'
            : restaurant.restaurantAddress}
        </Text>
        <Text fontWeight={300} color={'gray.500'} fontSize={'sm'}>
          {restaurant.restaurantPhone != null && `전화번호: ${restaurant.restaurantPhone}`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default RestaurantCard;
