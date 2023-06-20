import { Heading, Flex, VStack, Card, CardBody, Spinner } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';
import React, { useEffect, useState } from 'react';
import MemberInfo from '@/pages/Admin/Member/MemberInfo';

const MemberManagement = () => {
  const [memberList, setMemberList] = useState(null);
  const [isChange, setIsChange] = useState(false);

  const getMembers = async () => {
    const res = await Axios.get('member/list');
    if (res.status === 200) {
      setMemberList(res.data);
    }
  };

  useEffect(() => {
    setIsChange(false);
    getMembers();
  }, [isChange]);

  if (!memberList) {
    return (
      <Flex w={1288} h={1000} justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Heading display={'flex'} alignSelf={'flex-start'} color={'#323232'} mb={5}>
        회원 관리
      </Heading>
      <Flex w={'100%'}>
        <Card bg="#f8f8ff" boxShadow={'none'}>
          <CardBody p={0}>
            <VStack>
              <MemberInfo data={memberList} setIsChange={setIsChange}></MemberInfo>
            </VStack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default MemberManagement;
