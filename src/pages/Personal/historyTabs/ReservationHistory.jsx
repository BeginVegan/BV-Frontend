import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

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
    cancel: '예약취소',
  },
];

const ReservationHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <TableContainer marginTop={'1rem'}>
      <Table size={isMobile ? 'sm' : 'lg'}>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>가게명</Th>
            <Th>메뉴</Th>
            <Th>금액</Th>
            <Th>상태</Th>
            <Th>방문예정일</Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {DUMMY.map((store, idx) => {
            return (
              <Tr key={idx} marginBottom={'1rem'}>
                <Td>{store.number}</Td>
                <Td>{store.name}</Td>
                <Td>{store.menu}</Td>
                <Td>{store.price}</Td>
                <Td>{store.status}</Td>
                <Td>{store.reservation}</Td>
                <Td>{store.cancel}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default ReservationHistory;
