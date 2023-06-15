import ReservationService from '@/api/ReservationService';
import { useMutation } from 'react-query';

export const useReservation = () => useMutation(ReservationService.addReservation);
