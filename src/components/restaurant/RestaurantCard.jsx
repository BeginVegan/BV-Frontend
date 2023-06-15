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

const RestaurantCard = ({
  restaurantNo,
  restaurantName,
  restaurantStar,
  restaurantAddress,
  restaurantDetail,
  restaurantPhotoDir,
  restaurantX,
  restaurantY,
  setMapCenter,
  setClickedMarker,
  setIsPanto,
}) => {
  const navigate = useNavigate();
  const size = restaurantName.length > 8 ? 'lg' : 'xl';

  return (
    <Stack
      cursor={'pointer'}
      borderRadius="lg"
      w={'400px'}
      height={'100px'}
      direction={'row'}
      bg={useColorModeValue('white', 'gray.900')}
      onClick={() => {
        setMapCenter({ lat: restaurantX, lng: restaurantY });
        setClickedMarker({
          restaurantNo: restaurantNo,
          title: restaurantName,
          latlng: { lat: restaurantX, lng: restaurantY },
        });
        setIsPanto(true);
      }}
    >
      <Flex flex={2}>
        <Image
          objectFit="cover"
          boxSize="100%"
          src={
            restaurantPhotoDir
              ? `${restaurantPhotoDir}`
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
        <HStack onClick={() => navigate(`/restaurant/${restaurantNo}`)}>
          <Heading
            _hover={{
              cursor: 'pointer',
              color: 'blue.500',
            }}
            onClick={() => navigate(`/restaurant/${restaurantNo}`)}
            fontSize={size}
          >
            {restaurantName}
          </Heading>
          <StarIcon ml={4} boxSize={4} color={'yellow.500'} />
          <Text fontSize={'lg'} color={'gray.500'} fontWeight={600}>
            {restaurantStar}
          </Text>
        </HStack>
        <Text fontWeight={400} color={'gray.500'} size="sm" mb={4}>
          {restaurantAddress} - {restaurantDetail}
        </Text>
      </Stack>
    </Stack>
  );
};

export default RestaurantCard;
