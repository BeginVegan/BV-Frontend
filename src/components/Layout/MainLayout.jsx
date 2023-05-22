import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default MainLayout;
