import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';
import DataTable from '@/components/common/DataTable';
import { Box, Button, Card, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import RestaurantService from '@/api/RestaurantService';
import LoadingPage from '@/pages/Loading/LoadingPage';
// import CustomModal from '@/components/common/CustomModal';
import RegisterMenu from './RegisterMenu';

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
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: restaurants, isLoading } = useQuery(
    'getRestaurantList',
    RestaurantService.getRestaurantList
  );

  const data = useMemo(() => {
    if (isLoading) return;
    return restaurants.map(res => ({
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
  }, [isLoading]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Heading display={'flex'} alignSelf={'flex-start'} color={'#323232'} mb={5}>
        식당 관리
      </Heading>
      <Card borderRadius={'2xl'} shadow={'none'} bg={'white'} py={5} px={10}>
        <Flex w={'100%'} justifyContent={'flex-end'}>
          {/* <CustomModal title={'메뉴 수정'} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <RegisterMenu restaurantno={1} />
          </CustomModal>
          <Button mt={4} onClick={onOpen}>
            메뉴 수정
          </Button> */}
          <Button
            w={'140px'}
            mb={5}
            color={'white'}
            bgColor={'green.300'}
            _hover={{ bgColor: 'green.400' }}
            onClick={() => navigator(`${ROUTES.RESTAURANT_REGISTRATION_RAW}/1`)}
          >
            식당등록
          </Button>
        </Flex>
        <DataTable columns={columns} data={data}></DataTable>
      </Card>
    </>
  );
};

export default RegisterManagement;
