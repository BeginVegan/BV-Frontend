import { Flex, Image, HStack, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import Axios from '@/api/apiConfig';

const RestaurantImg = ({ imageDir }) => {
  const [restaurantImg, setRestaurantImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`restaurant/img/${imageDir}`);
        if (res.status === 200) {
          const data = res.data;
          const images = data.map((imgUrl, index) => ({ url: imgUrl }));
          setRestaurantImg(images);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [imageDir]);

  if (restaurantImg === null) {
    return <Spinner />;
  }
  console.log(restaurantImg);
  return (
    <Flex w={600} h={400}>
      <SimpleImageSlider
        width={'100%'}
        height={400}
        images={restaurantImg}
        showBullets={true}
        showNavs={true}
      />
    </Flex>
  );
};

export default RestaurantImg;
