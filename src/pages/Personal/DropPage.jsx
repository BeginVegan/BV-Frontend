import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DropPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);

  const dropUser = () => {
    Swal.fire({
      icon: 'question',
      title: '정말 탈퇴하시겠습니까?',
      text: '탈퇴 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(async res => {
      if (res.isConfirmed) {
        const result = await Axios.delete('member')
        if (result.status === 200 ) {
          Swal.fire({
            icon: 'success',
            title: '회원 탈퇴 성공',
            text: '그동안 이용해 주셔서 감사합니다',
          }).then(res => {
            if (res.isConfirmed) {
              setIsAuthenticated(false);
              setUserStatus(null);
              navigate(ROUTES.HOME);
            }
          });
        }
        else {
          Swal.fire({
            icon:'error',
            title:'회원 탈퇴 실패',
            text: '다시 시도해 주세요'
          })
        }
      }
    });
  };
  return (
    <>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="green.500"
        onClick={dropUser}
        _hover={{ bgColor: 'red', color: 'white', border: 'none' }}
      >
        회원탈퇴
      </Button>
    </>
  );
};
export default DropPage;
