import { Divider, HStack, Spacer, Text } from '@chakra-ui/react';
import ControllBar from './ControllBar';

const Header = () => {
  return (
    <>
      <HStack>
        <Text>헤더입니다</Text>
        <Spacer />
        <ControllBar />
      </HStack>
      <Divider />
    </>
  );
};
export default Header;
