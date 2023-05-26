import {
  Box,
  Button,
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
  useSteps,
} from '@chakra-ui/react';
import React from 'react';
import RegisterStepOne from '@/pages/Admin/Register/RegisterStepOne';
import RegisterStepTwo from '@/pages/Admin/Register/RegisterStepTwo';
import RegisterStepThree from '@/pages/Admin/Register/RegisterStepThree';

const steps = [{ title: '필수정보 입력' }, { title: '상세정보 입력' }, { title: '등록완료' }];
const pageStep = { 0: <RegisterStepOne />, 1: <RegisterStepTwo />, 3: <RegisterStepThree /> };

const RestaurantRegistration = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Flex direction={'column'} py={12}>
      <Stepper w={'900px'} pb={12} size="lg" index={activeStep}>
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
      <VStack gap={6} w={'900px'}>
        <Divider mb={8} borderColor={'gray.400'} />
        {pageStep[activeStep]}
      </VStack>
      <HStack w={'900px'} justifyContent={'flex-end'} pt={12} gap={4} pr={8}>
        {activeStep === 1 && <Button onClick={() => setActiveStep(activeStep - 1)}>이전</Button>}
        {activeStep < 3 && (
          <>
            <Button onClick={() => setActiveStep(activeStep === 0 ? 1 : 3)}>다음</Button>
            <Button>취소</Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default RestaurantRegistration;
