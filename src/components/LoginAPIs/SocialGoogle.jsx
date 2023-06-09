import Axios from '@/api/apiConfig';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Image } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
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
  const CheckAuth = async accessToken => {
    await axios
      .get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log('front !!!!', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);

  const googleOnSuccess = async data => {
    const access_token = data.access_token;
    // await CheckAuth(access_token);
    setToken(access_token);
  };
  const googleOnFailure = error => {
    console.log(error);
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
    if (token) {
      sendToken();
    }
  }, [token]);
  return (
    <>
      <Image
        w={'14.3rem'}
        src="src/assets/socialLogins/google_medium.png"
        onClick={() => login()}
      />
    </>
  );
};

export default SocialGoogle;
