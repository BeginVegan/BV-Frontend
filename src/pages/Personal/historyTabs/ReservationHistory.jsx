import Axios from '@/api/apiConfig';
import { COLORS } from '@/constants/colors';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { isCancellable } from './PurchaseHistory';

const ReservationHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reservationList, setReservationList] = useState(null);
  useEffect(() => {
    const getReservations = async () => {
      try{
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
    getReservations();
  }, []);

  const handleCancel = (reservationNo) => {
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
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: '예약 취소 실패',
              text: '다시 시도해 주세요',
            })
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: '예약 취소 실패',
            text: '다시 시도해 주세요',
          })
        } 
      }
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
      return reservationList.filter(store => isCancellable(store.reservationTime));
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

  return (
    <TableContainer marginTop={'1rem'}>
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
          {reservationList &&
            sortedReservationList.map((store, idx) => {
              
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
                    {Number(isCancellable(store.reservationTime)) < 0 ? (
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
