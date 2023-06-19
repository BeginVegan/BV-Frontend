import React, { useEffect, useRef } from 'react';
import {
  Box,
  CloseButton,
  FormHelperText,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputLeftElement,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import Swal from 'sweetalert2';
const MultiImageFileUpload = ({
  isModify,
  isLoading,
  restaurantImgs,
  handleChangeRestaurantImgs,
  control,
  name,
}) => {
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({ name: name, control, rules: { required: true } });
  const inputRef = useRef(null);

  if (isLoading) return <Spinner size="xl" color="black" />;

  const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const onUpload = e => {
    if (e.target.files.length === 0) return;
    if (e.target.files.length + restaurantImgs.length > 5) {
      Toast.fire({
        icon: 'error',
        title: '사진은 최대 5개까지 선택 가능합니다.',
      });

      return;
    }

    let newImages = restaurantImgs;
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      //동일한 이미지가 존재합니다.
      if (newImages.some(img => img.name === files[i].name)) {
        Toast.fire({ icon: 'error', title: '동일한 이미지가 존재합니다.' });
        return;
      }

      newImages.push(files[i]);
    }

    onChange(newImages);
    handleChangeRestaurantImgs(newImages);
  };

  const cancelImageUpload = fileName => {
    const newImages = restaurantImgs.filter(file => file.name != fileName);
    onChange(newImages);
    handleChangeRestaurantImgs(newImages);
  };

  return (
    <VStack alignItems={'flex-start'}>
      {restaurantImgs.length === 0 && <FormHelperText>이미지를 등록해주세요.</FormHelperText>}
      <InputGroup p={4} width="500px" overflowX={'scroll'} cursor={'pointer'}>
        <InputLeftElement pointerEvents="none" />
        <input
          {...inputProps}
          onChange={onUpload}
          inputRef={ref}
          ref={inputRef}
          type="file"
          accept={'image/jpeg, image/png'}
          name={name}
          style={{ display: 'none' }}
          multiple
        />
        <HStack>
          {restaurantImgs.map(img => (
            <Box key={img.name} position="relative">
              <Image
                onClick={() => inputRef.current.click()}
                objectFit="cover"
                maxH={'90px'}
                maxW={'120px'}
                minH={'90px'}
                minW={'120px'}
                src={URL.createObjectURL(img)}
                boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
              />
              {isModify && (
                <IconButton
                  position="absolute"
                  top="4px"
                  right="4px"
                  size="sm"
                  onClick={() => {
                    cancelImageUpload(img.name);
                  }}
                  icon={<CloseButton />}
                />
              )}
            </Box>
          ))}
          {isModify && restaurantImgs.length < 5 && (
            <Image
              onClick={() => inputRef.current.click()}
              objectFit="cover"
              maxH={'90px'}
              maxW={'120px'}
              minH={'90px'}
              minW={'120px'}
              src={'http://placehold.it/120x90'}
              boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
            />
          )}
        </HStack>
      </InputGroup>
    </VStack>
  );
};

export default MultiImageFileUpload;
