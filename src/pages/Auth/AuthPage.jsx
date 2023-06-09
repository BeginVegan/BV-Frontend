import Axios from '@/api/apiConfig';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

/**
 * @description
 * 여기서 백엔드 엔드포인트로 토큰 전달
 */
const AuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [idToken, setIdToken] = useState(null);
  const location = useLocation();

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    setIdToken(token);
    //  로컬 스토리지가 필요할 경우
    // localStorage.setItem('access_token', token)
  };
  const sendTokenKaKao = async () => {
    const res = axios.post(
      'https://begin-vegan-backend.kro.kr:3000/member/login/kakao',
      {
        accessToken: idToken,
      },
      {
        headers: {
          // 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // const res = await fetch('https://begin-vegan-backend.kro.kr:3000/member/login/kakao', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    //   body: {
    //     accessToken: idToken,
    //   },
    // });
    if (res.status === 200) {
      console.log('카카오 login 성공');
    } else {
      console.log('카카오 login 에러');
    }
  };

  const sendTokenGoogle = async () => {
    const res = Axios.post('/member/login/google', {
      googleCredential: idToken,
    });
    if ((await res).status === 200) {
      console.log('구글 login 성공');
    } else {
      console.log('구글 login 에러');
    }
  };
  useEffect(() => {
    //카카오
    if (location.state && location.state !== undefined && location.state !== null) {
      setIdToken(location.state.idToken);

      sendTokenKaKao();
    } else {
      userAccessToken();
      sendTokenGoogle();
    }
  }, []);

  return <>Auth Page 로그인시 로딩 대기 페이지 로그인 성공시 main으로 navigate</>;
};
export default AuthPage;
