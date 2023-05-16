import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <>
      {isAuthenticated ? <Navigate to="/main" /> : null}
      Login Page
      <br />
      <Button onClick={() => setIsAuthenticated(true)}>로그인 버튼</Button>
    </>
  );
};
export default LoginPage;
