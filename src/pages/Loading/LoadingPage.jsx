import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingPage = () => (
  <VStack minH="100vh" justify="center" align="center" spacing={8}>
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />

    <Box>
      <Text fontSize="xl">로딩중입니다...</Text>
    </Box>
  </VStack>
);

export default LoadingPage;
