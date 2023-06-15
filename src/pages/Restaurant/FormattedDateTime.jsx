import { Text } from '@chakra-ui/react';
import React from 'react';

const FormattedDateTime = ({ timestamp }) => {
  const date = new Date(timestamp);
  const formattedDateTime = date.toLocaleString();

  return (
    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
      {formattedDateTime}
    </Text>
  );
};

export default FormattedDateTime;
