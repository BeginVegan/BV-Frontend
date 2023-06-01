import { StarRank } from '@/components/star/StarRank';
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
    number: 1,
    name: '임시가게명1',
    price: '10000',
    reservation: '2023.5.29',
    rank: '1',
  },
  {
    number: 2,
    name: '임시가게명2',
    price: '10000',
    reservation: '2023.5.29',
    rank: '2',
  },
  {
    number: 3,
    name: '임시가게명3',
    price: '10000',
    reservation: '2023.5.29',
    rank: '3',
  },
  {
    number: 4,
    name: '임시가게명4',
    price: '10000',
    reservation: '2023.5.29',
    rank: '4',
  },
  {
    number: 5,
    name: '임시가게명5',
    price: '10000',
    reservation: '2023.5.29',
    rank: '5',
  },
];
{
  /* <Box boxShadow="xs" m={'1rem'} w={'100%'}> */
}

const PurchaseHistory = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <TableContainer marginTop={'1rem'}>
      <Table size={isMobile ? 'sm' : 'lg'}>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>가게명</Th>
            <Th>결제금액</Th>
            <Th>결제일자</Th>
            <Th>평가</Th>
          </Tr>
        </Thead>
        <Tbody>
          {DUMMY.map((store, idx) => {
            return (
              <Tr key={idx}>
                <Td>{store.number}</Td>
                <Td>{store.name}</Td>
                <Td>{store.price}</Td>
                <Td>{store.reservation}</Td>
                <Td>
                  <StarRank number={store.rank} color={'gold'} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default PurchaseHistory;
