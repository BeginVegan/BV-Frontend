import React, { useState } from 'react';
import { Button, systemProps } from '@chakra-ui/react';
import Axios from 'axios';

const ChangeRole = ({ memberData }) => {
  const [memberRole, setMemberRole] = useState(memberData.memberRole);

  const handleButtonClick = async () => {
    try {
      if (memberRole === 'admin') {
        await Axios.get(`member/role/normal`, {
          params: {
            memberEmail: memberData.memberEmail,
          },
        });
        setMemberRole('normal');
      } else {
        await Axios.get(`member/role/admin`, {
          params: {
            memberEmail: memberData.memberEmail,
          },
        });
        setMemberRole('admin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      position="absolute"
      top="0px"
      right="0px"
      size="sm"
      w={'120px'}
      color={memberRole === 'admin' ? 'gray.500' : 'white'}
      bgColor={memberRole === 'admin' ? 'gray.300' : 'red.300'}
      _hover={{ bgColor: memberRole === 'admin' ? 'gray.300' : 'red.450' }}
      onClick={!memberRole ? handleButtonClick : null}
    >
      {memberRole ? '회원으로 강등' : '관리자 권한 부여'}
    </Button>
  );
};

export default ChangeRole;
