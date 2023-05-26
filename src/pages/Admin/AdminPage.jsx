import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';
import DataTable from '@/components/common/DataTable';
import { columns, restaurants } from '@/data/demmy';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react';

const AdminPage = () => {
  const navigator = useNavigate();

  const data = useMemo(
    () =>
      restaurants.map(res => ({
        name: res.restaurant_name,
        address: res.restaurant_address,
        hours: res.restaurant_open + ' - ' + res.restaurant_close,
        detail:
          res.restaurant_detail.length > 10
            ? res.restaurant_detail.slice(0, 10) + '...'
            : res.restaurant_detail,
        table: res.restaurant_table + '/' + `${res.restaurant_table * res.restaurant_table_member}`,
        veganlevel: res.restaurant_vegan_level,
        star: res.restaurant_star,
      })),
    []
  );

  return (
    <VStack py={8}>
      <Flex pb={8} w={'65vw'} justifyContent={'space-between'}>
        <Heading>식당 관리 페이지</Heading>
        <Button
          w={'140px'}
          color={'white'}
          bgColor={'green.300'}
          _hover={{ bgColor: 'green.400' }}
          onClick={() => navigator(ROUTES.RESTAURANT_REGISTRATION)}
        >
          식당등록
        </Button>
      </Flex>
      <DataTable columns={columns} data={data}></DataTable>
    </VStack>
  );
};

export default AdminPage;
