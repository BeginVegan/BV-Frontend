import MenuService from '@/api/MenuService';
import RestaurantService from '@/api/RestaurantService';
import ImageFileUpload from '@/components/fileUpload/ImageFileUpload';
import RestaurantMenuCard from '@/components/restaurant/RestaurantMenuCard';
import {
  Button,
  Card,
  Divider,
  Flex,
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

const RegisterMenu = ({ restaurantno }) => {
  const { mutate: onAddMenu } = useMutation('addMenu', MenuService.addMenu);

  const {
    data: restaurant,
    isLoading,
    refetch,
  } = useQuery('getRestaurantDetails', () => RestaurantService.getRestaurantDetails(restaurantno), {
    refetchOnWindowFocus: false,
  });

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
    <Flex w={'100%'} alignItems={'center'} direction={'column'}>
      <Card shadow={'none'} px={8} pb={4} borderRadius={'xl'}>
        <VStack alignItems={'flex-start'} gap={4}>
          <VStack
            minH={'400px'}
            minW={'550px'}
            maxH={'250px'}
            overflowY={'scroll'}
            justifyContent={'center'}
            gap={2}
            p={4}
            boxShadow={
              'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
            }
            divider={<Divider borderColor={'gray.400'} />}
          >
            {!isLoading ? (
              restaurant.restaurant.menuList.map(menu => {
                if (menu.menuNo != 0)
                  return (
                    <RestaurantMenuCard
                      key={menu.menuNo}
                      menuNo={menu.menuNo}
                      menuName={menu.menuName}
                      menuPrice={menu.menuPrice}
                      menuDetail={menu.menuDetail}
                      menuImage={menu.menuPhotoDir}
                      refetch={refetch}
                    />
                  );
              })
            ) : (
              <Spinner />
            )}
            {!isLoading &&
              restaurant.restaurant.menuList.filter(m => m.menuNo != 0).length === 0 && (
                <Text>메뉴를 추가해 주세요.</Text>
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
                <Input
                  {...register('menuName', { required: true })}
                  placeholder="이름"
                  w={'200px'}
                />
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
                w={'410px'}
                h={'120px'}
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
      </Card>
    </Flex>
  );
};

export default RegisterMenu;
