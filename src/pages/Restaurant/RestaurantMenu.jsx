import { Box, HStack, Image, VStack, Text, Card } from '@chakra-ui/react';
import React from 'react';

const RestaurantMenu = ({ menuList }) => {
  const filteredMenuList = menuList.filter(menu => menu.menuName !== null);

  if (filteredMenuList.length === 0) {
    return (
      <Text fontWeight={600} color={'gray.200'} fontSize="md">
        정보가 없습니다.
      </Text>
    );
  }

  return (
    <React.Fragment>
      {filteredMenuList.map(menu => (
        <Card
          direction={'row'}
          key={menu.menuNo}
          w={'100%'}
          py={3}
          px={2}
          border={'1px solid'}
          borderColor={'gray.200'}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <VStack w={'200px'} textAlign={'left'} alignItems={'flex-start'}>
            <Box fontWeight={400} fontSize="md">
              {menu.menuName}
              <Box ml={2} display={'inline'} fontWeight={400} color={'gray.600'} fontSize="md">
                {menu.menuPrice.toLocaleString()} 원
              </Box>
            </Box>
            <Box fontWeight={200} color={'gray.600'} fontSize="sm">
              {menu.menuDetail.length > 54 ? menu.menuDetail.slice(0, 54) + '..' : menu.menuDetail}
            </Box>
          </VStack>
          <Image
            borderRadius={'md'}
            shadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'}
            objectFit="cover"
            h={'90px'}
            w={'120px'}
            src={menu.menuPhotoDir}
          />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default RestaurantMenu;
