import ReservationInfo from '@/pages/Admin/Reservation/ReservationInfo';
import { Flex, VStack, Card, CardBody, Spinner, Heading } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import React, { useEffect, useState } from 'react';
import LoadingPage from '@/pages/Loading/LoadingPage';

const getRandomDateTime = () => {
  const startDate = new Date(2023, 1, 1).getTime();
  const endDate = new Date(2023, 5, 13).getTime();
  const randomTime = Math.random() * (endDate - startDate) + startDate;
  const date = new Date(randomTime);
  const formattedDate = date.toISOString().split('T')[0]; // Extract date part in "YYYY-MM-DD" format
  const hours = date.getHours().toString().padStart(2, '0'); // Get hours with leading zeros
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes with leading zeros
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds with leading zeros
  const formattedTime = `${hours}:${minutes}:${seconds}`; // Format the time

  return `${formattedDate} ${formattedTime}`;
};

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
    // reservationList 존재하지 않으면 Loading 화면 렌더링 처리
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
