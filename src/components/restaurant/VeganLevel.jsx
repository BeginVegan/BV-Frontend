import React, { useState } from 'react';
import { IconButton, Img, Stack } from '@chakra-ui/react';
import fishIcon from '@/assets/icons/icons-fish.png';
import broccoliIcon from '@/assets/icons/icon-broccoli.png';
import milkIcon from '@/assets/icons/icon-milk.png';
import eggIcon from '@/assets/icons/icons-egg.png';
import meatIcon from '@/assets/icons/icons-meat.png';
import chickenIcon from '@/assets/icons/icon-thanksgiving.png';

const VeganLevel = ({ setValue }) => {
  const [veganLevel, setVeganLevel] = useState(1);

  const changeVeganLevel = level => {
    setVeganLevel(level);
    setValue('restaurantVeganLevel', level);
  };

  return (
    <Stack direction={'row'} justifyContent={'center'} gap={3}>
      <IconButton
        bg={'white'}
        opacity={veganLevel === 1 ? '1' : '0.5'}
        icon={<Img src={broccoliIcon} />}
        onClick={() => changeVeganLevel(1)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 2 ? '1' : '0.5'}
        icon={<Img src={milkIcon} />}
        onClick={() => changeVeganLevel(2)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 3 ? '1' : '0.5'}
        icon={<Img src={eggIcon} />}
        onClick={() => changeVeganLevel(3)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 4 ? '1' : '0.5'}
        icon={<Img src={fishIcon} />}
        onClick={() => changeVeganLevel(4)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 5 ? '1' : '0.5'}
        icon={<Img src={chickenIcon} />}
        onClick={() => changeVeganLevel(5)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 6 ? '1' : '0.5'}
        icon={<Img src={meatIcon} />}
        onClick={() => changeVeganLevel(6)}
      />
    </Stack>
  );
};

export default VeganLevel;
