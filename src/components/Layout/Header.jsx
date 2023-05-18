import { Divider, HStack, Spacer, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ControllBar from './ControllBar';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <HStack>
        <Text onClick={() => navigate('/')}>헤더입니다</Text>
        <Spacer />
        <ControllBar />
      </HStack>
      <Divider />
    </>
  );
};
export default Header;
