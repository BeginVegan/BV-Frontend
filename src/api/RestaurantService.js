import Axios from '@/api/apiConfig';

const RestaurantService = {
  getRestaurantList: async () => {
    const response = await Axios.get('/restaurant/list');
    return response.data;
  },

  addRestaurant: async ({ restaurantInfo, restaurantImages, options }) => {
    const formData = new FormData();

    for (let i = 0; i < restaurantImages.length; i++) {
      formData.append('restaurantImages', restaurantImages[i]);
    }

    formData.append(
      'restaurantDTO',
      new Blob([JSON.stringify(restaurantInfo)], { type: 'application/json' })
    );

    const response = await Axios.post('/restaurant', formData, options);

    return response;
  },

  updateRestaurant: async RestaurantId => {
    const response = await Axios.put('/restaurant', {
      RestaurantId,
    });

    return response;
  },

  deleteRestaurant: async RestaurantId => {
    const response = await Axios.delete('/restaurant', {
      RestaurantId,
    });

    return response;
  },
};

export default RestaurantService;
