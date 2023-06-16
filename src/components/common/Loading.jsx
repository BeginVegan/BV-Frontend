import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Flex
      bgColor={'rgba(0, 0, 0, 0.534)'}
      w={'100vw'}
      height={'100vh'}
      position={'absolute'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Spinner size="xl" color="white" />
    </Flex>
  );
};

export default Loading;
