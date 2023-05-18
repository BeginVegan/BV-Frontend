import { Text, VStack } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

const MyPageSidebar = () => {
  const navigate = useNavigate();
  return (
    <VStack
      height={'100%'}
      width={'20%'}
      alignItems={'flex-start'}
      paddingLeft={'2%'}
      paddingTop={'2%'}
    >
      <Text onClick={() => navigate('/mypage/bookmark')}>즐겨찾기</Text>
      <NavLink to="/mypage/bookmark">즐겨찾기</NavLink>
      <Text>히스토리</Text>
      <Text>정보수정</Text>
      <Text>회원탈퇴</Text>
    </VStack>
  );
};
export default MyPageSidebar;
