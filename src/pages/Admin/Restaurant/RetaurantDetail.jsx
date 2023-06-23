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
  Card,
  Flex,
  ButtonGroup,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import VeganLevel from '@/components/restaurant/VeganLevel';
import usePostCode from '@/hooks/usePostCode';
import { AddressToLatlng, getFullAddress } from '@/utils/address/addressUtil';
import MultiImageFileUpload from '@/components/fileUpload/MultiImageFileUpload';
import { useForm } from 'react-hook-form';
import CustomModal from '@/components/common/CustomModal';
import RegisterMenu from '../Register/RegisterMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import RestaurantService from '@/api/RestaurantService';
import Swal from 'sweetalert2';
import { ROUTES } from '@/routes/ROUTES';
import JSZip from 'jszip';
import S3Service from '@/api/S3Service';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const RetaurantDetail = () => {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { restaurantNo } = useParams();

  const fetchRestaurantDetails = () => RestaurantService.getRestaurantDetails(restaurantNo);
  const {
    data: restaurantDetail,
    isLoading: restaurantDetailLoading,
    error: restaurantDetailError,
    isFetching: restaurantDetailFetching,
    refetch: restaurantRefetch,
  } = useQuery('getRestaurantDetails', fetchRestaurantDetails, {
    retry: 0,
    onError: error => {
      console.log(error);
      if (error.response?.status === 500) {
        // 에러가 500일 경우에만 페이지 이동
        // navigator(`${ROUTES.ADMIN_RAW}/restaurant`);
        Swal.fire('존재하지 않는 식당입니다.');
      }
    },
  });

  const fetchImage = () => S3Service.getS3image(restaurantDetail?.restaurant.restaurantPhotoDir);

  const {
    data: image,
    isLoading: imageLoading,
    refetch: imageRefetch,
    isFetching: isImageFetching,
  } = useQuery('getImage', fetchImage, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: onUpdateRestaurant } = useMutation(
    'updateRestaurant',
    RestaurantService.updateRestaurant
  );

  const { mutate: onDeleteRestaurant } = useMutation(
    'deleteRestaurant',
    RestaurantService.deleteRestaurant
  );

  const [isModify, setisModify] = useState(false);
  const [restaurantImgs, setRestaurantImgs] = useState([]);

  useEffect(() => {
    if (isImageFetching || imageLoading) {
      return; // 이미지 fetching 또는 로딩 중인 경우 early return
    }

    unZip(image);
  }, [isImageFetching, imageLoading, restaurantNo]);

  const unZip = async image => {
    const zip = await JSZip.loadAsync(image);
    const filesArray = Object.values(zip.files);

    const filePromises = filesArray.map(async file => {
      const blob = await file.async('blob');
      const fileObj = new File([blob], file.name.split('/')[2]);
      return fileObj;
    });

    const newImageSrcs = await Promise.all(filePromises);
    setRestaurantImgs(newImageSrcs);
    setValue('restaurantImages', newImageSrcs);
  };

  const downloadImage = async () => {
    if (isImageFetching || imageLoading) {
      return; // 이미지 fetching 또는 로딩 중인 경우 early return
    }

    // 서버에서 전달된 ByteArrayResource를 받아옵니다.
    const byteArray = new Uint8Array(image);

    // ByteArray를 Blob으로 변환합니다.
    const blob = new Blob([byteArray]);

    // Blob을 파일로 저장하기 위한 URL을 생성합니다.
    const downloadUrl = URL.createObjectURL(blob);

    // 다운로드 링크를 생성합니다.
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${restaurantDetail.restaurant.restaurantName}.zip`; // 다운로드될 파일의 이름을 지정하세요.
    link.click();

    // Blob 및 URL 객체를 정리합니다.
    URL.revokeObjectURL(downloadUrl);
  };

  useEffect(() => {
    if (isModify) return;
    if (!restaurantDetailLoading && !restaurantDetailFetching) {
      const { restaurant } = restaurantDetail;

      if (restaurant.restaurantNo != restaurantNo) {
        restaurantRefetch();
        return;
      }
      imageRefetch();

      setValue('restaurantName', restaurant.restaurantName);
      setValue('restaurantX', restaurant.restaurantX);
      setValue('restaurantY', restaurant.restaurantY);
      setValue('restaurantAddressGu', restaurant.restaurantAddressGu);
      setValue('restaurantDetail', restaurant.restaurantDetail);
      setValue('restaurantAvgPrice', restaurant.restaurantAvgPrice);
      setValue('restaurantTable', restaurant.restaurantTable);
      setValue('restaurantTableMember', restaurant.restaurantTableMember);
      setValue('restaurantVeganLevel', restaurant.restaurantVeganLevel);
      setValue('restaurantPhotoDir', restaurant.restaurantPhotoDir);

      // 값이 있을때만 split
      const [address, addressDetail] = restaurant.restaurantAddress.split('&');
      setValue('address', address);
      setValue('addressDetail', addressDetail);

      const [openH, openM] = restaurant.restaurantOpen.split(':');
      setValue('openH', openH);
      setValue('openM', openM);

      const [closeH, closeM] = restaurant.restaurantClose.split(':');
      setValue('closeH', closeH);
      setValue('closeM', closeM);

      const [phoneNum1, phoneNum2, phoneNum3] = restaurant.restaurantPhone.split('-');
      setValue('phoneNum1', phoneNum1);
      setValue('phoneNum2', phoneNum2);
      setValue('phoneNum3', phoneNum3);
    }
  }, [restaurantDetailLoading, restaurantDetailFetching]);

  const handleComplete = async data => {
    setValue('address', getFullAddress(data), { shouldValidate: true });
    const newCenter = await AddressToLatlng(data.address);
    setValue('restaurantX', newCenter.lat);
    setValue('restaurantY', newCenter.lng);
    setValue('restaurantAddressGu', data.sigungu);
  };

  const handleClick = usePostCode({ handleComplete });

  const onSubmit = async data => {
    Swal.fire({
      icon: 'warning',
      title: '가게를 수정 하시겠습니까?',
      html: `업체명: ${data.restaurantName}<br/>
            주소: ${data.address}<br/>
            영업시간: ${data.openH}:${data.openM}:00 ~ ${data.closeH}:${data.closeM}:00`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        onUpdateRestaurant(
          {
            restaurantInfo: {
              restaurantNo: +restaurantNo,
              restaurantName: data.restaurantName,
              restaurantAddress:
                data.addressDetail == undefined
                  ? data.address
                  : `${data.address}&${data.addressDetail}`,
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
              restaurantPhotoDir: restaurantDetail.restaurant.restaurantPhotoDir,
            },
            restaurantImages: restaurantImgs,
            options: {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          },
          {
            onSuccess: res => {
              Swal.fire('가게수정이 완료되었습니다.');
              restaurantRefetch();
              setisModify(false);
            },
          }
        );
      }
    });
  };

  const removeRestaurant = () => {
    Swal.fire({
      icon: 'warning',
      title: '가게를 삭제 하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) {
        onDeleteRestaurant(restaurantNo, {
          onSuccess: res => {
            Swal.fire('삭제가 완료되었습니다.');
            navigator(`${ROUTES.ADMIN_RAW}/restaurant`);
          },
        });
      }
    });
  };

  return (
    <Flex
      as={'form'}
      m={'auto'}
      p={5}
      h={'100%'}
      alignItems={'center'}
      direction={'column'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card borderRadius={'2xl'} shadow={'none'} bg={'white'} py={5} px={10} gap={6}>
        <CustomModal title={'메뉴 수정'} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <RegisterMenu restaurantno={restaurantNo} />
        </CustomModal>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>
            매장사진
            <Text fontSize={'sm'} color={'gray.400'}>
              최대 5장
            </Text>
            <Link onClick={downloadImage} fontSize={'sm'} color={'green.500'}>
              사진파일 다운로드
            </Link>
          </FormLabel>
          <MultiImageFileUpload
            name={'restaurantImages'}
            isModify={isModify}
            isLoading={imageLoading}
            restaurantImgs={restaurantImgs}
            handleChangeRestaurantImgs={img => setRestaurantImgs(img)}
            control={control}
            errors={errors}
          ></MultiImageFileUpload>
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>업체명</FormLabel>
          <Input
            _disabled={{ opacity: 0.8 }}
            {...register('restaurantName', { required: true })}
            w={'200px'}
            disabled={!isModify}
          />
          {errors.restaurantName && <FormHelperText>업체명을 입력해주세요.</FormHelperText>}
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>전화번호</FormLabel>
          <Select
            _disabled={{ opacity: 0.8 }}
            {...register('phoneNum1', { required: true })}
            w={'100px'}
            disabled={!isModify}
          >
            <option value="010">010</option>
            <option value="070">070</option>
            <option value="02">02</option>
          </Select>
          <Input
            _disabled={{ opacity: 0.8 }}
            maxLength="3"
            w={'100px'}
            {...register('phoneNum2', { required: true, minLength: 4, maxLength: 4 })}
            disabled={!isModify}
          />
          <Input
            _disabled={{ opacity: 0.8 }}
            maxLength="4"
            w={'100px'}
            {...register('phoneNum3', { required: true, minLength: 4, maxLength: 4 })}
            disabled={!isModify}
          />
          {(errors.phoneNum2 || errors.phoneNum3) && (
            <FormHelperText>8자리를 입력해 주세요.</FormHelperText>
          )}
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>주소</FormLabel>
          <VStack>
            <HStack>
              <Input
                _disabled={{ opacity: 0.8 }}
                {...register('address', { required: true })}
                mr={4}
                w={'400px'}
                disabled
              />
              <Button onClick={() => handleClick()} display={!isModify && 'none'}>
                주소검색
              </Button>
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
              _disabled={{ opacity: 0.8 }}
              {...register('addressDetail')}
              alignSelf={'flex-start'}
              w={'400px'}
              placeholder="상세 주소를 입력해주세요."
              disabled={!isModify}
            />
          </VStack>
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>영업시간</FormLabel>
          <HStack>
            <Select _disabled={{ opacity: 0.8 }} {...register('openH')} disabled={!isModify}>
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
            <Select _disabled={{ opacity: 0.8 }} {...register('openM')} disabled={!isModify}>
              <option value="00">00분</option>
              <option value="30">30분</option>
            </Select>
            <Text fontWeight={600} color={'gray.600'} fontSize="md">
              -
            </Text>
            <Select _disabled={{ opacity: 0.8 }} {...register('closeH')} disabled={!isModify}>
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
            <Select _disabled={{ opacity: 0.8 }} {...register('closeM')} disabled={!isModify}>
              <option value="00">00분</option>
              <option value="30">30분</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>식당 상세설명</FormLabel>
          <VStack alignItems={'flex-start'}>
            <Textarea
              _disabled={{ opacity: 0.8 }}
              {...register('restaurantDetail')}
              w={'500px'}
              resize={'none'}
              placeholder="식당 상세 정보를 입력하세요."
              size="sm"
              disabled={!isModify}
            />
          </VStack>
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>1인당 평균 가격</FormLabel>
          <Input
            _disabled={{ opacity: 0.8 }}
            type="number"
            {...register('restaurantAvgPrice')}
            w={'140px'}
            disabled={!isModify}
          />
          <FormLabel>원</FormLabel>
        </FormControl>
        <FormControl as={HStack} w={'660px'}>
          <FormLabel w={'120px'}>예약 가능 인원</FormLabel>
          <HStack gap={2}>
            <Input
              _disabled={{ opacity: 0.8 }}
              {...register('restaurantTable')}
              type="number"
              placeholder="테이블 수"
              w={'120px'}
              disabled={!isModify}
            ></Input>
            <Input
              _disabled={{ opacity: 0.8 }}
              {...register('restaurantTableMember')}
              type="number"
              placeholder="테이블 인원"
              w={'120px'}
              disabled={!isModify}
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
          <VeganLevel
            value={1}
            setValue={setValue}
            level={getValues('restaurantVeganLevel')}
            isClickable={isModify}
          />
        </FormControl>
        {isModify && (
          <Button mt={4} onClick={onOpen}>
            메뉴 수정
          </Button>
        )}
        <ButtonGroup display={'flex'} alignSelf={'flex-end'}>
          {isModify ? (
            <>
              <Button
                bgColor={'red.200'}
                _hover={{ bgColor: 'red.400', color: 'white' }}
                onClick={() => removeRestaurant()}
                position={'absolute'}
                left={10}
              >
                식당삭제 <DeleteIcon ml={1} />
              </Button>
              <Button
                bgColor={'blue.200'}
                _hover={{ bgColor: 'blue.400', color: 'white' }}
                onClick={() => setisModify(false)}
              >
                수정취소
              </Button>
              <Button
                bgColor={'green.200'}
                _hover={{ bgColor: 'green.400', color: 'white' }}
                type="submit"
              >
                수정완료
              </Button>
            </>
          ) : (
            <>
              <Button
                bgColor={'green.200'}
                _hover={{ bgColor: 'green.400', color: 'white' }}
                onClick={() => setisModify(true)}
              >
                수정하기 <EditIcon ml={1} />
              </Button>
            </>
          )}
        </ButtonGroup>
      </Card>
    </Flex>
  );
};

export default RetaurantDetail;
