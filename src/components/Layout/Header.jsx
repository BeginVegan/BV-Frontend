import { Box, Flex, useColorModeValue, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import wideLogo from '@/assets/images/logo_wide_black.png';
import ControllBar from './ControllBar';

const Header = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={'start'}>
          <Image
            h="32px"
            onClick={() => navigate('/')}
            objectFit="cover"
            src={wideLogo}
            alt="logo"
            cursor={'pointer'}
          />
          {children}
        </Flex>
        <ControllBar />
      </Flex>
    </Box>
  );
};

export default Header;
