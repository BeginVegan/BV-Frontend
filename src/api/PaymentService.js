import Axios from '@/api/apiConfig';

const PaymentService = {
  getPaymentList: async () => {
    const response = await Axios.get('/payment/list');
    return response.data;
  },

  getPaymentListByMemberEmail: async () => {
    const response = await Axios.get('/payment/memberEmail');
    return response.data;
  },

  getPaymentByImpUid: async impUid => {
    const response = await Axios.get('/payment/impUid', { params: { impUid } });
    return response.data;
  },

  getPaymentByRreservationNo: async reservationNo => {
    const response = await Axios.get('/payment/reservationNo', {
      params: { reservationNo: reservationNo },
    });
    return response.data;
  },

  addPayment: async paymentInfo => {
    const response = await Axios.post('/payment', paymentInfo);

    return response;
  },

  updatePayment: async paymentInfo => {
    const response = await Axios.put('/payment', paymentInfo);

    return response;
  },

  removePayment: async impUid => {
    const response = await Axios.delete('/payment', { params: { impUid } });
    return response;
  },
};

export default PaymentService;
