import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';
import DataTable from '@/components/common/DataTable';
import { columns, restaurants } from '@/data/demmy';
import { Box, Button, Card, Flex, Heading, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import RestaurantService from '@/api/RestaurantService';

const RegisterMenagement = () => {
  const navigator = useNavigate();
  const { data: restaurants, isLoading } = useQuery(
    'getRestaurantList',
    RestaurantService.getRestaurantList
  );

  const data = useMemo(() => {
    if (isLoading) return;
    return restaurants.map(res => ({
      name: res.restaurantName,
      address: res.restaurantAddress,
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

  return (
    <Flex w={'100%'}>
      <Card shadow={'none'} bg={'white'} p={5}>
        <Flex w={'100%'} justifyContent={'flex-end'}>
          <Button
            w={'140px'}
            mr={6}
            color={'white'}
            bgColor={'green.300'}
            _hover={{ bgColor: 'green.400' }}
            onClick={() => navigator(`${ROUTES.RESTAURANT_REGISTRATION_RAW}/1`)}
          >
            식당등록
          </Button>
        </Flex>
        {!isLoading && <DataTable columns={columns} data={data}></DataTable>}
      </Card>
    </Flex>
  );
};

export default RegisterMenagement;
