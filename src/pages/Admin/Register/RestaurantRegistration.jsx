import {
  Box,
  Button,
  ButtonGroup,
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
import RegisterDetail from '@/pages/Admin/Register/RegisterDetail';
import RegisterComplete from '@/pages/Admin/Register/RegisterComplete';

const RestaurantRegistration = () => {
  const { stepno } = useParams();
  const navigate = useNavigate();
  const { mutate: onAddRestaurant } = useMutation(RestaurantService.addRestaurant);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  const steps = [{ title: '필수정보 입력' }, { title: '등록완료' }];

  const pageStep = {
    1: <RegisterDetail register={register} control={control} setValue={setValue} errors={errors} />,
    2: <RegisterComplete />,
  };

  const onSubmit = data => {
    onAddRestaurant({
      restaurantInfo: {
        restaurantName: data.restaurantName,
        restaurantAddress:
          data.addressDetail.length === 0 ? data.address : `${data.address},${data.addressDetail}`,
        restaurantAddressGu: data.restaurantAddressGu,
        restaurantX: data.restaurantX,
        restaurantY: data.restaurantY,
        restaurantOpen: `${data.openH}:${data.openM}:00`,
        restaurantClose: `${data.closeH}:${data.closeM}:00`,
        restaurantDetail: data.restaurantDetail,
        restaurantTable: data.restaurantTable,
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
    });

    navigate(`${ROUTES.RESTAURANT_REGISTRATION_RAW}/${+stepno + 1}`);
  };

  return (
    <Flex direction={'column'} py={12}>
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
          {stepno < 4 && (
            <ButtonGroup>
              <Button type="submit">다음</Button>
              <Button>취소</Button>
            </ButtonGroup>
          )}
        </HStack>
      </form>
    </Flex>
  );
};

export default RestaurantRegistration;
