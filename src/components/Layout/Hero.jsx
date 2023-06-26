import React from 'react';
import { Stack, Flex, Text, VStack, Skeleton } from '@chakra-ui/react';
import heroImage from '@/assets/images/hero.jpg';
import SearchBar from '@/components/search/SearchBar';
import { useProgressiveImage } from '@/hooks/useProgressiveImage';

const Hero = () => {
  const heroloaded = useProgressiveImage(heroImage);

  return (
    <Flex
      w={'full'}
      h={{ base: '300px', md: '500px' }}
      backgroundImage={heroloaded}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack w={'full'} justify={'center'} px={{ base: 4, md: 8 }} bgColor={'rgba(0, 0, 0, 0.25)'}>
        <Stack maxW={'3xl'} align={'center'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            align={'center'}
            fontSize={{ base: '3xl', md: '4xl' }}
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
