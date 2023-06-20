import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import SearchBar from '@/components/search/SearchBar';
import { HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MypageLayout = () => {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <HStack width={'100%'} height={'100%'}>
        <VStack height={'100vh'} align={'start'}>
          <Sidebar />
        </VStack>
        <VStack width={'100%'} height={'100%'} zIndex={0} alignContent={'start'}>
          <Outlet />
        </VStack>
      </HStack>
      <Footer />
    </>
  );
};
export default MypageLayout;
