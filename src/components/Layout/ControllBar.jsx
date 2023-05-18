import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Button, HStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ControllBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const navigate = useNavigate();
  // console.log('ControllBar', isAuthenticated);
  // console.log(userStatus);
  const logout = () => {
    setIsAuthenticated(false);
    setUserStatus(null);
    /**
     * localStorage에서 토큰정보 삭제 해야함
     */
    Swal.fire({
      icon: 'success',
      title: '로그아웃 성공',
      text: '메인으로 돌아갑니다',
    });
    navigate('/main');
  };
  return (
    <>
      <HStack>
        {isAuthenticated && userStatus && userStatus.status === 'admin' ? (
          <Button onClick={() => navigate('/admin')}>관리페이지</Button>
        ) : null}
        {isAuthenticated ? (
          <Button onClick={logout}>로그아웃</Button>
        ) : (
          <Button onClick={() => navigate('/login')}>로그인</Button>
        )}
        {isAuthenticated ? <Button onClick={() => navigate('/mypage')}>마이페이지</Button> : null}
      </HStack>
    </>
  );
};

export default ControllBar;
