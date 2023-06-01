import SocialGoogle from '@/components/LoginAPIs/SocialGoogle';
import SocialKakao from '@/components/LoginAPIs/SocialKakao';
import { COLORS } from '@/constants/colors';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import { Box, Button, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

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
