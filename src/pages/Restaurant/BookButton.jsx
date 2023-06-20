import React from 'react';
import { ROUTES } from '@/routes/ROUTES';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { Button } from '@chakra-ui/react';
import { loginMenuAtom } from '@/utils/atoms/loginMenuAtom';

const BookButton = ({ restaurantNo }) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoginMenuOpen, setIisLoginMenuOpen] = useAtom(loginMenuAtom);

  const navigator = useNavigate();

  if (isAuthenticated === true)
    return (
      <Button
        color={'white'}
        bgColor={'green.400'}
        _hover={{ bgColor: 'green.300', transform: 'scale(1.2)' }}
        onClick={() => navigator(`${ROUTES.RESTAURANT_RESERVATION_RAW}/${restaurantNo}`)}
      >
        예약하기
      </Button>
    );

  return (
    <Button
      color={'white'}
      bgColor={'green.400'}
      _hover={{ bgColor: 'green.300', transform: 'scale(1.2)' }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setIisLoginMenuOpen(true);
      }}
    >
      예약하기
    </Button>
  );
};

export default BookButton;
