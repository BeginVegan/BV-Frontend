import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';
import DataTable from '@/components/common/DataTable';
import {
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Input,
  Select,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import RestaurantService from '@/api/RestaurantService';
import LoadingPage from '@/pages/Loading/LoadingPage';

const columns = [
  {
    Header: '이름',
    accessor: 'name', // key값
  },
  {
    Header: '주소',
    accessor: 'address',
  },
  {
    Header: '영업시간',
    accessor: 'hours',
  },
  {
    Header: '상세정보',
    accessor: 'detail',
  },
  {
    Header: '테이블 수/좌석 수',
    accessor: 'table',
  },
  {
    Header: '비건레벨',
    accessor: 'veganlevel',
  },
  {
    Header: '평점',
    accessor: 'star',
  },
];

const RegisterManagement = () => {
  const navigator = useNavigate();
  const { data: restaurants, isLoading } = useQuery(
    'getRestaurantList',
    RestaurantService.getRestaurantList
  );

  const convertData = data => {
    return data.map(res => ({
      no: res.restaurantNo,
      name:
        res.restaurantName.length > 7 ? res.restaurantName.slice(0, 7) + '..' : res.restaurantName,
      address:
        res.restaurantAddress.length > 16
          ? res.restaurantAddress.slice(0, 16) + '..'
          : res.restaurantAddress,
      hours: res.restaurantOpen + ' - ' + res.restaurantClose,
      detail:
        res.restaurantDetail.length > 10
          ? res.restaurantDetail.slice(0, 10) + '...'
          : res.restaurantDetail,
      table: res.restaurantTable + '/' + `${res.restaurantTable * res.restaurantTableMember}`,
      veganlevel: res.restaurantVeganLevel,
      star: res.restaurantStar,
    }));
  };

  const [filteredData, setFilteredData] = useState(null);

  const [filterCriteria, setFilterCriteria] = useState({
    storeName: '',
    storeAddress: '',
    veganLevel: '',
  });

  const data = useMemo(() => {
    if (isLoading) return;
    setFilteredData(convertData(restaurants));
  }, [isLoading]);

  const applyFilter = () => {
    const filtered = restaurants.filter(restaurant => {
      const { storeName, storeAddress, veganLevel } = filterCriteria;

      const isstoreNameMatch = !storeName || restaurant.restaurantName.includes(storeName);
      const isstoreAddressMatch =
        !storeAddress || restaurant.restaurantAddress.includes(storeAddress);
      const isveganLevelMatch = !veganLevel || restaurant.restaurantVeganLevel === +veganLevel;

      return isstoreNameMatch && isstoreAddressMatch && isveganLevelMatch;
    });

    setFilteredData(convertData(filtered));
  };

  const clearFilter = () => {
    setFilterCriteria({
      storeName: '',
      storeAddress: '',
      veganLevel: '',
    });

    setFilteredData(convertData(restaurants));
  };

  return (
    <>
      <Heading display={'flex'} alignSelf={'flex-start'} color={'#323232'} mb={5}>
        식당 관리
      </Heading>
      {isLoading && <Skeleton mb={3} width={'1180px'} h={'72px'} borderRadius={'2xl'} />}
      {!isLoading && (
        <Flex
          mb={5}
          py={4}
          px={2}
          width={'1180px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          border={'none'}
        >
          {/* Filter Section */}
          <HStack gap={2} w={'900px'} justifyContent={'center'}>
            <Input
              w={'200px'}
              placeholder="식당 이름"
              value={filterCriteria.storeName}
              onChange={e =>
                setFilterCriteria(prevState => ({ ...prevState, storeName: e.target.value }))
              }
            />
            <Input
              w={'200px'}
              placeholder="식당 주소"
              value={filterCriteria.storeAddress}
              onChange={e =>
                setFilterCriteria(prevState => ({ ...prevState, storeAddress: e.target.value }))
              }
            />

            <Select
              w={'200px'}
              placeholder="비건레벨"
              value={filterCriteria.veganLevel}
              onChange={e =>
                setFilterCriteria(prevState => ({ ...prevState, veganLevel: e.target.value }))
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Select>
            <Button
              onClick={applyFilter}
              bg="green.300"
              color="white"
              _hover={{ bg: 'green.400' }}
              mr={2}
              w={'100px'}
            >
              적용
            </Button>
            <Button
              w={'100px'}
              bg="red.300"
              color={'white'}
              _hover={{ bg: 'red.400' }}
              onClick={clearFilter}
              colorScheme="gray"
            >
              취소
            </Button>
          </HStack>
          <Button
            mr={3}
            w={'140px'}
            color={'white'}
            bgColor={'blue.300'}
            _hover={{ bgColor: 'blue.400' }}
            onClick={() => navigator(`${ROUTES.RESTAURANT_REGISTRATION_RAW}/1`)}
          >
            식당등록 +
          </Button>
        </Flex>
      )}
      <Skeleton width={'1180px'} h={'680px'} isLoaded={!isLoading} borderRadius={'2xl'}>
        <Card borderRadius={'2xl'} shadow={'none'} bg={'white'} py={5} px={10}>
          {!isLoading && <DataTable columns={columns} data={filteredData}></DataTable>}
        </Card>
      </Skeleton>
    </>
  );
};

export default RegisterManagement;
