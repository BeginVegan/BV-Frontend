import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Swal from 'sweetalert2';
import BookmarkPage from './BookmarkPage';
import HistoryPage from './HistoryPage';
import ReviseInfoPage from './ReviseInfoPage';

const MyPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      Swal.fire({
        icon: 'error',
        title: '로그인이 필요합니다',
        text: '메인으로 이동합니다',
      });
      navigate('/main');
    }
  }, [isAuthenticated]);
  return (
    <>
      <Tabs>
        <Flex width={'100%'} height={'50rem'}>
          <HStack width={'100%'}>
            <VStack
              height={'100%'}
              width={'20%'}
              alignItems={'flex-start'}
              paddingLeft={'2%'}
              paddingTop={'2%'}
            >
              <TabList>
                <Tab>히스토리</Tab>
                <Tab>즐겨찾기</Tab>
                <Tab>정보수정</Tab>
              </TabList>
              <Spacer />
              <Text>회원탈퇴</Text>
            </VStack>
            <VStack width={'100%'} height={'100%'} justifyItems={'flex-start'} paddingTop={'5%'}>
              <TabPanel>
                <HistoryPage />
              </TabPanel>
              <TabPanel>
                <BookmarkPage />
              </TabPanel>
              <TabPanel>
                <ReviseInfoPage />
              </TabPanel>
            </VStack>
          </HStack>
        </Flex>
      </Tabs>
    </>
  );
};
export default MyPage;

// <Flex width={'100%'} height={'50rem'}>
//         <HStack width={'100%'}>
//           <MyPageSidebar />
//         </HStack>
//       </Flex>
