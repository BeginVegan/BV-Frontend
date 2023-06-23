import { Box, Skeleton, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import Axios from '@/api/apiConfig';
import { css } from '@emotion/react';

const RestaurantImg = ({ ImgWidth, ImgHight, imageDir }) => {
  const [restaurantImg, setRestaurantImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(`restaurant/img/${imageDir}`);
      if (res.status === 200) {
        const data = res.data;
        const images = data.map((imgUrl, index) => ({ url: imgUrl }));
        setRestaurantImg(images);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (imageDir) {
      fetchData();
    }
  }, [imageDir]);

  if (isLoading) {
    return <Skeleton width={ImgWidth ? ImgWidth : 600} height={ImgHight ? ImgHight : 400} />;
  }
  return (
    <SimpleImageSlider
      width={ImgWidth ? ImgWidth : 600}
      height={ImgHight ? ImgHight : 400}
      images={restaurantImg}
      showBullets={true}
      showNavs={true}
    />
  );
};

export default RestaurantImg;
