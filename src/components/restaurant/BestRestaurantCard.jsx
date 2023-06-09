import React from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Flex, HStack, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';

const BestRestaurantCard = ({ storeId, storeName, storeStar, storeAddress, reviewDetail }) => {
  const navigator = useNavigate();
  const moveDetailPage = () => {
    navigator(ROUTES.RESTAURANT_RAW + storeId);
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
        <Image objectFit="cover" boxSize="100%" src={'https://source.unsplash.com/random/?dish'} />
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
            {storeName}
          </Heading>
          <StarIcon boxSize={4} color={'yellow.500'} />
          <Text fontWeight={400} color={'gray.500'} fontSize="lg" mb={4}>
            {storeStar}
          </Text>
        </HStack>
        <Text fontWeight={400} color={'gray.500'} fontSize="lg" mb={4}>
          {storeAddress}
        </Text>
        <HStack align={'start'}>
          <StarIcon mr={2} boxSize={6} color={'yellow.500'} />
          <Text fontWeight={100} color={'gray.600'} fontSize="sm" mb={4}>
            <Text mr={2} fontWeight={400} color={'black'} fontSize="lg" display={'inline'}>
              임여사
            </Text>
            이것이 초밥이다!! 이것이 와사비다!! 초새우도 신선해~ 밥도 약간 찰진 느낌? 이제 초밥다운
            초밥을 먹어본 느낌입니다~^^ 회는 못 먹지만 초새우나 관자놀이..조갯살..이런 종류 초밥은
            잘 먹어영 ㅎㅎ 맛있옹~맛있옹~ 기뷴이 조아영 ㅎㅎ
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default BestRestaurantCard;
