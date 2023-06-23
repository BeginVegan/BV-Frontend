import Axios from '@/api/apiConfig';
import { COLORS } from '@/constants/colors';
import { ROUTES } from '@/routes/ROUTES';
import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isCancellable } from './PurchaseHistory';

const ReservationHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reservationList, setReservationList] = useState(null);

  const getReservations = async () => {
    try {
      const res = await Axios.get('reservation/list/memberEmail');
      if (res.status === 200) {
        setReservationList(res.data);
      } else {
        setReservationList([]);
      }
    } catch (error) {
      setReservationList([]);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  const handleCancel = reservationNo => {
    Swal.fire({
      icon: 'question',
      title: '정말 취소하시겠습니까?',
      text: '취소 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          const result = await Axios.delete(`reservation/${reservationNo}`);
          if (result.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '예약 취소 성공',
              text: '그동안 이용해 주셔서 감사합니다',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '예약 취소 실패',
              text: '다시 시도해 주세요',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: '예약 취소 실패',
            text: '다시 시도해 주세요',
          });
        }
      }
      getReservations();
    });
  };

  const getHowMany = list => {
    if (list.length > 1) {
      return list[0].menuName + ' 외 ' + (list.length - 1) + '개';
    }
    return list[0].menuName;
  };

  const filteredReservationList = useMemo(() => {
    if (reservationList) {
      return reservationList.filter(store => isCancellable(store.reservationVisitTime));
    }
    return [];
  }, [reservationList]);

  const sortedReservationList = useMemo(() => {
    if (filteredReservationList) {
      return [...filteredReservationList].sort(
        (a, b) => new Date(a.reservationTime) - new Date(b.reservationTime)
      );
    }
    return [];
  }, [filteredReservationList]);

  // console.log(reservationList);
  // console.log(sortedReservationList);
  // console.log(filteredReservationList);
  const navigate = useNavigate();
  return (
    <TableContainer marginTop={'1rem'}>
      {sortedReservationList && sortedReservationList.length > 0 ? (
        <Table size={isMobile ? 'sm' : 'lg'}>
          <Thead>
            <Tr>
              <CustomTh>번호</CustomTh>
              <CustomTh>가게명</CustomTh>
              <CustomTh>메뉴</CustomTh>
              <CustomTh>금액</CustomTh>
              <CustomTh>상태</CustomTh>
              <CustomTh>방문예정일</CustomTh>
              <CustomTh>관리</CustomTh>
            </Tr>
          </Thead>
          <Tbody>
            {sortedReservationList.map((store, idx) => {
              return (
                <Tr key={idx} _hover={{ bgColor: COLORS.GREEN100 }}>
                  <CustomTd>{idx + 1}</CustomTd>
                  <CustomTd>
                    <RestaurantName restaurantNo={store.restaurantNo} />
                  </CustomTd>
                  <CustomTd>{getHowMany(store.reservationMenuList)}</CustomTd>
                  <CustomTd>{Number(store.reservationTotalPrice).toLocaleString()}</CustomTd>
                  <CustomTd>{store.reservationStatus}</CustomTd>
                  <CustomTd>{store.reservationTime.split(' ')[0]}</CustomTd>
                  <CustomTd>
                    {new Date(store.reservationVisitTime) - new Date() > 0 &&
                    new Date(store.reservationVisitTime) - new Date() > 24 * 60 * 60 * 1000 ? (
                      //24시간 이내
                      <Button
                        colorScheme="red"
                        size={{ base: 'xs', md: 'sm' }}
                        onClick={() => handleCancel(store.reservationNo)}
                      >
                        예약취소
                      </Button>
                    ) : (
                      '취소불가'
                    )}
                  </CustomTd>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <VStack width="100%" height="100%" justifyContent="center" alignItems="center" mt={'3rem'}>
          <Text mt={'3rem'} mb={'3rem'} fontSize={'2xl'}>
            예약된 가게가 없습니다 😂
          </Text>
          <Text fontSize={'2xl'}>지금 한번 둘러보시겠어요 ?</Text>
          <HStack spacing={'1rem'}>
            <Text fontSize={'xl'}>➞ 예약 베스트</Text>
            <Button
              colorScheme="green"
              size={'sm'}
              onClick={() => {
                navigate(ROUTES.BEST_RAW + 'reservation');
              }}
            >
              GO
            </Button>
          </HStack>
          <HStack spacing={'1rem'}>
            <Text fontSize={'xl'}>➞ 평점 베스트</Text>
            <Button
              colorScheme="green"
              size={'sm'}
              onClick={() => {
                navigate(ROUTES.BEST_RAW + 'star');
              }}
            >
              GO
            </Button>
          </HStack>
          <HStack spacing={'1rem'}>
            <Text fontSize={'xl'}>➞ 리뷰 베스트</Text>
            <Button
              colorScheme="green"
              size={'sm'}
              onClick={() => {
                navigate(ROUTES.BEST_RAW + 'review');
              }}
            >
              GO
            </Button>
          </HStack>
        </VStack>
      )}
    </TableContainer>
  );
};
export default ReservationHistory;

const CustomTh = ({ children }) => {
  return (
    <Th fontSize={'xl'} textAlign={'center'}>
      {children}
    </Th>
  );
};

const CustomTd = ({ children }) => {
  return <Td textAlign={'center'}>{children}</Td>;
};

const RestaurantName = ({ restaurantNo }) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`restaurant/${restaurantNo}`);
        if (res.status === 200) {
          const data = res.data.restaurant.restaurantName;
          setName(data);
        }
      } catch (error) {
        setName('삭제된 가게입니다');
      }
    };

    fetchData();
  }, [restaurantNo]);

  return <div>{name}</div>;
};
