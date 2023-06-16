import React, { useEffect, useState } from 'react';
import { Box, Tooltip, chakra, Spinner, useToast } from '@chakra-ui/react';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import Axios from '@/api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/ROUTES';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';

const CustomRiHeart3Line = chakra(RiHeart3Line);
const CustomRiHeart3Fill = chakra(RiHeart3Fill);

const BookmarkCheck = ({ restaurantNo }) => {
  const navigator = useNavigate();
  const [isBookmark, setIsBookmark] = useState(null);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const toast = useToast();

  useEffect(() => {
    const getBookmarkStatus = async () => {
      try {
        const response = await Axios.get(`member/bookmark/${restaurantNo}`);
        if (response.status === 200) {
          setIsBookmark(response.data);
        }
      } catch (error) {
        // Handle the error
        console.log(error);
      }
    };

    if (isAuthenticated === true) getBookmarkStatus();
    else setIsBookmark(false);
  }, [restaurantNo, isAuthenticated]);

  const bookmarkRestaurant = async () => {
    const bookmark = async () => {
      const res = await Axios.post(`mypage/bookmark/${restaurantNo}`);
      if (res.status === 200) {
        setIsBookmark(true);
        toast({
          title: '즐겨찾기에 추가되었습니다.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      }
    };

    const unBookmark = async () => {
      const res = await Axios.delete(`mypage/bookmark/${restaurantNo}`);
      if (res.status === 200) {
        setIsBookmark(false);
        toast({
          title: '즐겨찾기에서 제거되었습니다.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      }
    };

    if (isBookmark === true) {
      unBookmark();
    } else {
      bookmark();
    }
  };

  if (isAuthenticated != true) {
    return (
      <Tooltip hasArrow label="로그인 후 즐겨찾기 추가해보세요!" bg="red.400" placement="top">
        <Box position="relative" display="inline-block">
          <CustomRiHeart3Line
            size={30}
            fill="red"
            _hover={{ fill: 'red.400', transform: 'scale(1.4)' }}
            onClick={() => navigator(ROUTES.LOGIN)}
          />
        </Box>
      </Tooltip>
    );
  }

  if (isBookmark === null) {
    return <Spinner />;
  }

  if (isBookmark === true) {
    return (
      <CustomRiHeart3Fill
        size={30}
        fill="red"
        _hover={{ fill: 'red.400', transform: 'scale(1.4)' }}
        onClick={bookmarkRestaurant}
      />
    );
  }

  return (
    <CustomRiHeart3Line
      size={30}
      fill="red"
      _hover={{ fill: 'red.400', transform: 'scale(1.4)' }}
      onClick={bookmarkRestaurant}
    />
  );
};

export default BookmarkCheck;
