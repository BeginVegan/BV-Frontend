import React, { useRef, useState } from 'react';
import { HStack, Image, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

const MultiImageFileUpload = ({ control, name }) => {
  const inputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState([]);

  const onUpload = e => {
    if (e.target.files.length === 0) return;

    const files = e.target.files;
    onChange(files);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    return new Promise(resolve => {
      reader.onload = () => {
        setImageSrc([...imageSrc, reader.result]); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({ name: name, control, rules: { required: false } });

  return (
    <InputGroup h={'90px'} w={'120px'} cursor={'pointer'}>
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
        <Image
          onClick={() => inputRef.current.click()}
          value={value}
          objectFit="cover"
          maxH={'90px'}
          maxW={'120px'}
          minH={'90px'}
          minW={'120px'}
          src={imageSrc[0] || 'http://placehold.it/120x90'}
          boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
        />
        <Image
          onClick={() => inputRef.current.click()}
          value={value}
          objectFit="cover"
          maxH={'90px'}
          maxW={'120px'}
          minH={'90px'}
          minW={'120px'}
          src={imageSrc[1] || 'http://placehold.it/120x90'}
          boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
        />
        <Image
          onClick={() => inputRef.current.click()}
          value={value}
          objectFit="cover"
          maxH={'90px'}
          maxW={'120px'}
          minH={'90px'}
          minW={'120px'}
          src={imageSrc[2] || 'http://placehold.it/120x90'}
          boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
        />
      </HStack>
    </InputGroup>
  );
};

export default MultiImageFileUpload;
