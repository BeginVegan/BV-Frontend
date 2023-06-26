import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ReservationManagementPage from '@/pages/Admin/Reservation/ReservationManagementPage';
import RegisterManagement from '@/pages/Admin/Register/RegisterManagement';
import MemberManagementPage from '@/pages/Admin/Member/MemberManagement';

const categoryDetail = {
  user: {
    title: '회원',
    outlet: <MemberManagementPage />,
  },
  reservation: {
    title: '예약',
    outlet: <ReservationManagementPage />,
  },
  restaurant: {
    title: '식당',
    outlet: <RegisterManagement />,
  },
};

const AdminPage = () => {
  const { category } = useParams();

  return (
    <Flex m={'auto'} p={5} h={'100%'} alignItems={'center'} direction={'column'}>
      {categoryDetail[category].outlet}
    </Flex>
  );
};

export default AdminPage;
