import { DeleteIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';

const RestaurantMenuCard = ({ menuNo, menuName, menuPrice, menuDetail, menuImage }) => {
  return (
    <HStack w={'500px'} justifyContent={'space-around'}>
      <Image objectFit="cover" h={'90px'} w={'120px'} src={menuImage} />
      <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
        <HStack>
          <Text fontWeight={400} fontSize="md">
            {menuName}
          </Text>
          <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
            {menuPrice}원
          </Text>
          <IconButton bgColor={'transparent'} icon={<RiEditBoxLine />} />
          <IconButton bgColor={'transparent'} icon={<DeleteIcon />} />
        </HStack>
        <Text fontWeight={200} color={'gray.400'} fontSize="sm">
          {menuDetail}
        </Text>
      </VStack>
    </HStack>
  );
};

export default RestaurantMenuCard;
