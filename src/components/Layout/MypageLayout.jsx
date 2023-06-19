import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import SearchBar from '@/components/search/SearchBar';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { HStack, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Outlet, useNavigate } from 'react-router-dom';

const MypageLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);

  const navigate = useNavigate();


  // useEffect(() => {
  //   if (isAuthenticated !== true) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: '로그인이 필요합니다',
  //       text: '메인으로 이동합니다',
  //     });
  //     navigate(ROUTES.HOME);
  //   }
  // }, [isAuthenticated]);

  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <HStack width={'100%'} height={'100%'}>
        <VStack height={'100vh'} align={'start'}>
          <Sidebar />
        </VStack>
        <VStack width={'100%'} height={'100%'} zIndex={0} alignContent={'start'}>
          <Outlet />
        </VStack>
      </HStack>
      <Footer />
    </>
  );
};
export default MypageLayout;
