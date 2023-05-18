import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Button, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const submitLogin = () => {
    setIsAuthenticated(true);
    /**
     * 로그인 api에서 토큰 받아와서 localStorage에 저장해야함
     */
    Swal.fire({
      icon: 'success',
      title: '로그인 성공',
      text: '~님 반가워요',
    });
  };
  return (
    <>
      {isAuthenticated ? <Navigate to="/main" /> : null}
      <VStack>
        <Text>Login Page</Text>
        <Button onClick={submitLogin}>로그인 하기</Button>
      </VStack>
    </>
  );
};
export default LoginPage;
