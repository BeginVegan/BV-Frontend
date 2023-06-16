import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Flex,
  HStack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';
import { useMutation } from 'react-query';
import RestaurantService from '@/api/RestaurantService';
import RegisterDetail from './RegisterDetail';
import RegisterComplete from './RegisterComplete';
import Storage from '@/utils/storage/storage';
import Swal from 'sweetalert2';

const RestaurantRegistration = () => {
  const { stepno } = useParams();
  const navigate = useNavigate();
  const { mutate: onAddRestaurant } = useMutation('addRestaurant', RestaurantService.addRestaurant);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const steps = [{ title: '필수정보 입력' }, { title: '등록완료' }];

  const pageStep = {
    1: <RegisterDetail register={register} control={control} setValue={setValue} errors={errors} />,
    2: <RegisterComplete />,
  };

  const onSubmit = async data => {
    Swal.fire({
      icon: 'warning',
      title: '가게를 생성 하시겠습니까?',
      html: `업체명: ${data.restaurantName}<br/>
            주소: ${data.address}<br/>
            영업시간: ${data.openH}:${data.openM}:00 ~ ${data.closeH}:${data.closeM}:00`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '생성',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        Swal.fire('가게생성이 완료되었습니다.');
        onAddRestaurant(
          {
            restaurantInfo: {
              restaurantName: data.restaurantName,
              restaurantAddress:
                data.addressDetail.length === 0
                  ? data.address
                  : `${data.address},${data.addressDetail}`,
              restaurantAddressGu: data.restaurantAddressGu,
              restaurantX: data.restaurantX,
              restaurantY: data.restaurantY,
              restaurantOpen: `${data.openH}:${data.openM}:00`,
              restaurantClose: `${data.closeH}:${data.closeM}:00`,
              restaurantDetail: data.restaurantDetail,
              restaurantTable: data.restaurantTable,
              restaurantPhone: `${data.phoneNum1}-${data.phoneNum2}-${data.phoneNum3}`,
              restaurantTableMember: data.restaurantTableMember,
              restaurantAvgPrice: data.restaurantAvgPrice,
              restaurantVeganLevel: data.restaurantVeganLevel,
            },
            restaurantImages: data.restaurantImages,
            options: {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          },
          {
            onSuccess: res => {
              Storage.setJsonItem('rastaurantInfo', { ...data, restaurantNo: res.data });
              navigate(`${ROUTES.RESTAURANT_REGISTRATION_RAW}/2`);
            },
          }
        );
      }
    });
  };

  return (
    <Flex w={'100%'} alignItems={'center'} direction={'column'} py={5}>
      <Card shadow={'none'} p={8} borderRadius={'xl'}>
        <Stepper w={'900px'} pb={12} size="lg" index={stepno}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={6} w={'900px'}>
            <Divider mb={8} borderColor={'gray.400'} />
            {pageStep[stepno]}
          </VStack>
          <HStack w={'900px'} justifyContent={'flex-end'} pt={12} gap={4} pr={8}>
            {stepno == 1 && (
              <ButtonGroup>
                <Button
                  bgColor={'green.200'}
                  _hover={{ bgColor: 'green.400', color: 'white' }}
                  type="submit"
                >
                  생성하기
                </Button>
                <Button
                  onClick={() => navigate(ROUTES.ADMIN)}
                  _hover={{ bgColor: 'red.400', color: 'white' }}
                  bgColor={'red.200'}
                >
                  취소
                </Button>
              </ButtonGroup>
            )}
          </HStack>
        </form>
      </Card>
    </Flex>
  );
};

export default RestaurantRegistration;
