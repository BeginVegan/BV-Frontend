import Axios from '@/api/apiConfig';
import { ROUTES } from '@/routes/ROUTES';
import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmitReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('No file chosen');

  const { reservationNo: reserNo, restaurantNo: restNo } = location.state;

  const [reservationNo, setReservationNo] = useState(0);
  const [restaurantNo, setRestaurantNo] = useState(0);
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState(null);

  const toast = useToast();

  useEffect(() => {
    console.log(reserNo, restNo);
    setReservationNo(reserNo);
    setRestaurantNo(restNo);
  }, [reserNo, restNo]);
  const submitForm = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        'reviewDTO',
        new Blob(
          [
            JSON.stringify({
              reservationNo,
              restaurantNo,
              reviewStar,
              reviewContent,
            }),
          ],
          {
            type: 'application/json',
          }
        )
      );
      formData.append('reviewImage', reviewPhoto);

      await Axios.post('/mypage/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Review submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate(ROUTES.MYPAGE_MAIN);
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Text fontSize={'3xl'} fontWeight={'extrabold'} pos={'absolute'} top={'10%'} left={'50%'}>
        리뷰작성
      </Text>
      <Divider pos={'absolute'} top={'15%'} w={'50%'} />
      <Spacer />
      <Box
        width={'50%'}
        height={'100%'}
        as="form"
        onSubmit={submitForm}
        p={5}
        shadow="md"
        borderWidth="1px"
      >
        <FormControl id="reviewStar" isRequired mt={4}>
          <FormLabel fontWeight={'bold'} fontSize={'xl'}>
            별점
          </FormLabel>
          <Box display="flex" mt={1}>
            {[1, 2, 3, 4, 5].map(rating => (
              <StarIcon
                key={rating}
                cursor="pointer"
                w={6}
                h={6}
                onClick={() => setReviewStar(rating)}
                color={rating <= reviewStar ? 'yellow.400' : 'gray.300'}
                mr={'5px'}
              />
            ))}
          </Box>
        </FormControl>

        <FormControl id="reviewContent" isRequired mt={4}>
          <FormLabel fontWeight={'bold'} fontSize={'xl'}>
            리뷰 내용
          </FormLabel>

          <Textarea value={reviewContent} onChange={e => setReviewContent(e.target.value)} />
        </FormControl>

        <FormControl id="reviewPhoto" mt={4}>
          <FormLabel htmlFor="reviewPhoto" fontWeight={'bold'} fontSize={'xl'}>
            사진 파일
          </FormLabel>

          <Input
            type="file"
            display="none"
            id="fileInput"
            onChange={e => {
              const file = e.target.files[0];
              // 파일 사이즈가 5MB 이상이면 업로드를 막음
              if (file && file.size > 5 * 1024 * 1024) {
                toast({
                  title: 'File is too large',
                  description: 'Please upload a file smaller than 5MB.',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                e.target.value = ''; // 파일 선택을 취소함
              } else {
                setReviewPhoto(file);
                setFileName(file ? file.name : 'No file chosen');
              }
            }}
          />
          <HStack>
            <Button size={'sm'} onClick={() => document.getElementById('fileInput').click()}>
              선택
            </Button>
            <Box
              width={'100%'}
              border={'1px'}
              p={'3px'}
              borderRadius={'5px'}
              borderColor={'gray.300'}
              color={'gray.500'}
            >
              <HStack>
                <Text pl={'1rem'}>{fileName}</Text>
                <Spacer />
                <Button
                  onClick={() => {
                    setReviewPhoto(null);
                    setFileName('No file chosen');
                  }}
                  size={'sm'}
                >
                  x
                </Button>
              </HStack>
            </Box>
          </HStack>
        </FormControl>

        <Button colorScheme="green" type="submit" mt={4}>
          작성 완료
        </Button>
      </Box>
    </>
  );
};

export default SubmitReviewPage;
