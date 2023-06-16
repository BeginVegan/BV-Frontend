import { Box, HStack, VStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import FormattedDateTime from '@/pages/Restaurant/FormattedDateTime';
import ReservationMenu from '@/pages/Restaurant/ReservationMenu';
import StarRating from '@/pages/Restaurant/StarRating';

const RestaurntReview = ({ reviewList }) => (
  <React.Fragment>
    {reviewList.length === 0 ? (
      <Text fontWeight={600} color={'gray.200'} fontSize="md">
        리뷰가 없습니다.
      </Text>
    ) : (
      reviewList.map((review, index) => (
        <HStack
          key={index}
          w={'600px'}
          gap={4}
          alignItems={'flex-start'}
          justifyContent={'space-around'}
        >
          <VStack w={'150px'} gap={0} alignItems={'flex-start'} justifyContent={'space-around'}>
            <Box fontWeight={400} fontSize="lg" color={'gray.400'}>
              {review.memberEmail}
            </Box>
            <Box>
              <Image objectFit="cover" h={'120px'} w={'120px'} src={review.reviewPhotoDir} />
            </Box>
          </VStack>
          <VStack w={'450px'} alignItems={'flex-start'}>
            <HStack justifyContent="space-between" w="100%">
              <Box>
                <StarRating roundedStarRating={Math.round(review.reviewStar)} starSize={24} />
              </Box>
              <Box textAlign="right">
                <Box fontWeight={400} fontSize="md" color={'gray.400'}>
                  <ReservationMenu reservationNo={review.reservationNo} />
                </Box>
              </Box>
            </HStack>
            <HStack justifyContent="space-between" w="100%">
              <Box fontWeight={200} color={'gray.400'} fontSize="sm">
                <FormattedDateTime timestamp={review.reviewTime} />
              </Box>
            </HStack>
            <Box>
              <Box fontWeight={400} color={'black'} fontSize="sm">
                {review.reviewContent}
              </Box>
            </Box>
          </VStack>
        </HStack>
      ))
    )}
  </React.Fragment>
);

export default RestaurntReview;
