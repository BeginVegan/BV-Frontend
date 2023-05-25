import { HStack } from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

export const StarRank = ({ number, color = 'gold' }) => {
  return (
    <HStack spacing={'0.1rem'}>
      {Array.from({ length: Number(number) }, (_, index) => (
        <AiFillStar key={index} color={color} size="1rem" />
      ))}
    </HStack>
  );
};
