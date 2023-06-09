import Axios from '@/api/apiConfig';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Image } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialKakao = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);

  const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const kakaoOnSuccess = async data => {
    const access_token = data.response.access_token;

    const res = await Axios.post('member/login/kakao', {
      accessToken: access_token,
    });

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: '반갑습니다',
      }).then(() => {
        setIsAuthenticated(true);
        setUserStatus({
          email: res.data.memberEmail,
          name: res.data.memberName,
          point: res.data.memberPoint,
          role: res.data.memberRole,
        });
        navigate(ROUTES.HOME);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '무슨일이지',
      });
    }
  };

  const kakaoOnFailure = error => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure}>
        <Image w={'20rem'} src="src/assets/socialLogins/kakao_medium.png" />
      </KakaoLogin>
    </>
  );
};

export default SocialKakao;
