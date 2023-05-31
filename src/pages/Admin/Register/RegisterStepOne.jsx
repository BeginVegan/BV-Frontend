import {
  Button,
  HStack,
  Input,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import VeganLevel from '@/components/store/VeganLevel';

const RegisterStepOne = () => {
  return (
    <>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          업체명
        </Text>
        <Input w={'200px'} />
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          전화번호
        </Text>
        <Select w={'100px'}>
          <option value="010">010</option>
          <option value="070">070</option>
          <option value="02">02</option>
        </Select>
        <NumberInput max={9999} w={'100px'} clampValueOnBlur={false}>
          <NumberInputField />
        </NumberInput>
        <NumberInput max={9999} w={'100px'} clampValueOnBlur={false}>
          <NumberInputField />
        </NumberInput>
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          주소
        </Text>
        <VStack>
          <HStack>
            <Input mr={4} w={'400px'} disabled />
            <Button>주소검색</Button>
          </HStack>
          <Input alignSelf={'flex-start'} w={'400px'} placeholder="상세 주소를 입력해주세요." />
        </VStack>
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          영업시간
        </Text>
        <HStack>
          <Select>
            <option value="0">00시</option>
            <option value="1">01시</option>
            <option value="2">02시</option>
          </Select>
          <Select>
            <option value="0">00분</option>
            <option value="30">30분</option>
          </Select>
          <Text fontWeight={600} color={'gray.600'} fontSize="md">
            -
          </Text>
          <Select>
            <option value="0">00시</option>
            <option value="1">01시</option>
            <option value="2">02시</option>
          </Select>
          <Select>
            <option value="0">00분</option>
            <option value="30">30분</option>
          </Select>
        </HStack>
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          식당 상세설명
        </Text>
        <VStack alignItems={'flex-start'}>
          <Text mb="2px">식당 상세 설명(최대 100자)</Text>
          <Textarea
            w={'500px'}
            resize={'none'}
            placeholder="식당 상세 정보를 입력하세요."
            size="sm"
          />
        </VStack>
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          1인당 평균 가격
        </Text>
        <NumberInput w={'140px'} clampValueOnBlur={false}>
          <NumberInputField />
        </NumberInput>
        <Text fontWeight={600} color={'gray.600'} fontSize="md">
          원
        </Text>
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          예약 가능 인원
        </Text>
        <HStack gap={2}>
          <VStack>
            <Text mb="2px">테이블 수</Text>
            <NumberInput w={'140px'} clampValueOnBlur={false}>
              <NumberInputField />
            </NumberInput>
          </VStack>
          <VStack>
            <Text mb="2px">테이블 허용 인원</Text>
            <NumberInput w={'140px'} clampValueOnBlur={false}>
              <NumberInputField />
            </NumberInput>
          </VStack>
        </HStack>
      </HStack>
      <HStack w={'660px'}>
        <Text w={'132px'} fontWeight={600} color={'gray.600'} fontSize="md">
          비건레벨
        </Text>
        <VeganLevel />
      </HStack>
    </>
  );
};

export default RegisterStepOne;
