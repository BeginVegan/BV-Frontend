import ControllBar from '@/components/Layout/ControllBar';
import { Divider, HStack, Spacer, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <HStack>
        <Text onClick={() => navigate('/')}>메인 헤더</Text>
        {children}
        <Spacer />
        <ControllBar />
      </HStack>
      <Divider />
    </>
  );
};
export default Header;
