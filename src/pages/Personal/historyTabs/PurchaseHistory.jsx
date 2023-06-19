import Axios from '@/api/apiConfig';
import { COLORS } from '@/constants/colors';
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
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
    try {
      const res = await Axios.get('payment/list/memberEmail');
      if (res.status === 200) {
        setPaymentList(res.data);
      } else {
        console.log(`Unexpected status code ${res.status}`);
        setPaymentList([]);
      }
    } catch (error) {
      console.error('Error fetching payments', error);
      setPaymentList([]);
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
        try {
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
        } catch (error) {
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
      {paymentList && paymentList.length > 0 ?
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
            {paymentList.map((payment, idx) => {
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
                      onClick={() => cancelPayment(payment.impUid)}
                    >결제 취소</Button> : '취소불가'}
                  </CustomTd>
                </Tr>
              );
            })}
          </Tbody>
        </Table> :
        <Flex justifyContent="center" mt={'2rem'} alignItems="center" height="100%">
          <Text fontSize={'2xl'}>결제 내역이 없습니다 😂</Text>
        </Flex>
      }
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
    try {
      const res = await Axios.get(`restaurant/${restaurantNo}`)
      if (res.status === 200) {
        const restaurantName = res.data.restaurant.restaurantName
        setName(restaurantName)
      } else {
        console.log(`Unexpected status code ${res.status}`);
        setName(null)
      }
    } catch (error) {
      console.error('Error fetching restaurant name', error);
      setName(null)
    }
  }

  const fetchRestaurantNo = async () => {
    try {
      const res = await Axios.get(`reservation/${reservationNo}`);
      if (res.status === 200) {
        const restaurantNo = res.data.restaurantNo;
        setNo(restaurantNo)
      } else {
        console.log(`Unexpected status code ${res.status}`);
        setNo(null)
      }
    } catch (error) {
      console.error('Error fetching restaurant number', error);
      setNo(null)
    }
  };

  useEffect(() => {
    fetchRestaurantNo();
  }, [reservationNo]);

  useEffect(() => {
    if (no) fetchRestaurantName(no);
  }, [no]);

  useEffect(() => {
    if (name){
      refresh();
    } 
  }, [name]);
  
  return <div>{name}</div>;
};
