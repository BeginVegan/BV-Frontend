import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationManagementPage from '@/pages/Admin/Reservation/ReservationManagementPage';
import RegisterManagement from '@/pages/Admin/Register/RegisterManagement';
import MemberManagementPage from '@/pages/Admin/Member/MemberManagement';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { ROUTES } from '@/routes/ROUTES';
import { useAtom } from 'jotai';
import Swal from 'sweetalert2';
import { userAtom } from '@/utils/atoms/userAtom';

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
