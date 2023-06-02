import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { CountUp } from 'use-count-up';

const MyPageMain = () => {
  const point = '1000000000';
  const grade = 'VVVVVVVIP';

  return (
    <Box
      p={'20rem'}
      bg={`url('../src/assets/panel/green.png') no-repeat`}
      bgPosition="center"
      bgSize={{ base: '40vh', md: '80vh' }}
    >
      <VStack spacing={6} align="center">
        <Heading size="xl">보유 포인트</Heading>
        <HStack spacing={'0.5rem'}>
          <Text fontSize="4xl" fontWeight="bold" color="blue.600">
            <CountUp isCounting={true} end={Number(point)} duration={3.2} easing={'easeOutCubic'} />
          </Text>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            점
          </Text>
        </HStack>
        <Text fontSize="2xl" fontWeight="bold" color="purple.600">
          님의 등급은
        </Text>
        <Text fontSize="6xl" fontWeight="bold" color="red">
          {grade}
        </Text>
      </VStack>
    </Box>
  );
};

export default MyPageMain;
