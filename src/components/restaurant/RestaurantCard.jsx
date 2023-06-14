import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const RestaurantCard = ({
  restaurantName,
  restaurantStar,
  restaurantAddress,
  restaurantDetail,
  restaurantPhotoDir,
}) => {
  return (
    <Stack
      borderRadius="lg"
      w={'400px'}
      height={'100px'}
      direction={'row'}
      bg={useColorModeValue('white', 'gray.900')}
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
        <Heading fontSize={'xl'}>
          {restaurantName}
          <StarIcon ml={4} boxSize={4} color={'yellow.500'} />
          {` ${restaurantStar}`}
        </Heading>
        <Text fontWeight={400} color={'gray.500'} size="sm" mb={4}>
          {restaurantAddress} - {restaurantDetail}
        </Text>
      </Stack>
    </Stack>
  );
};

export default RestaurantCard;
