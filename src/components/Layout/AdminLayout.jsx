import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { ROUTES } from '@/routes/ROUTES';
import { Box, Flex, Icon, Link, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { FiHome, FiTrendingUp, FiUser } from 'react-icons/fi';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

const LinkItems = [
  { name: '회원 관리', icon: FiUser, href: `${ROUTES.ADMIN_RAW}/user` },
  { name: '예약 관리', icon: FiTrendingUp, href: `${ROUTES.ADMIN_RAW}/reservation` },
  { name: '식당 관리', icon: FiHome, href: `${ROUTES.ADMIN_RAW}/restaurant` },
];

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header />
      <Flex
        position={'relative'}
        minH={'calc(100vh - 60px)'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex w={'100%'} flexGrow={1} justifyContent={'flex-start'}>
          <SidebarContent
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
          />
          <Flex boxShadow={'rgba(0, 0, 0, 0.35) 8px 0 10px -6px inset'} w={'100%'} bg="#f8f8ff">
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default AdminLayout;

const SidebarContent = ({ isOpen, onClose, onOpen, ...rest }) => {
  const widthPx = isOpen ? '230px' : '100px';
  return (
    <Flex direction={'column'} bg={'white'} minW={widthPx} maxW={widthPx} {...rest}>
      <Box w={widthPx} position={'fixed'}>
        <Flex h="20" alignItems="center" mx="8" justifyContent={isOpen ? 'flex-end' : 'center'}>
          {isOpen ? (
            <RiMenuFoldLine size={18} cursor={'pointer'} onClick={onClose} />
          ) : (
            <RiMenuUnfoldLine size={18} cursor={'pointer'} onClick={onOpen} />
          )}
        </Flex>
        {LinkItems.map(link => (
          <NavItem isOpen={isOpen} key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Flex>
  );
};

const NavItem = ({ isOpen, icon, children, href, ...rest }) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        w={isOpen && '200px'}
        justifyContent={!isOpen && 'center'}
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={'black'}
        _hover={{
          bg: 'green.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={isOpen && '4'}
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {isOpen && children}
      </Flex>
    </Link>
  );
};