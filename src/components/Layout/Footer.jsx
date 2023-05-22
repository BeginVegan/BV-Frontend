import React from 'react';
import { Box, Container, Image, Link, Stack, Text } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import wideLogo from '@/assets/images/logo_wide.png';

const Footer = () => {
  return (
    <Box minH={'162px'} marginTop={'auto'} bg={COLORS.GREEN400} color={'white'}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
        <Image
          h="32px"
          objectFit="cover"
          src={wideLogo}
          alt="logo"
          onDragStart={e => e.preventDefault()}
          onContextMenu={e => e.preventDefault()}
        />
        <Stack direction={'row'} spacing={6}>
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Blog</Link>
          <Link>Contact</Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={'gray.200'}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2023 Begin Vegan. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}></Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
