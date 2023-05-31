import api from '@/api/apiConfig';

const RestaurantService = {
  getRestaurantList: async () => {
    const response = await api.get('/restaurant/list');
    return response.data;
  },
};

export default RestaurantService;
