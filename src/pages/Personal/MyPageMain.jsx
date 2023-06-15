
import Axios from "@/api/apiConfig";
import { COLORS } from "@/constants/colors";
import { userAtom } from "@/utils/atoms/userAtom";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, HStack, Heading, Popover, PopoverContent, PopoverTrigger, Portal, Spacer, Text, VStack, Wrap } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { isCancellable } from "./historyTabs/PurchaseHistory";


const MyPageMain = () => {
  const [userStatus, setUserStatus] = useAtom(userAtom);
  const [reservationList, setReservationList] = useState(null);
  const [reviewList, setReviewList] = useState(null);
  const [loading, setLoading] = useState(true);

  
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
        setReviewList(res.data)
      }
    };
    getReservations();
    getReview();
  }, []);

  useEffect(()=>{
    if (reviewList && reservationList) setLoading(false)
  }, [reviewList, reservationList])

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
  if (loading )
  return <LoadingPage />
  return (
    <>
      <Flex mb={"5rem"}>
        <VStack>
          <HStack>
            <Text fontSize={"4xl"} fontWeight={"bold"}>{userStatus && userStatus.name ? userStatus.name : '-'}</Text>
            <Text fontSize={"3xl"}>님의 등급은</Text>

          </HStack>
          
          <HStack>
            <Text fontSize={'2xl'} color={COLORS.GREEN300} fontWeight={"bold"} >{getGradeName()}</Text>
            <Text fontSize={"5xl"}>{getGradeIcon()}</Text>
            <Text fontSize={"3xl"}> 입니다</Text>
          </HStack>
        </VStack>
      </Flex>
      <Flex ml={{ base: "20rem", md: 0 }}>
        <Wrap  spacing={"5rem"}>
          <MyPageMainCard title="예약중" value={onReadyReservationList.length} list={onReadyReservationList}/>
          <MyPageMainCard title="리뷰대기" value={reservationsWithoutReview.length} list={reservationsWithoutReview}/>
          <MyPageMainCard title="포인트" value={userStatus && userStatus.point ? userStatus.point : '-'}/>
        </Wrap>
      </Flex>
      
    </>
  )
}
export default MyPageMain;

export const fetchRestaurantDetail = async (restaurantNo) => {
  const res = await Axios.get(`restaurant/${restaurantNo}`);
  if (res.status === 200) {
    return res.data.restaurant;
  }
};

const MyPageMainCard = ({title, value, list}) => {
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      const details = [];
      if(Array.isArray(list)) {
        for (let store of list) {
          const data = await fetchRestaurantDetail(store.reservationNo);
          details.push({...{reservationNo : store.reservationNo},...data});
        }
      }
      setRestaurantDetails(details);
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
              <TriangleDownIcon fontSize={"2xl"} color={COLORS.GREEN300} _hover={{color:"green.600"}}/>

            
          </PopoverTrigger>
            <Portal>
              <PopoverContent alignItems={"center"} width={"200px"} p="1rem" borderColor={COLORS.GREEN300}>
                {!restaurantDetails.length && (title === '예약중' || title === '리뷰대기') ? <Text>목록이 없어요😂</Text> :
                  <>
                  
                  {title === '예약중' || title === '리뷰대기' ? (
                    <VStack>
                      {restaurantDetails.map((detail, idx) => {

                        if (idx > 5) return 
                        return (
                          <HStack w={"100%"} key={idx}>
                            <Text >{trimName(detail.restaurantName)}</Text>
                            <Spacer />
                            <Button color={"white"} bgColor={COLORS.GREEN200} size={"xs"}
                            onClick={() => {title === '예약중'? navigate(`/restaurant/${detail.restaurantNo}`) : navigate(`/mypage/review`, {
                              state : {
                                reservationNo : detail.reservationNo,
                                restaurantNo : detail.restaurantNo
                              }
                            })}}
                            >GO</Button>
                          </HStack>
                        )
                      }
                        
                      )}
                    </VStack>
                  ): 
                        <>
                        
                          <VStack width={"100%"}>
                            <HStack width={"70%"}>
                              <Text>🌱 :</Text>
                              <Spacer />
                              <Text> ~10000</Text>
                            </HStack>
                            <HStack width={"70%"}>
                              <Text>🌿 :</Text>
                              <Spacer />
                              <Text> ~50000</Text>
                            </HStack>
                            <HStack width={"70%"}>
                              <Text>🪴 :</Text>
                              <Spacer />
                              <Text> ~100000</Text>
                            </HStack>
                            <HStack width={"70%"}>
                              <Text>🌳 :</Text>
                              <Spacer />
                              <Text> 100000~</Text>
                            </HStack>
                            
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