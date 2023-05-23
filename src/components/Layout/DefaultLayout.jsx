import Header from '@/components/Layout/Header';
import SearchBar from '@/components/search/SearchBar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = ({ hasFooter }) => {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <Outlet />
      {hasFooter && <Footer />}
    </>
  );
};
export default DefaultLayout;
