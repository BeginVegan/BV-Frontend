import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Flex
        position={'relative'}
        minH={'calc(100vh - 222px)'}
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
