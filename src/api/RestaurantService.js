import Axios from './apiConfig';

const RestaurantService = {
  getRestaurantList: async () => {
    const response = await Axios.get('/restaurant/list');
    return response.data;
  },
};

export default RestaurantService;
