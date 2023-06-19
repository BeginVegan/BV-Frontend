import Header from '@/components/Layout/Header';
import SearchBar from '@/components/search/SearchBar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Layout/Footer';
import { Flex } from '@chakra-ui/react';

const DefaultLayout = ({ hasFooter }) => {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <Flex
        position={'relative'}
        minH={'calc(100vh - 73px)'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Outlet />
      </Flex>
      {hasFooter && <Footer />}
    </>
  );
};
export default DefaultLayout;
