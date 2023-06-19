import React, { useState } from 'react';
import Axios from '@/api/apiConfig';
import { Box, Text, Select, Input, Button, HStack, useToast } from '@chakra-ui/react';
import getCurrentTime from '@/pages/Admin/Member/getCurrentTime';

const PointIndividualProvider = ({ memberData }) => {
  const toast = useToast();

  const pointProvider = async () => {
    if (pointProvide.point === '')
      toast({
        title: '포인트가 지급액을 선택하시오.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    if (pointProvide.context === '')
      toast({
        title: '포인트가 지급 내용을 작성하시오.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });

    if (pointProvide.point != '' && pointProvide.context != '')
      try {
        const res = await Axios.post(`mypage/point-history`, {
          memberEmail: memberData.memberEmail,
        });
        const pointResult = res.data[res.data.length - 1].pointResult;

        const response = await Axios.put(`member/modifyPoint`, {
          memberEmail: memberData.memberEmail,
          pointDiv: pointProvide.context,
          pointTime: getCurrentTime(),
          pointChange: pointProvide.point,
          pointResult: parseFloat(pointResult) + parseFloat(pointProvide.point),
        });

        if (response.status === 200) {
          toast({
            title: '포인트가 지급되었습니다.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setPointProvide(prevState => ({ ...prevState, point: '' }));
          setPointProvide(prevState => ({ ...prevState, context: '' }));
        }
      } catch (error) {
        console.error(error);
        return null;
      }
  };

  const [pointProvide, setPointProvide] = useState({
    point: '',
    context: '',
  });

  return (
    <Box
      pr={6}
      pl={6}
      w={800}
      h={20}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      border={'none'}
    >
      <HStack mt={5} mb={5} w={1232}>
        <Text w={'150px'} fontWeight={600} color={'gray.400'} fontSize="sm">
          포인트 지급
        </Text>
        <Select
          w={'160px'}
          placeholder="포인트"
          color={'gray.500'}
          value={pointProvide.point}
          onChange={e => setPointProvide(prevState => ({ ...prevState, point: e.target.value }))}
        >
          <option value="100">100 point</option>
          <option value="500">500 point</option>
          <option value="1000">1,000 point</option>
          <option value="3000">3,000 point</option>
          <option value="5000">5,000 point</option>
        </Select>
        <Input
          w={'340px'}
          placeholder="지급 내용"
          value={pointProvide.context}
          onChange={e => setPointProvide(prevState => ({ ...prevState, context: e.target.value }))}
        />
        <Button
          onClick={pointProvider}
          bg="#48BB78"
          color="white"
          _hover={{ bg: '#3F995E' }}
          mr={2}
          width={'100px'}
        >
          지급
        </Button>
      </HStack>
    </Box>
  );
};

export default PointIndividualProvider;
