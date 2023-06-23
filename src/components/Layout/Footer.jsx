import React from 'react';
import { Box, Container, Image, Link, Stack, Text } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import wideLogo from '@/assets/images/logo_wide.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';

const Footer = () => {
  const navigator = useNavigate();

  return (
    <Box bottom={0} minH={'150px'} bg={COLORS.GREEN400} color={'white'}>
      <Container as={Stack} maxW={'6xl'} pt={1} pb={2} align={'center'}>
        <Image
          h="60px"
          objectFit="cover"
          src={wideLogo}
          alt="logo"
          onDragStart={e => e.preventDefault()}
          onContextMenu={e => e.preventDefault()}
        />
        <Stack mt={0} direction={'row'} spacing={6}>
          <Link onClick={() => navigator(ROUTES.HOME)}>Home</Link>
          <Link href="https://github.com/BeginVegan" target="_blank">
            Git
          </Link>
          <Link>Blog</Link>
          <Link>Contact</Link>
        </Stack>
      </Container>

      <Box borderTopWidth={2} borderStyle={'solid'} borderColor={'gray.200'}>
        <Container
          as={Stack}
          maxW={'6xl'}
          pt={2}
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2023 Begin Vegan. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
