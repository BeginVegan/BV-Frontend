import { StarIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import React from 'react';

const StarRating = ({ roundedStarRating }) => {
  const starRating = Array.from({ length: 5 }, (_, index) => (
    <StarIcon key={index} color={index < roundedStarRating ? 'yellow.400' : 'gray.300'} />
  ));

  return (
    <Text fontWeight={200} fontSize="m">
      {starRating}
    </Text>
  );
};

export default StarRating;
