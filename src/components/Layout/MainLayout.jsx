import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box minH={'78vh'}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
export default MainLayout;
