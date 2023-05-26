import {
  Box,
  Button,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const RegisterStepOne = () => {
  return (
    <>
      <HStack w={'618px'}>
        <Text w={'90px'} fontWeight={600} color={'gray.600'} fontSize="md">
          업체명
        </Text>
        <Input w={'200px'} />
      </HStack>
      <HStack w={'618px'}>
        <Text w={'90px'} fontWeight={600} color={'gray.600'} fontSize="md">
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
      <HStack w={'618px'}>
        <Text w={'90px'} fontWeight={600} color={'gray.600'} fontSize="md">
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
      <HStack w={'618px'}>
        <Text w={'90px'} fontWeight={600} color={'gray.600'} fontSize="md">
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
    </>
  );
};

export default RegisterStepOne;
