import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Spacer, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const dropUser = () => {
    Swal.fire({
      icon: 'question',
      title: '정말 탈퇴하시겠습니까?',
      text: '탈퇴 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '회원 탈퇴 성공',
          text: '그동안 이용해 주셔서 감사합니다',
        }).then(res => {
          if (res.isConfirmed) {
            /**
             * 회원 삭제 쿼리 보내는곳
             */
            setIsAuthenticated(false);
            setUserStatus(null);
            navigate('/main');
          }
        });
      }
    });
  };

  return (
    <>
      <Text onClick={() => navigate(ROUTES.MYPAGE_HISTORY)}>히스토리</Text>
      <Text onClick={() => navigate(ROUTES.MYPAGE_BOOKMARK)}>즐겨찾기</Text>
      <Text onClick={() => navigate(ROUTES.MYPAGE_REVISE)}>정보수정</Text>
      <Spacer />
      <Text onClick={dropUser}>회원탈퇴</Text>
    </>
  );
};

export default Sidebar;
