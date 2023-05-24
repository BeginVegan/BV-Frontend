import React from 'react';
import { Stack, Flex, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import heroImage from '@/assets/images/hero.jpg';
import SearchBar from '@/components/search/SearchBar';

const Hero = () => {
  return (
    <Flex
      w={'full'}
      h={useBreakpointValue({ base: '300px', md: '450px' })}
      backgroundImage={`url(${heroImage})`}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack maxW={'3xl'} align={'center'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            align={'center'}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            시작해요, 비건생활
            <br /> 비긴비건.
          </Text>
          <Stack direction={'row'}>
            <SearchBar isMain={true} />
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Hero;
