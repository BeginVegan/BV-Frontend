import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Button, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <>
      {isAuthenticated ? <Navigate to="/main" /> : null}
      <VStack>
        <Text>Login Page</Text>
        <Button onClick={() => setIsAuthenticated(true)}>로그인 하기</Button>
      </VStack>
    </>
  );
};
export default LoginPage;
