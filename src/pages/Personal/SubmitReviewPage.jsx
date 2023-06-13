
/*
public class ReviewDTO {
    private int reviewNo; // review_no
    private int reservationNo; // reservation_no
    private int restaurantNo; // restaurant_no
    private String memberEmail; // member_email
    private int reviewStar; // review_star
    private String reviewContent; // review_content
    private Timestamp reviewTime; // review_time
    private String reviewPhotoDir; // review_photo_dir
}
*/

import Axios from '@/api/apiConfig';
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
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const SubmitReviewPage = () => {
  const location = useLocation();

  const [fileName, setFileName] = useState("No file chosen");

  const {reservationNo : reserNo, restaurantNo :restNo} = location.state

  // const [reviewNo, setReviewNo] = useState("");
  // const [memberEmail, setMemberEmail] = useState("");
  // const [reviewPhotoDir, setReviewPhotoDir] = useState("");
  const [reservationNo, setReservationNo] = useState(0);
  const [restaurantNo, setRestaurantNo] = useState(0);
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewPhoto, setReviewPhoto] = useState(null);
  
  const toast = useToast();

  useEffect(()=>{
    console.log(reserNo, restNo)
    setReservationNo(reserNo)
    setRestaurantNo(restNo)
  },[reserNo, restNo])
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('reviewDTO', new Blob([JSON.stringify({
        reservationNo,
        restaurantNo,
        reviewStar,
        reviewContent
      })], {
        type: "application/json"
      }));
      formData.append('reviewImage', reviewPhoto);
  
      await Axios.post('/mypage/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast({
        title: "Review submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  


  return (
    <>
    <Text fontSize={'3xl'} fontWeight={'extrabold'} pos={"absolute"} top={"10%"} left={"50%"}>
        리뷰작성
    </Text>
    <Divider pos={"absolute"} top={"15%"}w={"50%"} />
    <Spacer />
    <Box width={"50%"} height={"100%"} as="form" onSubmit={submitForm} p={5} shadow="md" borderWidth="1px">
   
      <FormControl id="reviewStar" isRequired mt={4}>
        <FormLabel fontWeight={"bold"} fontSize={"xl"}>별점</FormLabel>
        <Box display="flex" mt={1}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <StarIcon
              key={rating}
              cursor="pointer"
              w={6}
              h={6}
              onClick={() => setReviewStar(rating)}
              color={rating <= reviewStar ? 'yellow.400' : 'gray.300'}
              mr={"5px"}
            />
          ))}
        </Box>
      </FormControl>
      
      <FormControl  id="reviewContent" isRequired mt={4}>
       <FormLabel fontWeight={"bold"} fontSize={"xl"}>리뷰 내용</FormLabel>

        <Textarea  value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} />
      </FormControl>


      <FormControl id="reviewPhoto" mt={4}>
        <FormLabel htmlFor="reviewPhoto" fontWeight={"bold"} fontSize={"xl"}>사진 파일</FormLabel>
        
        <Input type="file" display="none" id="fileInput" onChange={(e) => {
          setReviewPhoto(e.target.files[0]);
          setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen");
        }} />
        <HStack>
          <Button size={"sm"} onClick={() => document.getElementById('fileInput').click()}>선택</Button>
          <Box width={"100%"} border={"1px"} p={'3px'} borderRadius={"5px"} borderColor={"gray.300"} color={'gray.500'}>
            <HStack>
              <Text pl={"1rem"}>
                {fileName}
              </Text>
              <Spacer/>
              <Button
                onClick={()=> {
                  setReviewPhoto(null)  
                  setFileName('No file chosen') }}
              size={'sm'}>x</Button>
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

export default SubmitReviewPage

