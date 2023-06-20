import Chart from 'react-apexcharts';
import Axios from '@/api/apiConfig';
import React, { useState, useEffect } from 'react';
import { Flex, Card, CardBody, Spinner } from '@chakra-ui/react';

const ReservationRankingChart = ({ dataList }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationsChartData, setReservationsChartData] = useState(null);
  const [canceledReservationsChartData, setCanceledReservationsChartData] = useState(null);

  // Get restaurantName by restaurantNo from Backend Server
  const getRestaurantName = async ({ restaurantNo }) => {
    try {
      const response = await Axios.get(`restaurant/${restaurantNo}`);
      let restaurantName = response.data.restaurant.restaurantName;
      if (restaurantName.length > 6) {
        restaurantName = restaurantName.substring(0, 6) + '..';
      }
      return restaurantName;
    } catch (error) {
      const restaurantName = '레스토랑';
      return restaurantName;
    }
  };

  useEffect(() => {
    const fetchChartData = async () => {
      // Count reservations per restaurant
      const reservationsPerRestaurant = {};
      dataList.forEach(reservation => {
        const { restaurantNo, reservationStatus } = reservation;
        if (reservationStatus === '예약') {
          if (reservationsPerRestaurant[restaurantNo]) {
            reservationsPerRestaurant[restaurantNo]++;
          } else {
            reservationsPerRestaurant[restaurantNo] = 1;
          }
        }
      });

      // Sort restaurants based on the number of reservations
      const sortedReservations = Object.entries(reservationsPerRestaurant).sort(
        (a, b) => b[1] - a[1]
      );

      // Get the top 5 restaurants with the most reservations
      const top5Reservations = sortedReservations.slice(0, 5);

      const restaurantData = await Promise.all(
        top5Reservations.map(async ([restaurantNo, reservationCount]) => {
          const name = await getRestaurantName({ restaurantNo });
          return {
            x: name,
            y: reservationCount,
          };
        })
      );

      setReservationsChartData({
        series: [
          {
            name: 'Reservations',
            data: restaurantData,
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            title: {
              text: '예약 순위 Top 5',
            },
          },
          yaxis: {
            title: {
              text: 'Reserved',
            },
          },
        },
      });

      // Count canceled reservations per restaurant
      const canceledReservationsPerRestaurant = {};
      dataList.forEach(reservation => {
        const { restaurantNo, reservationStatus } = reservation;
        if (reservationStatus === '취소') {
          if (canceledReservationsPerRestaurant[restaurantNo]) {
            canceledReservationsPerRestaurant[restaurantNo]++;
          } else {
            canceledReservationsPerRestaurant[restaurantNo] = 1;
          }
        }
      });

      // Sort restaurants based on the number of canceled reservations
      const sortedCanceledReservations = Object.entries(canceledReservationsPerRestaurant).sort(
        (a, b) => b[1] - a[1]
      );

      // Get the top 5 restaurants with the most canceled reservations
      const top5CanceledReservations = sortedCanceledReservations.slice(0, 5);

      const canceledRestaurantData = await Promise.all(
        top5CanceledReservations.map(async ([restaurantNo, reservationCount]) => {
          const name = await getRestaurantName({ restaurantNo });
          return {
            x: name,
            y: reservationCount,
          };
        })
      );

      setCanceledReservationsChartData({
        series: [
          {
            name: 'Canceled Reservations',
            data: canceledRestaurantData,
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            title: {
              text: '예약 취소 순위 Top 5',
            },
          },
          yaxis: {
            title: {
              text: 'Canceled',
            },
          },
        },
      });

      setIsLoading(false);
    };

    fetchChartData();
  }, [dataList]);

  if (isLoading) {
    return (
      <Flex w={526} h={520} justifyContent="center" alignItems="center">
        <Spinner size="xs" />
      </Flex>
    );
  }

  return (
    <Card shadow={'none'} pr={'2px'} pt={5} pb={5}>
      <CardBody>
        <div style={{ marginBottom: '10px' }}>
          <Chart
            options={{
              ...reservationsChartData.options,
              colors: ['#00E396'], // Customize the bar colors here
            }}
            series={reservationsChartData.series}
            type="bar"
            width="484"
            height="200"
          />
        </div>
        <div>
          <Chart
            options={{
              ...canceledReservationsChartData.options,
              colors: ['#FF4560'], // Customize the bar colors here
            }}
            series={canceledReservationsChartData.series}
            type="bar"
            width="484"
            height="200"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ReservationRankingChart;
