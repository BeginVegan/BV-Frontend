import Storage from '@/utils/storage/storage';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ROUTES } from '@/routes/ROUTES';
import Loading from '@/components/common/Loading';

const RegisterComplete = () => {
  const navigate = useNavigate();
  const data = Storage.getJsonItem('rastaurantInfo');

  if (!data) return <Loading />;

  return (
    <Flex direction={'column'} gap={8}>
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          업체명
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          {data.restaurantName}
        </Text>
      </HStack>
      {/* <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          전화번호
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          010-1111-1111
        </Text>
      </HStack> */}
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          주소
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          {data.address}
        </Text>
      </HStack>
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          영업시간
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          {`${data.openH}:${data.openM}:00 ~ ${data.closeH}:${data.closeM}:00`}
        </Text>
      </HStack>
      <HStack pt={4} alignSelf={'center'} gap={4}>
        <Button onClick={() => navigate(`${ROUTES.RESTAURANT_RAW}${data.restaurantNo}`)}>
          가게 이동
        </Button>
        <Button>가게 수정</Button>
      </HStack>
    </Flex>
  );
};

export default RegisterComplete;
