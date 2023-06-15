import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import React from 'react';

const RestaurantMenu = ({ menuList }) => (
  <React.Fragment>
    {menuList.map(menu => (
      <HStack key={menu.menuNo} w={'600px'} justifyContent={'space-around'}>
        <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
          <Box fontWeight={400} fontSize="md">
            {menu.menuName}
            <Box ml={2} display={'inline'} fontWeight={400} color={'gray.600'} fontSize="md">
              {menu.menuPrice.toLocaleString()} 원
            </Box>
          </Box>
          <Box fontWeight={200} color={'gray.600'} fontSize="sm">
            {menu.menuDetail}
          </Box>
        </VStack>
        <Image objectFit="cover" h={'90px'} w={'120px'} src={menu.menuPhotoDir} />
      </HStack>
    ))}
  </React.Fragment>
);

export default RestaurantMenu;
