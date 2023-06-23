import { Heading, Flex, VStack, Card, CardBody, Spinner, Skeleton } from '@chakra-ui/react';
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

  return (
    <>
      <Heading display={'flex'} alignSelf={'flex-start'} color={'#323232'} mb={5}>
        회원 관리
      </Heading>
      <Card bg="gray.100" boxShadow={'none'}>
        <CardBody p={0}>
          <VStack>
            {!memberList && (
              <>
                <Skeleton width={'1288px'} h={'80px'} isLoaded={memberList} borderRadius={'2xl'} />
                <Skeleton width={'1288px'} h={'80px'} isLoaded={memberList} borderRadius={'2xl'} />
                <Skeleton width={'1288px'} h={'800px'} isLoaded={memberList} borderRadius={'2xl'} />
              </>
            )}

            {memberList && <MemberInfo data={memberList} setIsChange={setIsChange}></MemberInfo>}
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default MemberManagement;
