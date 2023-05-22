import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

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
