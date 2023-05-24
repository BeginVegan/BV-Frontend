// const { query } = useParams();
// const { status, data, error, isFetching } = useQuery('fetchLuke', async () => {
//   const { data } = await axios.get('http://15.165.34.129:3000/member/list', null, {
//     headers: {
//       'Access-Control-Allow-Credentials': 'true',
//     },
//   });
//   return data;
// });
import SearchFilter from '@/components/search/SearchFilter';
import StoreCard from '@/components/store/StoreCard';
import { Text, Stack, StackDivider, Grid, GridItem, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { RiEqualizerLine } from 'react-icons/ri';

const SearchResultPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const stores = [
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
    {
      storeName: '농민백암왕순대',
      storeAddress: '강남역',
      storeStar: '4.7',
      storeMenu: '탕 / 찌개 / 전골',
    },
  ];

  return (
    <Grid
      h={'calc(100vh - 60px)'}
      mx={'0'}
      pr={'0'}
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(9, 1fr)"
      spacing={10}
      overflow={'hidden'}
      gap={0.4}
    >
      {isFilterOpen && <SearchFilter setIsFilterOpen={setIsFilterOpen} />}
      <GridItem pt={4} ml={'auto'} rowSpan={1} colSpan={2} minW={'400px'}>
        <Stack spacing={4}>
          <Stack direction={'row'} alignItems={'center'}>
            <Text
              textTransform={'uppercase'}
              color={'green.400'}
              fontWeight={600}
              fontSize={'xl'}
              p={2}
              rounded={'md'}
              display={'inline-block'}
            >
              맛집 인기 검색순위
            </Text>
            <Stack
              cursor={'pointer'}
              direction={'row'}
              alignItems={'center'}
              onClick={() => setIsFilterOpen(true)}
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
            h={'calc(100vh - 160px)'}
            overflowY={'scroll'}
            sx={{
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              },
              '&::-webkit-scrollbar-thumb:active': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
            divider={<StackDivider borderColor={'gray.100'} />}
          >
            {stores.map(store => (
              <StoreCard
                storeName={store.storeName}
                storeMenu={store.storeMenu}
                storeAddress={store.storeAddress}
                storeStar={store.storeStar}
              />
            ))}
          </Stack>
        </Stack>
      </GridItem>
      <GridItem
        boxShadow={
          'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
        }
        rowSpan={1}
        colSpan={7}
        bg="papayawhip"
      >
        {/* 지도 들어갈 곳*/}
      </GridItem>
    </Grid>
  );
};

export default SearchResultPage;
