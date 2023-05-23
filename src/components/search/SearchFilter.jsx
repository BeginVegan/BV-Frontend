import {
  Button,
  Divider,
  GridItem,
  IconButton,
  Img,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import fishIcon from '@/assets/icons/icons-fish.png';
import broccoliIcon from '@/assets/icons/icon-broccoli.png';
import milkIcon from '@/assets/icons/icon-milk.png';
import eggIcon from '@/assets/icons/icons-egg.png';
import meatIcon from '@/assets/icons/icons-meat.png';
import chickenIcon from '@/assets/icons/icon-thanksgiving.png';

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
          <Stack direction={'row'} justifyContent={'center'} gap={3}>
            <IconButton
              bg={'white'}
              opacity={veganLevel === 0 ? '1' : '0.5'}
              icon={<Img src={broccoliIcon} />}
              onClick={() => setVeganLevel(0)}
            />
            <IconButton
              bg={'white'}
              opacity={veganLevel === 1 ? '1' : '0.5'}
              icon={<Img src={milkIcon} />}
              onClick={() => setVeganLevel(1)}
            />
            <IconButton
              bg={'white'}
              opacity={veganLevel === 2 ? '1' : '0.5'}
              icon={<Img src={eggIcon} />}
              onClick={() => setVeganLevel(2)}
            />
            <IconButton
              bg={'white'}
              opacity={veganLevel === 3 ? '1' : '0.5'}
              icon={<Img src={fishIcon} />}
              onClick={() => setVeganLevel(3)}
            />
            <IconButton
              bg={'white'}
              opacity={veganLevel === 4 ? '1' : '0.5'}
              icon={<Img src={chickenIcon} />}
              onClick={() => setVeganLevel(4)}
            />
            <IconButton
              bg={'white'}
              opacity={veganLevel === 5 ? '1' : '0.5'}
              icon={<Img src={meatIcon} />}
              onClick={() => setVeganLevel(5)}
            />
          </Stack>
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
