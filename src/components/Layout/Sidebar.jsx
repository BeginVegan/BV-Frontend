import { COLORS } from '@/constants/colors';
import { ROUTES } from '@/routes/ROUTES';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { FiCompass, FiHome, FiMenu, FiTrendingUp } from 'react-icons/fi';
import { TiWarningOutline } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const LinkItems = [
  { name: '메인', icon: FiHome, route: ROUTES.MYPAGE_MAIN },
  { name: '히스토리', icon: FiTrendingUp, route: ROUTES.MYPAGE_HISTORY },
  { name: '즐겨찾기', icon: FiCompass, route: ROUTES.MYPAGE_BOOKMARK },
  { name: '회원탈퇴', icon: TiWarningOutline, route: ROUTES.MYPAGE_DROP },
];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH={'100%'} bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      h="100%"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={() => {
            onClose();
          }}
        />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} route={link.route} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, route, onClose, children, ...rest }) => {
  const navigate = useNavigate();
  const _hereIAm = useLocation();
  const hereIAm = _hereIAm.pathname.split('/')[2];
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userStatus, setUserStatus] = useAtom(userAtom);

  const dropUser = () => {
    Swal.fire({
      icon: 'question',
      title: '정말 탈퇴하시겠습니까?',
      text: '탈퇴 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(async res => {
      if (res.isConfirmed) {
        const result = await Axios.delete('member')
        if (result.status === 200 ) {
          Swal.fire({
            icon: 'success',
            title: '회원 탈퇴 성공',
            text: '그동안 이용해 주셔서 감사합니다',
          }).then(res => {
            if (res.isConfirmed) {
              setIsAuthenticated(false);
              setUserStatus(null);
              navigate(ROUTES.HOME);
            }
          });
        }
        else {
          Swal.fire({
            icon:'error',
            title:'회원 탈퇴 실패',
            text: '다시 시도해 주세요'
          })
        }
      }
    });
  };
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: COLORS.GREEN200,
        color: 'black',
      }}
      marginBottom={'1rem'}
      bg={hereIAm === route.split('/')[2] ? 'green' : null}
      color={hereIAm === route.split('/')[2] ? 'white' : 'black'}
      {...rest}
      onClick={() => { route === ROUTES.MYPAGE_DROP ? dropUser(): navigate(route);
        onClose();
      }}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
    </Flex>
  );
};
