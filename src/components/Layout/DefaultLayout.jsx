import { Outlet } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import Footer from './Footer';
import Header from './Header';

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
