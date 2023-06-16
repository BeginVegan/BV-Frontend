import Axios from '@/api/apiConfig';
import { ReactComponent as KakaoLoginButton } from '@/assets/socialLogins/kakaoLogin.svg';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const SocialKakao = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const kakaoOnSuccess = async data => {
    const access_token = data.response.access_token;

    const res = await Axios.post('member/login/kakao', {
      accessToken: access_token,
    });

    if (res.status === 200) {
      navigate(ROUTES.HOME);
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

  const checkBeforeLogin = onClick => {
    Swal.fire({
      icon: 'info',
      title: '로그인 공지',
      text: '최초 로그인 시 자동으로 회원가입이 이루어집니다.',
      confirmButtonText: '로그인',
      showCancelButton: true,
      cancelButtonText: '돌아가기',
    }).then(result => {
      if (result.isConfirmed) {
        // console.log(onClick);
        // console.log(window);
        // console.log(window.kakao);
        onClick();
      }
    });
  };

  return (
    <>
      <KakaoLogin
        style={{ width: '100%', height: '100%' }}
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        render={({ onClick }) => (
          <KakaoLoginButton
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={e => {
              e.preventDefault();
              // onClick();
              checkBeforeLogin(onClick);
            }}
            style={{
              cursor: 'pointer',
              transform: isActive ? 'translateY(-4px)' : null,
              boxShadow: isActive ? 'lg' : null,
            }}
          />
        )}
      ></KakaoLogin>
    </>
  );
};

export default SocialKakao;
