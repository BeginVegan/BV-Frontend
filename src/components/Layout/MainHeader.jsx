import ControllBar from '@/components/Layout/ControllBar';
import { Box, Flex, useColorModeValue, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import wideLogo from '@/assets/images/logo_wide_black.png';
import { ROUTES } from '@/routes/ROUTES';

const MainHeader = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent={'center'}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Flex
        maxW={'1220px'}
        w={'1220px'}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'75px'}
        maxH={'75px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} align={'center'}>
          <Image
            h="50px"
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
    </Flex>
  );
};

export default MainHeader;
