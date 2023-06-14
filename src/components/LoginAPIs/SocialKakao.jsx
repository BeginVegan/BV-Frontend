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
      <KakaoLogin 
      style={{width:"100%", height:"100%"}}
      token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure}>
      <KakaoLoginButton
       onMouseDown={handleMouseDown} 
       onMouseUp={handleMouseUp} 
       style={{cursor: 'pointer', 
       transform: isActive ? 'translateY(-4px)' : null, 
       boxShadow: isActive ? 'lg' : null}} 
      />
      </KakaoLogin>
    </>
  );
};

export default SocialKakao;
