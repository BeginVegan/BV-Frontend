import ControllBar from '@/components/Layout/ControllBar';
import { Box, Flex, useColorModeValue, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import wideLogo from '@/assets/images/logo_wide_black.png';
import { ROUTES } from '@/routes/ROUTES';

const Header = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'72px'}
        maxH={'72px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} align={'center'}>
          <Image
            onClick={() => navigate(ROUTES.HOME)}
            objectFit="cover"
            src={wideLogo}
            alt="logo"
            cursor={'pointer'}
            onDragStart={e => e.preventDefault()}
            onContextMenu={e => e.preventDefault()}
          />
          {children}
        </Flex>
        <ControllBar />
      </Flex>
    </Box>
  );
};

export default Header;
