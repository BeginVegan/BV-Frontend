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
import Swal from 'sweetalert2';

const DUMMY = [
  {
    number: 0,
    name: '임시가게명1',
    menu: '임시메뉴1',
    price: '10000',
    status: '결제완료',
    reservation: '2023.5.29',
    cancel: '예약취소',
  },
  {
    number: 0,
    name: '임시가게명1',
    menu: '임시메뉴1',
    price: '10000',
    status: '결제완료',
    reservation: '2023.5.29',
    cancel: '예약취소',
  },
  {
    number: 0,
    name: '임시가게명1',
    menu: '임시메뉴1',
    price: '10000',
    status: '결제완료',
    reservation: '2023.5.29',
    cancel: '예약취소',
  },
  {
    number: 0,
    name: '임시가게명1',
    menu: '임시메뉴1',
    price: '10000',
    status: '결제완료',
    reservation: '2023.5.29',
    cancel: '예약취소',
  },
  {
    number: 0,
    name: '임시가게명1',
    menu: '임시메뉴1',
    price: '10000',
    status: '결제완료',
    reservation: '2023.5.29',
    cancel: '취소불가',
  },
];

const ReservationHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleCancel = () => {
    Swal.fire({
      icon: 'question',
      title: '정말 취소하시겠습니까?',
      text: '취소 요청은 되돌릴 수 없습니다',
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '예약 취소 성공',
          text: '그동안 이용해 주셔서 감사합니다',
        }).then(res => {
          if (res.isConfirmed) {
            /**
             * 예약 취소 쿼리 보내는곳
             */
          }
        });
      }
    });
  };
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
          {DUMMY.map((store, idx) => {
            return (
              <Tr key={idx} _hover={{ bgColor: COLORS.GREEN100 }}>
                <CustomTd>{store.number}</CustomTd>
                <CustomTd>{store.name}</CustomTd>
                <CustomTd>{store.menu}</CustomTd>
                <CustomTd>{Number(store.price).toLocaleString()}</CustomTd>
                <CustomTd>{store.status}</CustomTd>
                <CustomTd>{store.reservation}</CustomTd>
                <CustomTd>
                  {store.cancel === '예약취소' ? (
                    <Button
                      colorScheme="red"
                      size={{ base: 'xs', md: 'sm' }}
                      onClick={() => handleCancel()}
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
