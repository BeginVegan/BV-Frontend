import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import RegisterMenagement from './Register/RegisterMenagement';
import ReservationManagementPage from './Reservation/ReservationManagementPage';
import { useParams } from 'react-router-dom';

const categoryDetail = {
  user: {
    title: '회원',
    outlet: <div></div>,
  },
  reservation: {
    title: '예약',
    outlet: <ReservationManagementPage />,
  },
  restaurant: {
    title: '식당',
    outlet: <RegisterMenagement />,
  },
};

const AdminPage = () => {
  const { category } = useParams();

  return (
    <Flex m={'auto'} p={5} direction={'column'}>
      <Heading color={'#323232'} mb={5}>
        {`${categoryDetail[category].title} 관리`}
      </Heading>
      {categoryDetail[category].outlet}
    </Flex>
  );
};

export default AdminPage;
