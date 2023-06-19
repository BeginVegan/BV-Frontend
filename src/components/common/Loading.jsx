import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Flex w={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Spinner size="xl" color="white" />
    </Flex>
  );
};

export default Loading;
