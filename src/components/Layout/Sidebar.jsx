import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Spacer, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  // const [whereAmI, setWhereAmI] = useState('main');
  const _hereIAm = useLocation();
  const hereIAm = _hereIAm.pathname.split('/')[2];

  console.log('here', hereIAm);
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
            navigate(ROUTES.HOME);
          }
        });
      }
    });
  };

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      spacing={'1rem'}
      borderRight={'1px'}
      borderColor={'gray.300'}
      paddingTop={'3rem'}
      paddingBottom={'3rem'}
    >
      <Text
        fontSize={hereIAm === 'history' ? '2xl' : 'xl'}
        as={hereIAm === 'history' ? 'u' : null}
        onClick={() => navigate(ROUTES.MYPAGE_HISTORY)}
      >
        히스토리
      </Text>
      <Text
        fontSize={hereIAm === 'bookmark' ? '2xl' : 'xl'}
        as={hereIAm === 'bookmark' ? 'u' : null}
        onClick={() => navigate(ROUTES.MYPAGE_BOOKMARK)}
      >
        즐겨찾기
      </Text>
      <Text
        fontSize={hereIAm === 'revise' ? '2xl' : 'xl'}
        as={hereIAm === 'revise' ? 'u' : null}
        onClick={() => navigate(ROUTES.MYPAGE_REVISE)}
      >
        정보수정
      </Text>
      <Spacer />
      <Text fontSize={'xl'} onClick={dropUser}>
        회원탈퇴
      </Text>
    </VStack>
  );
};

export default Sidebar;
