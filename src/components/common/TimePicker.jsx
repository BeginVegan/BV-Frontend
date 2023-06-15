import Axios from '@/api/apiConfig';
import { Button, Flex } from '@chakra-ui/react';
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

  const { data, isLoading } = useQuery(['getTime', selectDate], async () => {
    const response = await Axios.get(`restaurant/reservation/${restaurantNo}`);
    return response.data;
  });

  useEffect(() => {
    if (!isLoading) {
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
  }, [isLoading, selectDate]);

  return (
    <Flex gap={4} wrap={'wrap'}>
      {availableTimes.map(time => (
        <Button
          key={time}
          w={'70px'}
          onClick={() => setSelectTime(time)}
          bgColor={selectTime === time && 'gray.300'}
          _hover={{ bgColor: 'gray.300' }}
        >
          {time}:00
        </Button>
      ))}
    </Flex>
  );
};

export default TimePicker;
