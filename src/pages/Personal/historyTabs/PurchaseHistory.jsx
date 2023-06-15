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
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const isCancellable = dateString => {
  const date = new Date(dateString);
  const currentTime = new Date();

  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const timeGap = date.getTime() - currentTime.getTime();

  return timeGap >= 0 && timeGap <= twentyFourHours;
};

const PurchaseHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [paymentList, setPaymentList] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false); 


  const getPayments = async () => {
    const res = await Axios.get('payment/list/memberEmail');
    if (res.status === 200) {
      setPaymentList(res.data);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  const cancelPayment = (impUid) => {
    Swal.fire({
      icon: 'question',
      title: '정말 취소하시겠습니까?',
      text: '취소 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(async res => {
      if (res.isConfirmed) {
        const result = await Axios.delete(`payment?impUid=${impUid}`);
        if (result.status === 200 ) {
          Swal.fire({
            icon: 'success',
            title: '결제 취소 성공',
            text: '그동안 이용해 주셔서 감사합니다',
          })
        }
        else {
          Swal.fire({
            icon:'error',
            title:'결제 취소 실패',
            text: '다시 시도해 주세요'
          })
        }
      }
    });
    getPayments()
  }
  return (
    <TableContainer marginTop={'1rem'}>
      <Table size={isMobile ? 'sm' : 'lg'}>
        <Thead>
          <Tr>
            <CustomTh>번호</CustomTh>
            <CustomTh>가게명</CustomTh>
            <CustomTh>결제금액</CustomTh>
            <CustomTh>결제일자</CustomTh>
            <CustomTh>상태</CustomTh>
          </Tr>
        </Thead>
        <Tbody>
          {paymentList &&
            paymentList.map((payment, idx) => {
              return (
                <Tr key={idx} _hover={{ bgColor: COLORS.GREEN100 }}>
                  <CustomTd>{idx + 1}</CustomTd>
                  <CustomTd>
                    <RestaurantName reservationNo={payment.reservationNo}
                      refresh={() => setForceUpdate(!forceUpdate)}
                    
                    />
                  </CustomTd>
                  <CustomTd>{Number(payment.paymentPrice).toLocaleString()}</CustomTd>
                  <CustomTd>{payment.paymentTime.split(' ')[0]}</CustomTd>
                  <CustomTd>
                    {isCancellable(new Date()) ? <Button size={isMobile ? 'xs' : 'sm'} colorScheme='red'
                    onClick={()=>cancelPayment(payment.impUid)}
                    >결제 취소</Button> : '취소불가'}
                  </CustomTd>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default PurchaseHistory;

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

const RestaurantName = ({ reservationNo, refresh }) => {
  const [name, setName] = useState(null);
  const [no, setNo] = useState(null)

  const fetchRestaurantName = async (restaurantNo) => {
    const res = await Axios.get(`restaurant/${restaurantNo}`)
    if (res.status === 200) {
      const restaurantName = res.data.restaurant.restaurantName
      setName(restaurantName)
    }
  }
  const fetchRestaurantNo = async () => {
    const res = await Axios.get(`reservation/${reservationNo}`);
    if (res.status === 200) {
      const restaurantNo = res.data.restaurantNo;
      setNo(restaurantNo)
    }
  };

  useEffect(() => {
    fetchRestaurantNo();
  }, [reservationNo]);

  useEffect(() => {
    if (no)fetchRestaurantName(no);
  }, [no]);

  useEffect(() => {
    if (name){
      refresh();
    } 
  }, [name]);
  return <div>{name}</div>;
};

// const RestaurantStar = ({ restaurantNo }) => {
//   const [star, setStar] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await Axios.get(`restaurant/${restaurantNo}`);
//       if (res.status === 200) {
//         const data = res.data.restaurant.restaurantStar;

//         setStar(data);
//       }
//     };

//     fetchData();
//   }, [restaurantNo]);

//   return <StarRank number={star} color={'gold'} />;
// };


  // const getReservations = async () => {
  //   const res = await Axios.get('reservation/list/memberEmail');
  //   if (res.status === 200) {
  //     setReservationList(res.data);
  //   }
  // };

  
 
  // const filteredReservationList = useMemo(() => {
  //   if (reservationList) {
  //     return reservationList.filter(store => !isCancellable(store.reservationTime));
  //   }
  //   return [];
  // }, [reservationList]);

  // const sortedReservationList = useMemo(() => {
  //   if (filteredReservationList) {
  //     return [...filteredReservationList].sort(
  //       (a, b) => new Date(a.reservationTime) - new Date(b.reservationTime)
  //     );
  //   }
  //   return [];
  // }, [filteredReservationList]);
  