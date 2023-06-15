import Axios from '@/api/apiConfig';

const ReservationService = {
  getReservationList: async () => {
    const response = await Axios.get('/reservation/list');
    return response.data;
  },

  addReservation: async reservationInfo => {
    const response = await Axios.post('/reservation', reservationInfo);
    return response;
  },

  addReservationWidhPayment: async ({ reservationInfo, impUid }) => {
    const response = await Axios.post('/reservation', reservationInfo, { params: { impUid } });
    return response;
  },

  updateReservation: async reservationInfo => {
    const response = await api.put('/reservation', reservationInfo);

    return response;
  },

  deleteReservation: async reservationNo => {
    const response = await Axios.delete('/reservation', {
      reservationNo,
    });

    return response;
  },
};

export default ReservationService;
