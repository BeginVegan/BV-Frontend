import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { userAtom } from '@/utils/atoms/userAtom';
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
  const [userStatus, setUserStatus] = useAtom(userAtom);
  // console.log(userStatus);
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

  const dropUser = () => {
    Swal.fire({
      icon: 'question',
      title: '정말 탈퇴하시겠습니까?',
      text: '탈퇴 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '회원 탈퇴 성공',
          text: '그동안 이용해 주셔서 감사합니다',
        }).then(res => {
          if (res.isConfirmed) {
            /**
             * 회원 삭제 쿼리 보내는곳
             */
            setIsAuthenticated(false);
            setUserStatus(null);
            navigate('/main');
          }
        });
      }
    });
  };
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
              <Text onClick={dropUser}>회원탈퇴</Text>
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
