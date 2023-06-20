import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import Swal from 'sweetalert2';

const Withdrawal = ({ memberData, setIsChange }) => {
  const toast = useToast();

  const handleButtonClick = async () => {
    const result = await Swal.fire({
      title: '회원을 탈퇴 처리하시겠습니까?',
      text: '회원 데이터가 영구적으로 삭제됩니다.',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    });

    if (result.isConfirmed) {
      try {
        const res = await Axios.delete(`member/delete`, {
          data: {
            memberEmail: memberData.memberEmail,
          },
        });
        if (res.status === 200) {
          toast({
            title: '회원이 탈퇴 처리되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setIsChange(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Button
      w={'120px'}
      color={'white'}
      bgColor={'red.300'}
      _hover={'red.450'}
      onClick={handleButtonClick}
    >
      {'회원 탈퇴'}
    </Button>
  );
};

export default Withdrawal;
