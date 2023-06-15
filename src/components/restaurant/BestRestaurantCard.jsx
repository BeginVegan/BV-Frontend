import React from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Flex, HStack, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';

const BestRestaurantCard = ({
  restaurantId,
  restaurantImg,
  restaurantName,
  restaurantStar,
  restaurantAddress,
  restaurantDetail,
}) => {
  const navigator = useNavigate();
  const moveDetailPage = () => {
    navigator(ROUTES.RESTAURANT_RAW + restaurantId);
  };

  return (
    <Stack
      borderRadius="lg"
      w={'774px'}
      height={'238px'}
      direction={'row'}
      bg={useColorModeValue('white', 'gray.900')}
      p={4}
      boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      <Flex cursor={'pointer'} flex={2} bg="blue.200" onClick={moveDetailPage}>
        <Image objectFit="cover" boxSize="100%" src={restaurantImg} />
      </Flex>
      <Stack
        flex={4}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        px={4}
        pt={2}
      >
        <HStack>
          <Heading
            cursor={'pointer'}
            pr={4}
            fontWeight={400}
            fontSize={'2xl'}
            onClick={moveDetailPage}
          >
            {restaurantName}
          </Heading>
          <StarIcon boxSize={4} color={'yellow.500'} />
          <Text fontWeight={400} color={'gray.500'} fontSize="lg" mb={4}>
            {restaurantStar}
          </Text>
        </HStack>
        <Text fontWeight={400} color={'gray.500'} fontSize="lg" mb={4}>
          {restaurantAddress}
        </Text>
        <HStack align={'start'}>
          <Text fontWeight={100} color={'gray.600'} fontSize="sm" mb={4}>
            {restaurantDetail}
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default BestRestaurantCard;
