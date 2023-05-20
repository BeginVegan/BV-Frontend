import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const location = useLocation();
  const idToken = location.state.idToken;
  useEffect(() => {
    setIsAuthenticated(true);
  }, []);
  console.log(idToken);
  return <>Auth Page 로그인시 로딩 대기 페이지 로그인 성공시 main으로 navigate</>;
};
export default AuthPage;
