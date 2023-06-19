import Axios from '@/api/apiConfig';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ControllBarContent({
  isUserMenuOpen,
  navigate,
  logout,
  setIsUserMenuOpen,
}) {
  
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  return (
    <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
      {isAuthenticated && userStatus && (
        <HStack
          width={'144px'}
          spacing={{ base: '0', md: '6' }}
          onClick={() => setIsUserMenuOpen(p => !p)}
        >
          <Flex>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack gap={2}>
                  <Avatar size={'sm'} bg="teal.500" />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm" fontWeight={600}>
                      {userStatus.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {userStatus.role}
                    </Text>
                  </VStack>
                  {!isUserMenuOpen ? <RiArrowDownSLine size={24} /> : <RiArrowUpSLine size={24} />}
                </HStack>
              </MenuButton>
              <MenuList
                display={'flex'}
                flexDirection={'column'}
                zIndex={100}
                minW={'150px'}
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                {userStatus && userStatus.role === 'admin' && (
                  <MenuItem onClick={() => navigate(ROUTES.ADMIN_RAW)}>관리페이지</MenuItem>
                )}
                {userStatus && userStatus.role === 'normal' && (
                  <MenuItem onClick={() => navigate(ROUTES.MYPAGE_HOME)}>마이페이지</MenuItem>
                )}
                <MenuItem onClick={() => navigate(ROUTES.MYPAGE_HISTORY)}>히스토리</MenuItem>
                <MenuItem onClick={() => navigate(ROUTES.MYPAGE_BOOKMARK)}>즐겨찾기</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      )}
      {!isAuthenticated && (
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.400'}
          onClick={() => navigate(ROUTES.LOGIN)}
          _hover={{
            bg: 'green.300',
          }}
          cursor={'pointer'}
        >
          로그인
        </Button>
      )}
    </Stack>
  );
}

const ControllBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // isAuthenticated 값을 불러오는게 조금 느려서 임의로 지연시킴
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const logout = async () => {
    const res = await Axios.get('member/logout');
    if (res.status === 200) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userStatus');  
      setIsAuthenticated(false);
      setUserStatus(null);
      Swal.fire({
        icon: 'success',
        title: '로그아웃 성공',
        text: '메인으로 돌아갑니다',
      });
      navigate(ROUTES.HOME);
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그아웃 실패',
        text: '무슨일이지',
      });
    }
  };

  return (
    <>
      {!isLoading && (
        <ControllBarContent
          isUserMenuOpen={isUserMenuOpen}
          navigate={navigate}
          logout={logout}
          setIsUserMenuOpen={setIsUserMenuOpen}
        />
      )}
    </>
  );
};

export default ControllBar;
