import React, { useRef, useState } from 'react';
import { Image, InputGroup, InputLeftElement, Toast } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import Swal from 'sweetalert2';

const ImageFileUpload = ({ control, name }) => {
  const inputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const Toast = Swal.mixin({
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: toast => {
      document.querySelector('.swal2-container').style.zIndex = 20000;
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const onUpload = e => {
    if (e.target.files.length === 0) return;

    // 파일 사이즈가 5MB 이상이면 업로드를 막음
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      Toast.fire({ icon: 'error', title: '이미지 최대크기는 5MB입니다.' });
      return;
    }

    const file = e.target.files[0];
    onChange(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise(resolve => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
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
      />
      <Image
        onClick={() => inputRef.current.click()}
        value={value}
        objectFit="cover"
        h={'90px'}
        w={'120px'}
        src={imageSrc || 'http://placehold.it/120x90'}
        boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
      />
    </InputGroup>
  );
};

export default ImageFileUpload;
