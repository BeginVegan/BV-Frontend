import RestaurantService from '@/api/RestaurantService';
import useErrorApi from './useErrorApi';
import { useQuery } from 'react-query';

const useRestaurantQuery = option => {
  const { handleError } = useErrorApi();

  return useQuery('getRestaurant', RestaurantService.getRestaurantList, {
    onError: error => {
      handleError(error);
    },
    ...option,
  });
};

export default useRestaurantQuery;
