import { ROUTES } from '@/routes/ROUTES';
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
import { FiCompass, FiHome, FiMenu, FiTrendingUp } from 'react-icons/fi';
import { TiWarningOutline } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
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
        <NavItem
          key={link.name}
          onClick={() => {
            console.log('clicked');
          }}
          icon={link.icon}
          route={link.route}
          onClose={onClose}
        >
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

  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'green',
        color: 'white',
      }}
      marginBottom={'1rem'}
      bg={hereIAm === route.split('/')[2] ? 'green' : null}
      color={hereIAm === route.split('/')[2] ? 'white' : 'black'}
      {...rest}
      onClick={() => {
        navigate(route);
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
