import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const BestStoreCard = ({ heading, description, img, href, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Box
      w={{ base: 'full', xl: '360px' }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      h={'242px'}
      bgImage={img}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
      onClick={() => navigate(href)}
      cursor={'pointer'}
      {...rest}
    >
      <Stack w={'100%'} h={'100%'} p={8} bgColor={'rgba(0, 0, 0, 0.2)'} spacing={2}>
        <Box mt={12}>
          <Heading align={'center'} size="md" color={'white'}>
            {heading}
          </Heading>
          <Text align={'center'} mt={2} fontSize={'md'} color={'white'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default BestStoreCard;
