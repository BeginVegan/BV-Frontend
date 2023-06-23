import ReservationInfo from '@/pages/Admin/Reservation/ReservationInfo';
import { VStack, Card, CardBody, Heading, Skeleton, HStack } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import React, { useEffect, useState } from 'react';
import { generateDummyData } from '@/pages/Admin/Reservation/DummyData';

const ReservationManagementPage = () => {
  const [reservationList, setReservationList] = useState(null);

  useEffect(() => {
    const getReservations = async () => {
      const res = await Axios.get('reservation/list');
      if (res.status === 200) {
        setReservationList(res.data.concat(generateDummyData()));
      }
    };
    getReservations();
  }, []);

  return (
    <>
      <Heading display={'flex'} alignSelf={'flex-start'} color={'#323232'} mb={5}>
        예약 관리
      </Heading>
      <Card bg="gray.100" boxShadow={'none'}>
        {!reservationList && (
          <VStack gap={1}>
            <Skeleton borderRadius={'lg'} w={'1280px'} height={'80px'} />
            <HStack>
              <Skeleton borderRadius={'lg'} w={'742px'} height={'515px'} />
              <Skeleton borderRadius={'lg'} w={'526px'} height={'520px'} />
            </HStack>
            <Skeleton borderRadius={'lg'} w={'1280px'} height={'895px'} />
          </VStack>
        )}
        <CardBody p={0}>
          <VStack>
            {reservationList && <ReservationInfo data={reservationList}></ReservationInfo>}
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default ReservationManagementPage;
