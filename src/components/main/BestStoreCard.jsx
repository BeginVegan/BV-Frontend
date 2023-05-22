import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const BestStoreCard = ({ heading, description, img, href }) => {
  const navigate = useNavigate();

  return (
    <Box
      w={{ base: 'full', xl: '360px' }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      h={'242px'}
      p={8}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.45)), url(${img})`,
      }}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
      onClick={() => navigate(href)}
      cursor={'pointer'}
    >
      <Stack spacing={2}>
        <Box mt={12}>
          <Heading align={'center'} size="md" color={'white'}>
            {heading}
          </Heading>
          <Text align={'center'} mt={1} fontSize={'md'} color={'white'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default BestStoreCard;
