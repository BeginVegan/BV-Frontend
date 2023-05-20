import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Button, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialKakao from './LoginAPIs/KakaoLogin';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const submitLogin = userType => {
    setIsAuthenticated(true);
    if (userType === 'admin') {
      setUserStatus({
        id: 0,
        login: 'test',
        name: '관리자',
        status: 'admin',
      });
    } else {
      setUserStatus({
        id: 0,
        login: 'test',
        name: '일반유저',
        status: 'normal',
      });
    }
    /**
     * 로그인 api에서 토큰 받아와서 localStorage에 저장해야함
     */
  };
  useEffect(() => {
    if (userStatus && userStatus.name) {
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: userStatus && userStatus.name ? `${userStatus.name}님 반가워요` : null,
      });
    }
  }, [userStatus]);

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; //REST API KEY
  const redirect_uri = 'http://localhost:5173/auth'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      {isAuthenticated ? <Navigate to="/main" /> : null}
      <VStack>
        <Text>Login Page</Text>
        {/* <Button onClick={handleLogin}>카카오 로그인</Button> */}
        {/* <KakaoLogin /> */}
        <SocialKakao />
        <Button onClick={() => submitLogin('normal')}>일반 로그인</Button>
        <Button onClick={() => submitLogin('admin')}>관리자 로그인</Button>
      </VStack>
    </>
  );
};
export default LoginPage;
