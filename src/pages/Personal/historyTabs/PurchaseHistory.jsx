import Axios from '@/api/apiConfig';
import { StarRank } from '@/components/star/StarRank';
import { COLORS } from '@/constants/colors';
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
import { useEffect, useMemo, useState } from 'react';

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
  const [reservationList, setReservationList] = useState(null);
  useEffect(() => {
    const getReservations = async () => {
      const res = await Axios.get('reservation/list/memberEmail');
      if (res.status === 200) {
        setReservationList(res.data);
      }
    };
    getReservations();
  }, []);

  const isCancellable = dateString => {
    const date = new Date(dateString);
    const currentTime = new Date();

    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const timeGap = date.getTime() - currentTime.getTime();

    return timeGap >= 0 && timeGap <= twentyFourHours;
  };

  const filteredReservationList = useMemo(() => {
    if (reservationList) {
      return reservationList.filter(store => !isCancellable(store.reservationTime));
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
            <CustomTh>결제금액</CustomTh>
            <CustomTh>결제일자</CustomTh>
            <Th fontSize={'xl'}>평가</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservationList &&
            sortedReservationList.map((store, idx) => {
              console.log(store);
              return (
                <Tr key={idx} _hover={{ bgColor: COLORS.GREEN100 }}>
                  <CustomTd>{idx + 1}</CustomTd>
                  <CustomTd>
                    <RestaurantName restaurantNo={store.restaurantNo} />
                  </CustomTd>
                  <CustomTd>{Number(store.reservationTotalPrice).toLocaleString()}</CustomTd>
                  <CustomTd>{store.reservationTime.split(' ')[0]}</CustomTd>
                  <CustomTd>
                    <RestaurantStar restaurantNo={store.restaurantNo} />
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

const RestaurantName = ({ restaurantNo }) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`restaurant/${restaurantNo}`);
      if (res.status === 200) {
        const data = res.data.restaurant.restaurantName;
        // console.log(data);
        setName(data);
      }
    };

    fetchData();
  }, [restaurantNo]);

  return <div>{name}</div>;
};

const RestaurantStar = ({ restaurantNo }) => {
  const [star, setStar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`restaurant/${restaurantNo}`);
      if (res.status === 200) {
        const data = res.data.restaurant.restaurantStar;

        setStar(data);
      }
    };

    fetchData();
  }, [restaurantNo]);

  return <StarRank number={star} color={'gold'} />;
};
