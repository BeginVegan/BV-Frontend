import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { Box, Divider, Flex, Heading, Icon, Stack, StackDivider, Text } from '@chakra-ui/react';
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
  isDetailOpen,
  setIsDetailOpen,
  selectedRestaurantNo,
  setSelectedRestaurantNo,
}) => {
  return (
    <>
      <Box
        cursor={'pointer'}
        borderRightRadius={'lg'}
        py={5}
        position={'absolute'}
        top={'calc(50vh - 110px)'}
        left={!openList ? '0px' : isDetailOpen ? '781px' : '375px'}
        bg={'white'}
        onClick={() => {
          if (isDetailOpen) {
            setIsDetailOpen(false);
            setOpenList(false);
            setIsFilterOpen(false);
            return;
          }

          if (!openList) {
            setOpenList(true);
            if (selectedRestaurantNo) {
              setIsDetailOpen(true);
            }
            return;
          }

          setOpenList(p => !p);
          setIsFilterOpen(false);
          setIsDetailOpen(!openList);
        }}
        _hover={{
          borderColor: 'gray.600',
        }}
        borderRight={'2px solid'}
        borderTop={'2px solid'}
        borderBottom={'2px solid'}
        borderRightColor={'gray.400'}
        borderTopColor={'gray.400'}
        borderBottomColor={'gray.400'}
        zIndex={1000}
      >
        {!openList ? <RiArrowRightSLine size={30} /> : <RiArrowLeftSLine size={30} />}
      </Box>
      <Flex
        overflow={'hidden'}
        w={!openList ? '0px' : '381px'}
        h={'calc(100vh - 75px)'}
        bgColor={'white'}
        position={'absolute'}
        zIndex={1000}
      >
        <Stack h={'100%'}>
          <Stack
            alignSelf={'center'}
            justifyContent={'space-between'}
            shadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
            w={'100%'}
            direction={'row'}
            px={6}
            py={4}
          >
            <Text
              textTransform={'uppercase'}
              color={'green.400'}
              fontWeight={600}
              fontSize={'xl'}
              rounded={'md'}
              display={'inline-block'}
            >
              '{query}' 검색결과
            </Text>
            <Stack
              cursor={'pointer'}
              direction={'row'}
              alignItems={'center'}
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
            pb={4}
            overflowY={'scroll'}
            spacing={0}
            divider={<StackDivider borderColor={'gray.300'} />}
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
                  setSelectedRestaurantNo={setSelectedRestaurantNo}
                  setIsDetailOpen={setIsDetailOpen}
                />
              ))}
            {!(restaurants && restaurants.length > 0) && isRestaurantsNull && (
              <Stack textAlign={'center'} align={'center'} w={!openList ? '0px' : '375px'}>
                <Heading lineHeight={10} size="lg">
                  검색 결과가 존재하지 <br />
                  않습니다.
                </Heading>
                <Text>
                  단어의 철자가 정확한지 <br /> 확인해 보세요.
                </Text>
                <Text>
                  한글을 영어로 입력했는지 <br />
                  확인해 보세요.
                </Text>
                <Text>
                  일반적인 검색어로 <br /> 다시 검색해 보세요.
                </Text>
                <Text>
                  검색 옵션을 변경해서 <br /> 다시 검색해 보세요.
                </Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default SearchSidebar;
