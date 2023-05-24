import { Button, GridItem, SimpleGrid, Stack, StackDivider, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import VeganLevel from '../store/VeganLevel';

const SearchFilter = ({ setIsFilterOpen }) => {
  const [veganLevel, setVeganLevel] = useState(0);

  return (
    <GridItem
      h={'calc(100vh - 60px)'}
      w={'430px'}
      bgColor={'white'}
      position={'absolute'}
      zIndex={'0'}
    >
      <Stack spacing={4} p={4} divider={<StackDivider borderColor={'gray.400'} />}>
        <Stack direction={'column'}>
          <Text
            textTransform={'uppercase'}
            color={'green.400'}
            fontWeight={600}
            fontSize={'lg'}
            p={2}
            rounded={'md'}
            display={'inline-block'}
          >
            검색 필터
          </Text>
          <SimpleGrid columns={2} spacing={5}>
            <Button rounded={'full'}>평점순</Button>
            <Button rounded={'full'}>인기순</Button>
          </SimpleGrid>
        </Stack>
        <Stack direction={'column'}>
          <Text
            textTransform={'uppercase'}
            color={'green.400'}
            fontWeight={600}
            fontSize={'lg'}
            p={2}
            rounded={'md'}
            display={'inline-block'}
          >
            지역
          </Text>
          <SimpleGrid columns={2} spacing={5}>
            <Button rounded={'full'}>가로수길</Button>
            <Button rounded={'full'}>강남역</Button>
            <Button rounded={'full'}>가로수길</Button>
            <Button rounded={'full'}>강남역</Button>
            <Button rounded={'full'}>가로수길</Button>
            <Button rounded={'full'}>강남역</Button>
            <Button rounded={'full'}>가로수길</Button>
            <Button rounded={'full'}>강남역</Button>
            <Button rounded={'full'}>가로수길</Button>
            <Button rounded={'full'}>강남역</Button>
          </SimpleGrid>
        </Stack>
        <Stack direction={'column'}>
          <Text
            textTransform={'uppercase'}
            color={'green.400'}
            fontWeight={600}
            fontSize={'lg'}
            p={2}
            rounded={'md'}
            display={'inline-block'}
          >
            비건레벨
          </Text>
          <VeganLevel veganLevel={veganLevel} setVeganLevel={setVeganLevel} />
        </Stack>
        <SimpleGrid columns={2} spacing={5}>
          <Button
            rounded={'full'}
            bgColor={'red.200'}
            _hover={{ bgColor: 'red.400' }}
            onClick={() => setIsFilterOpen(false)}
          >
            취소
          </Button>
          <Button
            rounded={'full'}
            bgColor={'green.200'}
            _hover={{ bgColor: 'green.400' }}
            onClick={() => setIsFilterOpen(false)}
          >
            적용
          </Button>
        </SimpleGrid>
      </Stack>
    </GridItem>
  );
};

export default SearchFilter;
