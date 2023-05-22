import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Outlet } from 'react-router-dom;
import { Box } from '@chakra-ui/react';

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
