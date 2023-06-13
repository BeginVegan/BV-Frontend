// import { userAtom } from '@/utils/atoms/userAtom';
// import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
// import { useAtom } from 'jotai';
// import { CountUp } from 'use-count-up';

import Axios from "@/api/apiConfig";
import { COLORS } from "@/constants/colors";
import { userAtom } from "@/utils/atoms/userAtom";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, HStack, Heading, Popover, PopoverContent, PopoverTrigger, Portal, Spacer, Text, VStack, Wrap } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isCancellable } from "./historyTabs/PurchaseHistory";
import { useRestaurantDetail } from "./historyTabs/hooks/useRestaurantDetail";

// const MyPageMain = () => {
//   const point = '1000000000';
//   const grade = 'VVVVVVVIP';
//   const [userStatus, setUserStatus] = useAtom(userAtom);

//   return (
//     <Box
//       p={'20rem'}
//       // bg={`url('../src/assets/panel/green.png') no-repeat`}
//       bgPosition="center"
//       bgSize={{ base: '40vh', md: '80vh' }}
//     >
//       <VStack spacing={6} align="center">
//         <Heading size="xl">보유 포인트</Heading>
//         <HStack spacing={'0.5rem'}>
//           <Text fontSize="4xl" fontWeight="bold" color="blue.600">
//             <CountUp isCounting={true} end={Number(point)} duration={3.2} easing={'easeOutCubic'} />
//           </Text>
//           <Text fontWeight={'bold'} fontSize={'2xl'}>
//             점
//           </Text>
//         </HStack>
//         <Text fontSize="2xl" fontWeight="bold" color="purple.600">
//           {userStatus.name} 님의 등급은
//         </Text>
//         <Text fontSize="6xl" fontWeight="bold" color="red">
//           {grade}
//         </Text>
//       </VStack>
//     </Box>
//   );
// };

// export default MyPageMain;

const MyPageMain = () => {
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const [reservationList, setReservationList] = useState(null);
  const [reviewList, setReviewList] = useState(null);
  
  
  useEffect(() => {
    const getReservations = async () => {
      const res = await Axios.get('reservation/list/memberEmail');
      if (res.status === 200) {
        setReservationList(res.data);
  
      }
    };
    const getReview = async () => {
      const res = await Axios.get('mypage/review/userEmail');

      if (res.status === 200) {
        setReviewList(res.data);

      }
    };
    getReservations();
    getReview();

  }, []);

  //예약중인 리스트 추출
  const onReadyReservationList = useMemo(() => {
    if (reservationList) {
      return reservationList.filter(store => isCancellable(store.reservationTime));
    }
    return [];
  }, [reservationList]);

  //결제완료 리스트 추출
  const doneReservationList = useMemo(() => {
    if (reservationList) {
      return reservationList.filter(store => !isCancellable(store.reservationTime));
    }
    return [];
  }, [reservationList]);

  //결제완료인데 리뷰는 없는 리스트 추출
  const reservationsWithoutReview = useMemo(()=> {
    if (doneReservationList && reviewList) {
      return  doneReservationList.filter(reservation => {
        const hasReview = reviewList.find(review => review.restaurantNo === reservation.restaurantNo && review.reservationNo === reservation.reservationNo);
        return !hasReview;  // hasReview가 없으면 (즉, 리뷰가 없으면) true 반환
      });
    }
    return [];
  },[doneReservationList, reviewList])
  
  const getGradeIcon = () => {
    if (!userStatus)
      return "-"
    if (userStatus < 10000)
      return '🌱'
    if (userStatus < 50000)
      return '🌿'
    if (userStatus < 100000)
      return '🪴'
    return '🌳'
  }
  const getGradeName = () => {
    if (!userStatus)
      return " "
    if (userStatus < 10000)
      return '새싹'
    if (userStatus < 50000)
      return '풀잎'
    if (userStatus < 100000)
      return '화분'
    return '나무'
  }
  return (
    <>
      <Flex mb={"5rem"}>
        <VStack>
          <Text fontSize={"3xl"}>{userStatus && userStatus.name ? userStatus.name : '-'} 님의 등급은</Text>
          <HStack>
            <Text fontSize={'xl'}>{getGradeName()}</Text>
            <Text fontSize={"5xl"}>{getGradeIcon()}</Text>
            <Text fontSize={"3xl"}> 입니다</Text>
          </HStack>
        </VStack>
      </Flex>
      <Wrap spacing={"5rem"}>
  

        <MyPageMainCard title="예약중" value={onReadyReservationList.length} list={onReadyReservationList}/>
        <MyPageMainCard title="리뷰대기" value={reservationsWithoutReview.length} list={reservationsWithoutReview}/>
        <MyPageMainCard title="포인트" value={userStatus && userStatus.point ? userStatus.point : '-'}/>
      </Wrap>
    </>
  )
}
export default MyPageMain;

const MyPageMainCard = ({title, value, list}) => {
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      const details = [];
      if(Array.isArray(list)) {
        for (let store of list) {
          const { data } = await useRestaurantDetail(store.reservationNo);
          details.push(data);
        }
      }
      // setRestaurantDetails(details);
      
      setRestaurantDetails([{restaurantName : "임시", restaurantNo : 1},{restaurantName : "임시임시", restaurantNo : 1},{restaurantName : "임시임시임시", restaurantNo : 1},{restaurantName : "임시임시임시임시", restaurantNo : 1}])
    }
    
    fetchDetails();
  }, [list]); // list가 바뀔 때마다 비동기 작업을 수행합니다.

  const trimName = (name) => {
    return name.length > 6 ? name.substring(0, 6) + '...' : name;
  };
  
  return (
    <>
      <VStack>
        <Card width={"200px"} height={"150px"} alignItems={"center"} borderWidth={"thin"} borderColor={COLORS.GREEN200} shadow={"md"}>
          <CardHeader>
            <Heading size='md'>{title}</Heading>
          </CardHeader>
          <Divider color={"gray.200"} />
          <CardBody>
            <Box fontSize={"2xl"}>
              {value}
            </Box>
          </CardBody> 
        </Card>
        <Popover >
          <PopoverTrigger>
            {/* <Button>here</Button> */}
            {/* <Tooltip label='상세정보 보기' placement='bottom'> */}
              <TriangleDownIcon color={COLORS.GREEN300} />

            {/* </Tooltip> */}
          </PopoverTrigger>
            <Portal>
              <PopoverContent alignItems={"center"} width={"200px"} p="1rem" borderColor={COLORS.GREEN300}>
                {!restaurantDetails.length && title === '예약중' || title === '리뷰대기' ? <Text>목록이 없어요😂</Text> :
                  <>
                  
                  {title === '예약중' || title === '리뷰대기' ? (
                    <VStack>
                      {restaurantDetails.map((detail) => (
                        <HStack w={"100%"}>
                          <Text>{trimName(detail.restaurantName)}</Text>
                          <Spacer />
                          <Button color={"white"} bgColor={COLORS.GREEN200} size={"xs"}
                          onClick={() => navigate(`/restaurant/${detail.restaurantNo}`)}
                          
                          >GO</Button>
                        </HStack>
                      ))}
                    </VStack>
                  ): 
                        <>
                        
                          <VStack>
                          
                            <Text>🌱 : ~10000</Text>
                            <Text>🌿 : ~50000</Text>
                            <Text>🪴 : ~100000</Text>
                            <Text>🪴 : 100000~</Text>
                          </VStack>
                        </>
                  }
                  </>
                }
                
              </PopoverContent>
           </Portal> 
        </Popover>
      </VStack>
    </>
  )
}