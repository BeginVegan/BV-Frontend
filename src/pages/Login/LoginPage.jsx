import Axios from '@/api/apiConfig';
import SocialGoogle from '@/components/LoginAPIs/SocialGoogle';
import SocialKakao from '@/components/LoginAPIs/SocialKakao';
import { COLORS } from '@/constants/colors';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Box, Button, Flex, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const emailIputRef = useRef(null);
  const navigate = useNavigate();
  const submitLogin = async userType => {
    if (emailIputRef === null || emailIputRef.current.value === '') {
      Swal.fire({
        icon: 'question',
        title: '이메일을 입력하세요',
        text: '세션에 저장될 이메일',
      });
      return;
    }

    console.log(emailIputRef.current.value);

    /**
     * 로그인 api에서 토큰 받아와서 localStorage에 저장해야함
     */
    const res = await Axios.post('member/login/test', {
      email: emailIputRef.current.value,
      accessToken: 'test123',
    });
    console.log(res);
    if (res.status === 200) {
      if (userType === 'admin') {
        setUserStatus({
          id: 0,
          login: emailIputRef.current.value,
          name: '관리자',
          status: 'admin',
        });
      } else {
        setUserStatus({
          id: 0,
          login: emailIputRef.current.value,
          name: '일반유저',
          status: 'normal',
        });
      }
      setIsAuthenticated(true);
    }
  };
  useEffect(() => {
    if (userStatus && userStatus.name) {
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: userStatus && userStatus.name ? `${userStatus.login.split('@')[0]}님 반가워요` : null,
      });
      navigate('/main');
    }
  }, [userStatus]);

  return (
    <>
      <Flex
        minH={'10vh'}
        align={'center'}
        justify={'center'}
        borderRadius={'10px'}
        bg={COLORS.GREEN100}
        shadow={'md'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>로그인</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              소셜 로그인을 이용해 주세요
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={'green.200'} boxShadow={'2xl'} p={8}>
            <VStack>
              <SocialKakao />
              <SocialGoogle />
              <br />
              <Input bgColor={'white'} ref={emailIputRef} />
              <Button onClick={() => submitLogin('normal')}>일반 로그인</Button>
              <Button onClick={() => submitLogin('admin')}>관리자 로그인</Button>
            </VStack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default LoginPage;
