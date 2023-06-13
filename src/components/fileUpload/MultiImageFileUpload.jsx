import React, { useRef, useState } from 'react';
import {
  FormHelperText,
  HStack,
  Image,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import Swal from 'sweetalert2';

const MultiImageFileUpload = ({ control, name, errors }) => {
  const inputRef = useRef(null);
  const [imageSrcs, setImageSrcs] = useState([]);

  const onUpload = e => {
    if (e.target.files.length === 0) return;
    if (e.target.files.length > 3) {
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

      Toast.fire({
        icon: 'error',
        title: '사진은 최대 3개까지 선택 가능합니다.',
      });
      return;
    }

    let newImageSrcs = [];
    const files = e.target.files;
    onChange(files);

    for (let i = 0; i < files.length; i++) {
      newImageSrcs.push(URL.createObjectURL(files[i]));
    }

    setImageSrcs(newImageSrcs);
  };

  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({ name: name, control, rules: { required: true } });

  return (
    <VStack alignItems={'flex-start'}>
      {errors.restaurantImages && <FormHelperText>이미지를 등록해주세요.</FormHelperText>}
      <InputGroup cursor={'pointer'}>
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
          {imageSrcs.length === 0 ? (
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
          ) : (
            imageSrcs.map(img => (
              <Image
                onClick={() => inputRef.current.click()}
                objectFit="cover"
                maxH={'90px'}
                maxW={'120px'}
                minH={'90px'}
                minW={'120px'}
                src={img}
                boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
              />
            ))
          )}
        </HStack>
      </InputGroup>
    </VStack>
  );
};

export default MultiImageFileUpload;
