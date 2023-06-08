import Axios from '@/api/apiConfig';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Button, Stack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ControllBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const navigate = useNavigate();

  const logout = async () => {
    const res = await Axios.get('member/logout');
    if (res.status === 200) {
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
      navigate(ROUTES.HOME);
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그아웃 실패',
        text: '무슨일이지',
      });
    }
  };

  const handleSessionTest = async () => {
    const res = await Axios.get('member/session');
    console.log(res);
  };
  return (
    <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
      {isAuthenticated ? (
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'red.400'}
          _hover={{
            bg: 'red.300',
          }}
          onClick={logout}
          cursor={'pointer'}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={() => navigate(ROUTES.LOGIN)}
            cursor={'pointer'}
          >
            로그인
          </Button>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            _hover={{
              bg: 'green.300',
            }}
            cursor={'pointer'}
          >
            회원가입
          </Button>
        </>
      )}
      {isAuthenticated ? (
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={600}
          _hover={{
            bg: 'gray.300',
          }}
          onClick={() => navigate(ROUTES.MYPAGE_HOME)}
          cursor={'pointer'}
        >
          마이페이지
        </Button>
      ) : null}
      {isAuthenticated && userStatus && userStatus.status === 'admin' && (
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={600}
          _hover={{
            bg: 'gray.300',
          }}
          onClick={() => navigate(ROUTES.ADMIN)}
          cursor={'pointer'}
        >
          관리페이지
        </Button>
      )}
      <Button onClick={() => handleSessionTest()}>세션 테스트버튼</Button>
    </Stack>
  );
};

export default ControllBar;
