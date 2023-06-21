import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { Box, Flex, Heading, Icon, Stack, StackDivider, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiEqualizerLine } from 'react-icons/ri';

const SearchSidebar = ({
  query,
  restaurants,
  isRestaurantsNull,
  mapCenter,
  setMapCenter,
  setOpenMarker,
  setIsPanto,
  reFetchData,
  setOpenList,
  openList,
  setIsFilterOpen,
}) => {
  return (
    <>
      <Box
        cursor={'pointer'}
        borderRightRadius={'lg'}
        py={5}
        position={'absolute'}
        top={'calc(50vh - 110px)'}
        left={openList ? '0px' : '430px'}
        bg={'white'}
        onClick={() => {
          setOpenList(p => !p);
          setIsFilterOpen(false);
        }}
        borderRight={'2px solid'}
        borderTop={'2px solid'}
        borderBottom={'2px solid'}
        borderRightColor={'gray.400'}
        borderTopColor={'gray.400'}
        borderBottomColor={'gray.400'}
        zIndex={1500}
      >
        {openList ? <RiArrowRightSLine size={30} /> : <RiArrowLeftSLine size={30} />}
      </Box>
      <Flex
        overflow={'hidden'}
        w={openList && '0px'}
        pt={2}
        h={'calc(100vh - 73px)'}
        bgColor={'white'}
        position={'absolute'}
        zIndex={1000}
      >
        <Stack spacing={4}>
          <Stack px={4} direction={'row'} minW={'430px'} justifyContent={'space-between'}>
            <Text
              textTransform={'uppercase'}
              color={'green.400'}
              fontWeight={600}
              fontSize={'xl'}
              p={2}
              rounded={'md'}
              display={'inline-block'}
            >
              '{query}' 검색결과
            </Text>
            <Stack
              cursor={'pointer'}
              direction={'row'}
              alignItems={'center'}
              pr={4}
              onClick={() => reFetchData()}
            >
              <Icon as={RiEqualizerLine} boxSize={6} />
              <Text
                textTransform={'uppercase'}
                color={'gray.600'}
                fontWeight={400}
                fontSize={'lg'}
                rounded={'md'}
                display={'inline-block'}
              >
                필터
              </Text>
            </Stack>
          </Stack>
          <Stack
            alignItems={'center'}
            h={'calc(100vh - 130px)'}
            pb={4}
            overflowY={'scroll'}
            gap={2}
            divider={<StackDivider borderColor={'gray.100'} />}
          >
            {restaurants &&
              restaurants.length > 0 &&
              restaurants.map((restaurant, idx) => (
                <RestaurantCard
                  key={idx}
                  restaurant={restaurant}
                  mapCenter={mapCenter}
                  setMapCenter={setMapCenter}
                  setOpenMarker={setOpenMarker}
                  setIsPanto={setIsPanto}
                />
              ))}
            {!(restaurants && restaurants.length > 0) && isRestaurantsNull && (
              <Stack>
                <Heading as="h3" size="lg">
                  검색 결과가 존재하지 않습니다.
                </Heading>
                <Text>단어의 철자가 정확한지 확인해 보세요.</Text>
                <Text>한글을 영어로 입력했는지 확인해 보세요.</Text>
                <Text>일반적인 검색어로 다시 검색해 보세요.</Text>
                <Text>검색 옵션을 변경해서 다시 검색해 보세요.</Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default SearchSidebar;
