import Footer from '@/components/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar';
import SearchBar from '@/components/search/SearchBar';
import { HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import FixedHeader from '@/components/Layout/FixedHeader';

const MypageLayout = () => {
  return (
    <>
      <FixedHeader>
        <SearchBar />
      </FixedHeader>
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
