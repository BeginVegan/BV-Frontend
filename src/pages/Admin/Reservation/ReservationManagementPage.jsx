import ReservationInfo from '@/pages/Admin/Reservation/ReservationInfo';
import { VStack, Card, CardBody, Heading } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import React, { useEffect, useState } from 'react';
import LoadingPage from '@/pages/Loading/LoadingPage';
import { generateDummyData } from '@/pages/Admin/Reservation/DummyData';

const ReservationManagementPage = () => {
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
    return <LoadingPage />;
  }

  return (
    <>
      <Heading display={'flex'} alignSelf={'flex-start'} color={'#323232'} mb={5}>
        예약 관리
      </Heading>
      <Card bg="#f8f8ff" boxShadow={'none'}>
        <CardBody p={0}>
          <VStack>
            <ReservationInfo data={reservationList}></ReservationInfo>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default ReservationManagementPage;
