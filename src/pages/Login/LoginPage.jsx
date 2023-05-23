import SocialGoogle from '@/components/LoginAPIs/SocialGoogle';
import SocialKakao from '@/components/LoginAPIs/SocialKakao';
import SocialNaver from '@/components/LoginAPIs/SocialNaver';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Button, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const submitLogin = userType => {
    setIsAuthenticated(true);
    if (userType === 'admin') {
      setUserStatus({
        id: 0,
        login: 'test',
        name: '관리자',
        status: 'admin',
      });
    } else {
      setUserStatus({
        id: 0,
        login: 'test',
        name: '일반유저',
        status: 'normal',
      });
    }
    /**
     * 로그인 api에서 토큰 받아와서 localStorage에 저장해야함
     */
  };
  useEffect(() => {
    if (userStatus && userStatus.name) {
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: userStatus && userStatus.name ? `${userStatus.name}님 반가워요` : null,
      });
    }
  }, [userStatus]);

  return (
    <>
      {isAuthenticated ? <Navigate to={ROUTES.MAIN} /> : null}
      <VStack>
        <Text>Login Page</Text>
        <SocialKakao />
        <SocialGoogle />
        <SocialNaver />
        <Button onClick={() => submitLogin('normal')}>일반 로그인</Button>
        <Button onClick={() => submitLogin('admin')}>관리자 로그인</Button>
      </VStack>
    </>
  );
};
export default LoginPage;
