import Axios from '@/api/apiConfig';

const MenuService = {
  getMenuList: async restauranNo => {
    const response = await Axios.get(`/menu/list/${restauranNo}`);
    return response.data;
  },

  addMenu: async ({ menuInfo, menuImage, options }) => {
    const formData = new FormData();

    if (menuImage) {
      formData.append('menuImage', menuImage);
    }

    formData.append('menuDTO', new Blob([JSON.stringify(menuInfo)], { type: 'application/json' }));

    const response = await Axios.post('/menu', formData, options);

    return response;
  },

  updateMenu: async ({ menuInfo }) => {
    const response = await Axios.put('/menu', menuInfo);

    return response;
  },

  deleteMenu: async restauranNo => {
    const response = await Axios.delete(`/menu/${restauranNo}`);
    return response;
  },
};

export default MenuService;
