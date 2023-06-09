import Axios from '@/api/apiConfig';
import useInterval from '@/hooks/useInterval';
import { Button, Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const TimePicker = ({
  restaurantNo,
  selectTime,
  setSelectTime,
  selectDate,
  openTime,
  closeTime,
}) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const formattedDate = format(selectDate, 'yyyy-MM-dd');

  const { data, isLoading, refetch, isRefetching } = useQuery(['getTime', selectDate], async () => {
    const response = await Axios.get(`restaurant/reservation/${restaurantNo}`);
    return response.data;
  });

  useInterval(() => refetch(), 500);

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      const timeList = [];
      const today = data.filter(el => el.includes(formattedDate));
      const open = +openTime.split(':')[0] - 1;
      const close = +closeTime.split(':')[0] + 1;

      today.map(time => {
        const newTime = +time.split(' ')[1].split(':')[0];
        if (open < newTime && newTime < close) timeList.push(newTime);
      });

      setAvailableTimes(timeList);
    }
  }, [isLoading, selectDate, isRefetching]);

  return (
    <Flex gap={4} wrap={'wrap'}>
      {availableTimes.map(time => (
        <Button
          key={time}
          w={'70px'}
          onClick={() => setSelectTime(time)}
          color={selectTime === time ? 'white' : 'black'}
          bgColor={selectTime === time ? 'green.400' : 'green.200'}
          _hover={{ bgColor: 'green.300', color: 'white' }}
        >
          {time}:00
        </Button>
      ))}
      {availableTimes.length === 0 && <Text color={'gray.600'}>예약가능한 시간이 없습니다.</Text>}
    </Flex>
  );
};

export default TimePicker;
