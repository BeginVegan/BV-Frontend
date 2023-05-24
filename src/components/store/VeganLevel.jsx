import React from 'react';
import { IconButton, Img, Stack } from '@chakra-ui/react';
import fishIcon from '@/assets/icons/icons-fish.png';
import broccoliIcon from '@/assets/icons/icon-broccoli.png';
import milkIcon from '@/assets/icons/icon-milk.png';
import eggIcon from '@/assets/icons/icons-egg.png';
import meatIcon from '@/assets/icons/icons-meat.png';
import chickenIcon from '@/assets/icons/icon-thanksgiving.png';

const VeganLevel = ({ veganLevel, setVeganLevel }) => {
  return (
    <Stack direction={'row'} justifyContent={'center'} gap={3}>
      <IconButton
        bg={'white'}
        opacity={veganLevel === 0 ? '1' : '0.5'}
        icon={<Img src={broccoliIcon} />}
        onClick={() => setVeganLevel(0)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 1 ? '1' : '0.5'}
        icon={<Img src={milkIcon} />}
        onClick={() => setVeganLevel(1)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 2 ? '1' : '0.5'}
        icon={<Img src={eggIcon} />}
        onClick={() => setVeganLevel(2)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 3 ? '1' : '0.5'}
        icon={<Img src={fishIcon} />}
        onClick={() => setVeganLevel(3)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 4 ? '1' : '0.5'}
        icon={<Img src={chickenIcon} />}
        onClick={() => setVeganLevel(4)}
      />
      <IconButton
        bg={'white'}
        opacity={veganLevel === 5 ? '1' : '0.5'}
        icon={<Img src={meatIcon} />}
        onClick={() => setVeganLevel(5)}
      />
    </Stack>
  );
};

export default VeganLevel;
