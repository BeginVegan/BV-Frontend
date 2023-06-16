import Axios from '@/api/apiConfig';
import { ReactComponent as GoogleLoginButton } from '@/assets/socialLogins/googleLogin.svg';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const SocialGoogle = () => {
  /**
   * @description
   * 프론트에서도 직접 Oauth 이용해서 테스트 및 검증해보는 부분
   * 정상작동할때는 사용안함
   */
  // const CheckAuth = async accessToken => {
  //   await axios
  //     .get('https://www.googleapis.com/oauth2/v2/userinfo', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(res => {
  //       console.log('front !!!!', res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const googleOnSuccess = async data => {
    const access_token = data.access_token;
    // await CheckAuth(access_token);
    setToken(access_token);
  };
  const googleOnFailure = error => {
    console.log(error);
  };

  const checkBeforeLogin = () => {
    Swal.fire({
      icon: 'info',
      title: '로그인 공지',
      text: '최초 로그인 시 자동으로 회원가입이 이루어집니다.',
      confirmButtonText: '로그인',
      showCancelButton: true,
      cancelButtonText: '돌아가기',
    }).then(result => {
      if (result.isConfirmed) {
        login();
      }
    });
  };

  const login = useGoogleLogin({
    onSuccess: googleOnSuccess,
    onFailure: googleOnFailure,
  });

  useEffect(() => {
    const sendToken = async () => {
      const res = await Axios.post('member/login/google', {
        accessToken: token,
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
    if (token) {
      sendToken();
    }
  }, [token]);
  return (
    <>
      <GoogleLoginButton
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          cursor: 'pointer',
          transform: isActive ? 'translateY(-4px)' : null,
          boxShadow: isActive ? 'lg' : null,
        }}
        onClick={() => checkBeforeLogin()}
      />
    </>
  );
};

export default SocialGoogle;
