import Axios from '@/api/apiConfig';
import { useEffect, useState } from 'react';

export const useRestaurantDetail = restaurantNo => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`restaurant/${restaurantNo}`);
      if (res.status === 200) {
        setData(res.data.restaurant);
      }
    };

    fetchData();
  }, [restaurantNo]);

  return { data };
};
