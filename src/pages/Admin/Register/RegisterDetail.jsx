import {
  Button,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  Textarea,
  FormHelperText,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import VeganLevel from '@/components/restaurant/VeganLevel';
import usePostCode from '@/hooks/usePostCode';
import { AddressToLatlng, getFullAddress } from '@/utils/address/addressUtil';
import MultiImageFileUpload from '@/components/fileUpload/MultiImageFileUpload';

const RegisterDetail = ({ register, control, setValue, errors }) => {
  const handleComplete = async data => {
    setValue('address', getFullAddress(data), { shouldValidate: true });
    const newCenter = await AddressToLatlng(data.address);
    setValue('restaurantX', newCenter.lat);
    setValue('restaurantY', newCenter.lng);
    setValue('restaurantAddressGu', data.sigungu);
  };

  const handleClick = usePostCode({ handleComplete });

  return (
    <>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>매장사진</FormLabel>
        <MultiImageFileUpload name={'restaurantImages'} control={control}></MultiImageFileUpload>
      </FormControl>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>업체명</FormLabel>
        <Input {...register('restaurantName', { required: true })} w={'200px'} />
        {errors.restaurantName && <FormHelperText>업체명을 입력해주세요.</FormHelperText>}
      </FormControl>
      {/* <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>전화번호</FormLabel>
        <Select {...register('phoneNum1', { required: true })} w={'100px'}>
          <option value="010">010</option>
          <option value="070">070</option>
          <option value="02">02</option>
        </Select>
        <Input
          maxLength="4"
          w={'100px'}
          {...register('phoneNum2', { required: true, minLength: 4, maxLength: 4 })}
        />
        <Input
          maxLength="4"
          w={'100px'}
          {...register('phoneNum3', { required: true, minLength: 4, maxLength: 4 })}
        />
        {(errors.phoneNum2 || errors.phoneNum3) && (
          <FormHelperText>8자리를 입력해 주세요.</FormHelperText>
        )}
      </FormControl> */}
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>주소</FormLabel>
        <VStack>
          <HStack>
            <Input {...register('address', { required: true })} mr={4} w={'400px'} disabled />
            <Button onClick={() => handleClick()}>주소검색</Button>
          </HStack>
          {errors.address && (
            <FormHelperText pl={2} alignSelf={'flex-start'}>
              주소를 검색해 주세요.
            </FormHelperText>
          )}
          <Input {...register('restaurantX')} display={'none'}></Input>
          <Input {...register('restaurantY')} display={'none'}></Input>
          <Input {...register('restaurantAddressGu')} display={'none'}></Input>
          <Input
            {...register('addressDetail')}
            alignSelf={'flex-start'}
            w={'400px'}
            placeholder="상세 주소를 입력해주세요."
          />
        </VStack>
      </FormControl>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>영업시간</FormLabel>
        <HStack>
          <Select {...register('openH')}>
            <option value="00">00시</option>
            <option value="01">01시</option>
            <option value="02">02시</option>
            <option value="03">03시</option>
            <option value="04">04시</option>
            <option value="05">05시</option>
            <option value="06">06시</option>
            <option value="07">07시</option>
            <option value="08">08시</option>
            <option value="09">09시</option>
            <option value="10">10시</option>
            <option value="11">11시</option>
            <option value="12">12시</option>
            <option value="13">13시</option>
            <option value="14">14시</option>
            <option value="15">15시</option>
            <option value="16">16시</option>
            <option value="17">17시</option>
            <option value="18">18시</option>
            <option value="19">19시</option>
            <option value="20">20시</option>
            <option value="21">21시</option>
            <option value="22">22시</option>
            <option value="23">23시</option>
          </Select>
          <Select {...register('openM')}>
            <option value="00">00분</option>
            <option value="30">30분</option>
          </Select>
          <Text fontWeight={600} color={'gray.600'} fontSize="md">
            -
          </Text>
          <Select {...register('closeH')}>
            <option value="00">00시</option>
            <option value="01">01시</option>
            <option value="02">02시</option>
            <option value="03">03시</option>
            <option value="04">04시</option>
            <option value="05">05시</option>
            <option value="06">06시</option>
            <option value="07">07시</option>
            <option value="08">08시</option>
            <option value="09">09시</option>
            <option value="10">10시</option>
            <option value="11">11시</option>
            <option value="12">12시</option>
            <option value="13">13시</option>
            <option value="14">14시</option>
            <option value="15">15시</option>
            <option value="16">16시</option>
            <option value="17">17시</option>
            <option value="18">18시</option>
            <option value="19">19시</option>
            <option value="20">20시</option>
            <option value="21">21시</option>
            <option value="22">22시</option>
            <option value="23">23시</option>
          </Select>
          <Select {...register('closeM')}>
            <option value="00">00분</option>
            <option value="30">30분</option>
          </Select>
        </HStack>
      </FormControl>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>식당 상세설명</FormLabel>
        <VStack alignItems={'flex-start'}>
          <Textarea
            {...register('restaurantDetail')}
            w={'500px'}
            resize={'none'}
            placeholder="식당 상세 정보를 입력하세요."
            size="sm"
          />
        </VStack>
      </FormControl>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>1인당 평균 가격</FormLabel>
        <Input type="number" {...register('restaurantAvgPrice')} w={'140px'} />
        <FormLabel>원</FormLabel>
      </FormControl>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>예약 가능 인원</FormLabel>
        <HStack gap={2}>
          <Input
            {...register('restaurantTable')}
            type="number"
            placeholder="테이블 수"
            w={'120px'}
          ></Input>
          <Input
            {...register('restaurantTableMember')}
            type="number"
            placeholder="테이블 인원"
            w={'120px'}
          ></Input>
        </HStack>
      </FormControl>
      <FormControl as={HStack} w={'660px'}>
        <FormLabel w={'120px'}>비건 레벨</FormLabel>
        <Input
          {...register('restaurantVeganLevel')}
          value={1}
          type="number"
          display={'none'}
        ></Input>
        <VeganLevel setValue={setValue} />
      </FormControl>
    </>
  );
};

export default RegisterDetail;
