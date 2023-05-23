import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
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

  useEffect(() => {
    setIsAuthenticated(true);
    if (location.state && location.state !== undefined && location.state !== null) {
      setIdToken(location.state.idToken);
    } else {
      userAccessToken();
    }
  }, []);
  console.log(idToken);

  return <>Auth Page 로그인시 로딩 대기 페이지 로그인 성공시 main으로 navigate</>;
};
export default AuthPage;
