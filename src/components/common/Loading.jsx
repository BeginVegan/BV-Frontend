import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Flex
      bgColor={'rgba(0, 0, 0, 0.534)'}
      w={'100%'}
      height={'100vh'}
      position={'fixed'}
      top={-2}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Spinner size="xl" color="white" />
    </Flex>
  );
};

export default Loading;
