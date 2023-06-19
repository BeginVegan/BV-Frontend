import React, { useEffect, useState } from 'react';
import { IconButton, Img, Stack } from '@chakra-ui/react';
import fishIcon from '@/assets/icons/icons-fish.png';
import broccoliIcon from '@/assets/icons/icon-broccoli.png';
import milkIcon from '@/assets/icons/icon-milk.png';
import eggIcon from '@/assets/icons/icons-egg.png';
import meatIcon from '@/assets/icons/icons-meat.png';
import chickenIcon from '@/assets/icons/icon-thanksgiving.png';

const VeganLevel = ({ setValue, level, isClickable = false }) => {
  const [veganLevel, setVeganLevel] = useState(level ? level : 7);

  useEffect(() => {
    if (level) setVeganLevel(level);
  }, [level]);

  const changeVeganLevel = num => {
    setVeganLevel(num);
    setValue('restaurantVeganLevel', num);
  };

  return (
    <Stack direction={'row'} justifyContent={'center'} gap={3}>
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 1 ? '1' : '0.4'}
        icon={<Img src={broccoliIcon} />}
        onClick={() => isClickable && changeVeganLevel(1)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 2 ? '1' : '0.4'}
        icon={<Img src={milkIcon} />}
        onClick={() => isClickable && changeVeganLevel(2)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 3 ? '1' : '0.4'}
        icon={<Img src={eggIcon} />}
        onClick={() => isClickable && changeVeganLevel(3)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 4 ? '1' : '0.4'}
        icon={<Img src={fishIcon} />}
        onClick={() => isClickable && changeVeganLevel(4)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 5 ? '1' : '0.4'}
        icon={<Img src={chickenIcon} />}
        onClick={() => isClickable && changeVeganLevel(5)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 6 ? '1' : '0.4'}
        icon={<Img src={meatIcon} />}
        onClick={() => isClickable && changeVeganLevel(6)}
      />
    </Stack>
  );
};

export default VeganLevel;
