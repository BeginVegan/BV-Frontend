import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const ControllBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();
  console.log('ControllBar', isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <Button onClick={() => setIsAuthenticated(false)}>로그아웃</Button>
      ) : (
        <Button onClick={() => navigate('/login')}>로그인</Button>
      )}
    </>
  );
};

export default ControllBar;
