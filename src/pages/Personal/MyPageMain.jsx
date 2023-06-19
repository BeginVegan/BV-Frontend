
import Axios from "@/api/apiConfig";
import { COLORS } from "@/constants/colors";
import { userAtom } from "@/utils/atoms/userAtom";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, HStack, Heading, Popover, PopoverContent, PopoverTrigger, Portal, Spacer, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
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
  const [isError,setIsError] = useState(false)
  useEffect(() => {
    const getReservations = async () => {
      try {
        if (isError) return;
        const res = await Axios.get('reservation/list/memberEmail');
        if (res.status === 200) {
          setReservationList(res.data);
        } else {
          console.log(`Unexpected status code ${res.status}`);
          setReservationList([]);
        }
      } catch (error) {
        console.error('Error fetching reservations', error);
        setReservationList([]);
        setIsError(true)
      }
    };
    const getReview = async () => {
      try {
        if (isError) return;
        const res = await Axios.get('mypage/review/userEmail');
        if (res.status === 200) {
          setReviewList(res.data)
        } else {
          console.log(`Unexpected status code ${res.status}`);
          setReviewList([]);
        }
      } catch (error) {
        console.error('Error fetching reviews', error);
        setReviewList([]);
        setIsError(true)
      }
    };
    getReservations();
    getReview();
  }, []);


  const getFetchUserInfo = async () => {
    const res = await Axios.get(`member/${userStatus.email}`);
    if (res.status === 200) {
      setUserStatus({
        email: res.data.memberEmail,
        name: res.data.memberName,
        point: res.data.memberPoint,
        role: res.data.memberRole,
      });
    }
  }
  useEffect(()=>{
    if (reviewList && reservationList && userStatus){
      setLoading(false)   
    }
  }, [reviewList, reservationList, userStatus])

  useEffect(()=>{
    if (userStatus && userStatus.email)getFetchUserInfo();
  },[])
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
    if (!userStatus || userStatus.point === null || userStatus.point === undefined) {
      console.log("!!!", userStatus)
      return "-"
    }
    if (userStatus.point < 10000)
      return '🌱'
    if (userStatus.point < 50000)
      return '🌿'
    if (userStatus.point < 100000)
      return '🪴'
    return '🌳'
  }
  const getGradeName = () => {
    if (!userStatus || userStatus.point === null || userStatus.point === undefined) {
      return " "
    }
    if (userStatus.point < 10000)
      return '새싹'
    if (userStatus.point < 50000)
      return '풀잎'
    if (userStatus.point < 100000)
      return '화분'
    return '나무'
  }
  if (loading )
  return <LoadingPage />
  return (
    <VStack pb={"8rem"}>
      <Flex mb={"2rem"}>
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
      <Flex flexDirection={{base:"column", md:"row"}} alignItems={"center"} justifyContent={"center"} pr={"0.5rem"}>
        <Wrap bgColor={COLORS.GREEN100}  p={"2rem"} pl={{base:"7rem", md:"2rem"}} spacing={"5rem"} borderRadius={"2xl"}>
          <WrapItem>
            <MyPageMainCard title="예약중" value={onReadyReservationList.length} list={onReadyReservationList}/>
          </WrapItem>
          <WrapItem>
            <MyPageMainCard title="리뷰대기" value={reservationsWithoutReview.length} list={reservationsWithoutReview}/>
          </WrapItem>
          <WrapItem>
            <MyPageMainCard title="포인트" value={userStatus && userStatus.point != null ? userStatus.point : '-'}/>
          </WrapItem>
        </Wrap>
      </Flex>
      
    </VStack>
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
      if(list && list.length >0 && Array.isArray(list)) {
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
              <PopoverContent alignItems={"center"} width={"220px"} placement='bottom' p="1rem" borderColor={COLORS.GREEN300}>
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