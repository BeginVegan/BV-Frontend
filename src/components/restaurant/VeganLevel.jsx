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
    if (!level) {
      setVeganLevel(num);
      setValue('restaurantVeganLevel', num);
    }
  };

  return (
    <Stack direction={'row'} justifyContent={'center'} gap={3}>
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 1 ? '1' : '0.4'}
        icon={<Img src={broccoliIcon} />}
        onClick={() => (isClickable ? !level && changeVeganLevel(1) : null)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 2 ? '1' : '0.4'}
        icon={<Img src={milkIcon} />}
        onClick={() => (isClickable ? !level && changeVeganLevel(2) : null)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 3 ? '1' : '0.4'}
        icon={<Img src={eggIcon} />}
        onClick={() => (isClickable ? !level && changeVeganLevel(3) : null)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 4 ? '1' : '0.4'}
        icon={<Img src={fishIcon} />}
        onClick={() => (isClickable ? !level && changeVeganLevel(4) : null)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 5 ? '1' : '0.4'}
        icon={<Img src={chickenIcon} />}
        onClick={() => (isClickable ? !level && changeVeganLevel(5) : null)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel != 7 && veganLevel >= 6 ? '1' : '0.4'}
        icon={<Img src={meatIcon} />}
        onClick={() => (isClickable ? !level && changeVeganLevel(6) : null)}
      />
    </Stack>
  );
};

export default VeganLevel;
