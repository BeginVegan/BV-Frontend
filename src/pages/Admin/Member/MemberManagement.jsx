import ReservationInfo from '@/pages/Admin/Reservation/ReservationInfo';
import { Flex, VStack, Card, CardBody, Spinner } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import React, { useEffect, useState } from 'react';
import { generateDummyData } from '@/pages/Admin/Reservation/DummyData';

const MemberManagement = () => {
  const [reservationList, setReservationList] = useState(null);

  useEffect(() => {
    const getReservations = async () => {
      const res = await Axios.get('reservation/list');
      if (res.status === 200) {
        //setReservationList(res.data);
        setReservationList(generateDummyData);
      }
    };
    getReservations();
  }, []);

  if (!reservationList) {
    return (
      <Flex w={1288} h={1000} justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex w={'100%'}>
      <Card bg="#f8f8ff" boxShadow={'none'}>
        <CardBody p={0}>
          <VStack>
            <ReservationInfo data={reservationList}></ReservationInfo>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default MemberManagement;
