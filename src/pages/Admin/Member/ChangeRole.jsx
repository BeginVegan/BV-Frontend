import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import Swal from 'sweetalert2';

const ChangeRole = ({ memberData, setIsChange }) => {
  const [memberRole, setMemberRole] = useState(memberData.memberRole);
  const toast = useToast();

  const handleButtonClick = async () => {
    const result = await Swal.fire({
      title:
        memberRole === 'admin' ? '권한을 일반 회원으로 수정합니다.' : '관리자 권한을 부여합니다.',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    });

    if (result.isConfirmed) {
      try {
        if (memberRole === 'admin') {
          await Axios.put(`member/role/normal`, {
            memberEmail: memberData.memberEmail,
          });
          setMemberRole('normal');
        } else {
          await Axios.put(`member/role/admin`, {
            memberEmail: memberData.memberEmail,
          });
          setMemberRole('admin');
        }
        toast({
          title: '권한이 수정 되었습니다.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setIsChange(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Button
      w={'160px'}
      color={'white'}
      bgColor={'red.300'}
      _hover={{ bgColor: 'red.450' }}
      onClick={handleButtonClick}
    >
      {memberRole === 'admin' ? '회원으로 강등' : '관리자 권한 부여'}
    </Button>
  );
};

export default ChangeRole;
