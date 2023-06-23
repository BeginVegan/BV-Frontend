import { PhoneIcon, StarIcon } from '@chakra-ui/icons';
import { HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({
  restaurant,
  setSelectedRestaurantNo,
  setMapCenter,
  setOpenMarker,
  setIsPanto,
  setIsDetailOpen,
}) => {
  const navigate = useNavigate();

  return (
    <Stack
      _hover={{ bg: 'gray.200' }}
      cursor={'pointer'}
      borderRadius="lg"
      w={'375px'}
      direction={'column'}
      onClick={() => {
        setSelectedRestaurantNo(restaurant.restaurantNo);
        setIsDetailOpen(true);
        setMapCenter({ lat: restaurant.restaurantX, lng: restaurant.restaurantY - 0.014 });
        setOpenMarker({
          restaurantNo: restaurant.restaurantNo,
          title: restaurant.restaurantName,
          latlng: { lat: restaurant.restaurantX, lng: restaurant.restaurantY },
          isOpen: true,
        });
        setIsPanto(true);
      }}
      px={5}
      py={3}
    >
      <VStack display={'flex'} alignItems={'flex-start'}>
        <Text
          fontWeight={600}
          textAlign={'left'}
          _hover={{
            cursor: 'pointer',
            color: 'blue.500',
          }}
          onClick={() => navigate(`/restaurant/${restaurant.restaurantNo}`)}
          fontSize={'xl'}
        >
          {restaurant.restaurantName}
        </Text>
      </VStack>
      <HStack>
        <Image
          borderRadius={'md'}
          minW={150}
          maxW={150}
          minH={120}
          maxH={120}
          boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
          objectFit="cover"
          src={
            restaurant.restaurantPhotoDir
              ? `${restaurant.restaurantPhotoDir}`
              : 'https://bv-image.s3.ap-northeast-2.amazonaws.com/restaurant/default.png'
          }
        />
        <Stack
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          p={1}
          pt={2}
        >
          <HStack h={21}>
            <StarIcon mb={+1} boxSize={4} color={'yellow.500'} />
            <Text fontSize={'sm'} color={'gray.500'} fontWeight={400}>
              {restaurant.restaurantStar.toFixed(1)}
            </Text>
            <Text fontSize={'sm'} color={'gray.500'} fontWeight={400}>
              비건레벨: {restaurant.restaurantVeganLevel}
            </Text>
          </HStack>
          <Text fontWeight={400} color={'gray.500'} fontSize={'sm'}>
            {restaurant.restaurantAddress.length > 13
              ? restaurant.restaurantAddress.slice(0, 13) + '..'
              : restaurant.restaurantAddress}
          </Text>
          <HStack>
            <PhoneIcon color={'gray.500'} />
            <Text fontWeight={300} color={'gray.500'} fontSize={'sm'}>
              {restaurant.restaurantPhone != null && `${restaurant.restaurantPhone}`}
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default RestaurantCard;
