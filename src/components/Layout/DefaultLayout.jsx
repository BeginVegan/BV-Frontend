import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import SearchBar from '@/components/search/SearchBar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};
export default DefaultLayout;
