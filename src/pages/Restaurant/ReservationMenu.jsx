import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import Axios from '@/api/apiConfig';

const ReservationMenu = ({ reservationNo }) => {
  const [reservationMenuInfo, setReservationMenuInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`reservation/${reservationNo}`);
      if (res.status === 200) {
        const data = res.data.reservationMenuList;
        setReservationMenuInfo(data);
      }
    };

    fetchData();
  }, [reservationNo]);
  if (reservationMenuInfo === null) return <Spinner />;
  else if (reservationMenuInfo.length > 1) {
    return reservationMenuInfo[0].menuName + ' 외  ' + (reservationMenuInfo.length - 1) + '개';
  } else return reservationMenuInfo[0].menuName;
};

export default ReservationMenu;
