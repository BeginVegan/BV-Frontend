import Axios from '@/api/apiConfig';
import { useEffect, useState } from 'react';

export const useRestaurantDetail = restaurantNo => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await Axios.get(`restaurant/${restaurantNo}`);
      if (res.status === 200) {
        setData(res.data.restaurant);
      }  
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [restaurantNo]);

  return { data, fetchData };
};
