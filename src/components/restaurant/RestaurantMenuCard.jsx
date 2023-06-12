import MenuService from '@/api/MenuService';
import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';

const RestaurantMenuCard = ({ menuNo, menuName, menuPrice, menuDetail, menuImage, refetch }) => {
  const { mutate: onDeleteMenu } = useMutation('addMenu', MenuService.deleteMenu);

  const deleteMenu = () => {
    Swal.fire({
      icon: 'warning',
      title: `${menuName}을 삭제 하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) {
        onDeleteMenu(menuNo, {
          onSuccess: () => {
            refetch();
          },
        });
      }
    });
  };

  return (
    <HStack w={'500px'} justifyContent={'space-around'} gap={3}>
      <Image
        objectFit="cover"
        minH={'90px'}
        minW={'120px'}
        maxH={'90px'}
        maxW={'120px'}
        src={menuImage || 'http://placehold.it/120x90'}
        boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
      />
      <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
        <HStack>
          <Text fontWeight={400} fontSize="md">
            {menuName}
          </Text>
          <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
            {menuPrice}원
          </Text>
          {/* <IconButton bgColor={'transparent'} icon={<RiEditBoxLine />} /> */}
          <IconButton onClick={deleteMenu} bgColor={'transparent'} icon={<DeleteIcon />} />
        </HStack>
        <Text fontWeight={200} color={'gray.400'} fontSize="sm">
          {menuDetail}
        </Text>
      </VStack>
    </HStack>
  );
};

export default RestaurantMenuCard;
