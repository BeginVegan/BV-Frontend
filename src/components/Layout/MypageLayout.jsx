import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import SearchBar from '@/components/search/SearchBar';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { HStack, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MypageLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      Swal.fire({
        icon: 'error',
        title: '로그인이 필요합니다',
        text: '메인으로 이동합니다',
      });
      navigate('/main');
    }
  }, [isAuthenticated]);
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <HStack width={'100%'}>
        <VStack width={'30%'}>
          <Sidebar />
        </VStack>
        <VStack width={'100%'}>
          <Outlet />
        </VStack>
      </HStack>
      <Footer />
    </>
  );
};
export default MypageLayout;
