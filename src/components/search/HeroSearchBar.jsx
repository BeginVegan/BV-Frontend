import React from 'react';
import { Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const HeroSearchBar = () => {
  return (
    <InputGroup size="lg" w={{ lg: '600px', sm: '300px' }}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon boxSize={5} color="gray.300" />}
      />
      <Input
        size="full"
        borderRadius="3xl"
        bg="white"
        type="tel"
        placeholder="지역, 식당 또는 음식"
      />
      <InputRightAddon
        borderRightRadius="3xl"
        children="검색"
        _hover={{ bgColor: 'green.200' }}
        cursor={'pointer'}
      />
    </InputGroup>
  );
};

export default HeroSearchBar;
