import Footer from '@/components/Layout/Footer';
import MainHeader from './MainHeader';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Flex
        position={'relative'}
        minH={'calc(100vh - 235px)'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Outlet />
      </Flex>
      <Footer />
    </>
  );
};
export default MainLayout;
