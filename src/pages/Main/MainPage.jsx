import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';

const MainPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <>
      {isAuthenticated ? null : <Navigate to="/login" />}
      Main Page
      <br />
      <Button onClick={() => setIsAuthenticated(false)}>로그아웃 버튼</Button>
    </>
  );
};
export default MainPage;
