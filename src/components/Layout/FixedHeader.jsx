import ControllBar from '@/components/Layout/ControllBar';
import { Box, Flex, useColorModeValue, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import wideLogo from '@/assets/images/logo_wide_black.png';
import { ROUTES } from '@/routes/ROUTES';
import useScroll from '@/hooks/useScroll';

const FixedHeader = ({ children }) => {
  const navigate = useNavigate();
  const { x, y } = useScroll();

  return (
    <Box
      w={'100%'}
      zIndex={20000}
      shadow={y > 100 && 'rgba(0, 0, 0, 0.15) 0px 5px 15px'}
      opacity={y > 100 && '0.9'}
      position={y > 100 && 'fixed'}
    >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        py={{ base: 2 }}
        px={{ base: 4 }}
        minH={'75px'}
        maxH={'75px'}
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
            h={'50px'}
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

export default FixedHeader;
