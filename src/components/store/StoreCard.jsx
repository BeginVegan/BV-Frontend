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

const StoreCard = ({ storeName, storeStar, storeAddress, storeMenu }) => {
  return (
    <Stack
      borderRadius="lg"
      w={'400px'}
      height={'100px'}
      direction={'row'}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <Flex flex={2} bg="blue.200">
        <Image objectFit="cover" boxSize="100%" src={'https://source.unsplash.com/random/?dish'} />
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
          {storeName}
          <StarIcon ml={4} boxSize={4} color={'yellow.500'} />
          {` ${storeStar}`}
        </Heading>
        <Text fontWeight={400} color={'gray.500'} size="sm" mb={4}>
          {storeAddress} - {storeMenu}
        </Text>
      </Stack>
    </Stack>
  );
};

export default StoreCard;
