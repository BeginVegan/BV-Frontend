import MenuService from '@/api/MenuService';
import ImageFileUpload from '@/components/fileUpload/ImageFileUpload';
import RestaurantMenuCard from '@/components/restaurant/RestaurantMenuCard';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const RegisterMenu = () => {
  const { mutate: onAddMenu } = useMutation('addMenu', MenuService.addMenu);
  const { restaurantno } = useParams();
  const {
    data: menus,
    isLoading,
    refetch,
  } = useQuery('setMenuList', () => MenuService.getMenuList(restaurantno), {
    refetchOnWindowFocus: false,
  });

  if (!isLoading) console.log(menus.menuList);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const addMenu = data => {
    onAddMenu(
      {
        menuInfo: {
          restaurantNo: +restaurantno,
          menuName: data.menuName,
          menuPrice: +data.menuPrice,
          menuCategory: data.menuCategory,
          menuDetail: data.menuDetail,
        },
        menuImage: data.menuImage || new Object(),
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      },
      {
        onSuccess: res => {
          refetch();
        },
      }
    );
  };

  return (
    <HStack alignItems={'flex-start'} w={'700px'}>
      <Text w={'140px'} fontWeight={600} color={'gray.600'} fontSize="md">
        메뉴등록
      </Text>
      <VStack alignItems={'flex-start'} gap={4}>
        <VStack
          minH={'370px'}
          minW={'550px'}
          maxH={'250px'}
          overflowY={'scroll'}
          gap={2}
          p={4}
          boxShadow={
            'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
          }
          divider={<Divider borderColor={'gray.400'} />}
        >
          {!isLoading ? (
            menus.menuList.map(menu => (
              <RestaurantMenuCard
                menuNo={menu.menuNo}
                menuName={menu.menuName}
                menuPrice={menu.menuPrice}
                menuDetail={menu.menuDetail}
                menuImage={menu.menuPhotoDir}
                refetch={refetch}
              />
            ))
          ) : (
            <Spinner />
          )}
        </VStack>
        <HStack alignItems={'flex-start'} pt={4} gap={4}>
          <FormControl as={VStack}>
            <FormLabel>메뉴 사진</FormLabel>
            <ImageFileUpload name={'menuImage'} control={control}></ImageFileUpload>
          </FormControl>
          <FormControl as={VStack} alignItems={'flex-start'}>
            <FormLabel>메뉴 정보</FormLabel>
            <HStack>
              <Input {...register('menuName', { required: true })} placeholder="이름" w={'150px'} />
              <Select {...register('menuCategory')} w={'90px'}>
                <option value="식사">식사</option>
                <option value="음료">음료</option>
              </Select>
              <Input
                {...register('menuPrice', { required: true })}
                w={'100px'}
                placeholder="가격"
                maxLength={7}
              />
            </HStack>
            <FormLabel>메뉴 상세 설명(최대 100자)</FormLabel>
            <Textarea
              {...register('menuDetail')}
              w={'360px'}
              resize={'none'}
              placeholder="메뉴 상세 정보를 입력하세요."
              size="sm"
            />
          </FormControl>
        </HStack>
        <Button alignSelf={'flex-end'} onClick={handleSubmit(addMenu)}>
          메뉴추가
        </Button>
      </VStack>
    </HStack>
  );
};

export default RegisterMenu;
