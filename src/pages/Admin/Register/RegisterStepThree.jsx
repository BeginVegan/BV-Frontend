import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const RegisterStepThree = () => {
  return (
    <Flex direction={'column'} gap={8}>
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          업체명
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          업체명
        </Text>
      </HStack>
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          전화번호
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          010-1111-1111
        </Text>
      </HStack>
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          주소
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          주소
        </Text>
      </HStack>
      <HStack>
        <Text w={'120px'} fontWeight={600} color={'gray.600'} fontSize="2xl">
          영업시간
        </Text>
        <Text fontWeight={400} color={'gray.400'} fontSize="2xl">
          영업시간-영업시간
        </Text>
      </HStack>
      <HStack pt={4} alignSelf={'center'} gap={4}>
        <Button>가게 이동</Button>
        <Button>가게 수정</Button>
      </HStack>
    </Flex>
  );
};

export default RegisterStepThree;
