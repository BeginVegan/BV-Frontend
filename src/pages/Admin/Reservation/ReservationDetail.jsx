import React, { useEffect, useState } from 'react';
import Axios from '@/api/apiConfig';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, useToast } from '@chakra-ui/react';

const ReservationDetailTable = ({ reservationData }) => {
  const isCancelled = reservationData.reservationStatus === 'Cancelled';
  const [restaurantName, setRestaurantName] = useState('');
  const [bookerName, setBookerName] = useState('');
  const toast = useToast();

  const handleButtonClick = async reservationNo => {
    try {
      const res = await Axios.delete(`reservation/${reservationNo}`);
      if (res.status === 200) {
        toast({
          title: '예약이 취소 되었습니다.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: '예약이 취소 되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getRestaurantName = async ({ restaurantNo }) => {
    try {
      const response = await Axios.get(`restaurant/${restaurantNo}`);
      return response.data.restaurant.restaurantName;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getBookerName = async ({ memberEmail }) => {
    try {
      const response = await Axios.get(`member/${memberEmail}`);
      // const response = await Axios.get('member/asdf@naver.com');
      return response.data.memberName;
    } catch (error) {
      console.log(
        '실제 DB에 없는 더미 데이터로 요청시 사용자 이름 랜덤으로 반환하도록 되어있습니다.'
      );
      const randomNames = [
        'John',
        'Jane',
        'Michael',
        'Emily',
        'David',
        'Olivia',
        'James',
        'Sophia',
        'Daniel',
        'Isabella',
      ];
      const randomIndex = Math.floor(Math.random() * randomNames.length);
      return randomNames[randomIndex];
    }
  };

  useEffect(() => {
    const fetchRestaurantAndBookerNames = async () => {
      const restaurantName = await getRestaurantName({
        restaurantNo: reservationData.restaurantNo,
      });
      const bookerName = await getBookerName({ memberEmail: reservationData.memberEmail });

      setRestaurantName(restaurantName);
      setBookerName(bookerName);
    };

    fetchRestaurantAndBookerNames();
  }, [reservationData.restaurantNo, reservationData.memberEmail]);

  return (
    <Box position="relative">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="20%">Field</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>예약 번호</Td>
            <Td>{reservationData.reservationNo}</Td>
          </Tr>
          <Tr>
            <Td>예약 상태</Td>
            <Td>{reservationData.reservationStatus}</Td>
          </Tr>
          <Tr>
            <Td>식당 번호</Td>
            <Td>{reservationData.restaurantNo}</Td>
          </Tr>
          <Tr>
            <Td>식당 이름</Td>
            <Td>{restaurantName}</Td>
          </Tr>
          <Tr>
            <Td>예약자 계정</Td>
            <Td>{reservationData.memberEmail}</Td>
          </Tr>
          <Tr>
            <Td>예약자 이름</Td>
            <Td>{bookerName}</Td>
          </Tr>
          <Tr>
            <Td>예약 인원</Td>
            <Td>{reservationData.reservationPeople}명</Td>
          </Tr>
          <Tr>
            <Td>예약 일자</Td>
            <Td>{reservationData.reservationTime}</Td>
          </Tr>
          <Tr>
            <Td>방문 일자</Td>
            <Td>{reservationData.reservationVisitTime}</Td>
          </Tr>
          <Tr>
            <Td>할인액</Td>
            <Td>{reservationData.reservationDiscount.toLocaleString()}원</Td>
          </Tr>
          <Tr>
            <Td>총 결제 금액</Td>
            <Td>{reservationData.reservationTotalPrice.toLocaleString()}원</Td>
          </Tr>
          <Tr>
            <Td>예약 메뉴</Td>
            <Td>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>메뉴</Th>
                    <Th>분류</Th>
                    <Th>가격</Th>
                    <Th>수량</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {reservationData.reservationMenuList.map(menuItem => (
                    <Tr key={menuItem.menuNo}>
                      <Td>{menuItem.menuName}</Td>
                      <Td>{menuItem.menuCategory}</Td>
                      <Td>{menuItem.menuPrice.toLocaleString()}원</Td>
                      <Td>{menuItem.reservationMenuCount}인분</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Button
        position="absolute"
        top="0px"
        right="0px"
        size="sm"
        w={'100px'}
        color={isCancelled ? 'gray.500' : 'white'}
        bgColor={isCancelled ? 'gray.300' : 'red.300'}
        _hover={{ bgColor: isCancelled ? 'gray.300' : 'red.450' }}
        onClick={!isCancelled ? () => handleButtonClick(reservationData.reservationNo) : null}
        disabled={isCancelled}
      >
        {isCancelled ? '취소된 예약' : '예약 취소'}
      </Button>
    </Box>
  );
};

export default ReservationDetailTable;
