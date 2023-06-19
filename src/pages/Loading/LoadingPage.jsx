import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingPage = () => (
  <VStack
    minW="100vw"
    minH="100vh"
    justify="center"
    align="center"
    position={'absolute'}
    top={0}
    left={0}
    bgColor={'rgba(0, 0, 0, 0.534)'}
  >
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />

    <Box>
      <Text fontSize="xl">페이지를 로딩중입니다...</Text>
    </Box>
  </VStack>
);

export default LoadingPage;
