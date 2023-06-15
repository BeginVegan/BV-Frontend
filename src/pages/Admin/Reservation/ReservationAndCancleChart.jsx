import React from 'react';
import ApexChart from 'react-apexcharts';
import { Card, CardBody } from '@chakra-ui/react';

const ReservationAndCancelChart = ({ data }) => {
  const allReservations = data.reduce((acc, item) => {
    const reservationDate = new Date(item.reservationTime).toISOString().split('T')[0];
    if (acc[reservationDate]) {
      acc[reservationDate] += 1;
    } else {
      acc[reservationDate] = 1;
    }
    return acc;
  }, {});

  const canceledReservations = data.reduce((acc, item) => {
    if (item.reservationStatus === '취소') {
      const reservationDate = new Date(item.reservationTime).toISOString().split('T')[0];
      if (acc[reservationDate]) {
        acc[reservationDate] += 1;
      } else {
        acc[reservationDate] = 1;
      }
    }
    return acc;
  }, {});

  const allReservationsData = Object.entries(allReservations).map(([date, count]) => ({
    x: new Date(date).getTime(),
    y: count,
  }));

  const canceledReservationsData = Object.entries(canceledReservations).map(([date, count]) => ({
    x: new Date(date).getTime(),
    y: count,
  }));

  const sortDataByDate = data => {
    return data.sort((a, b) => a.x - b.x);
  };

  const connectClosestDots = data => {
    const sortedData = sortDataByDate(data);
    const connectedData = [];

    for (let i = 0; i < sortedData.length; i++) {
      if (i === 0 || i === sortedData.length - 1) {
        connectedData.push(sortedData[i]);
      } else {
        const prevData = sortedData[i - 1];
        const currData = sortedData[i];
        const nextData = sortedData[i + 1];

        if (currData.y !== 0 && (prevData.y !== 0 || nextData.y !== 0)) {
          connectedData.push(currData);
        }
      }
    }

    return connectedData;
  };

  const connectedAllReservationsData = connectClosestDots(allReservationsData);
  const connectedCanceledReservationsData = connectClosestDots(canceledReservationsData);

  return (
    <Card pl={'2px'} pt={'55px'} pb={'55px'}>
      <CardBody>
        <ApexChart
          type="line"
          width={700}
          height={350}
          series={[
            { name: '전체 예약 건수', data: connectedAllReservationsData },
            { name: '취소 예약 건수', data: connectedCanceledReservationsData },
          ]}
          options={{
            theme: { mode: '' },
            chart: {
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 2 },
            grid: { show: false },
            yaxis: { show: true },
            xaxis: {
              type: 'datetime',
              labels: { show: true },
              axisTicks: { show: true },
              axisBorder: { show: true },
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [30, 100] },
            },
            colors: ['#48BB78', '#FF3333'],
            tooltip: {
              y: { formatter: value => `${value} reservations` },
            },
            animation: {
              enabled: true, // Enable chart animation
            },
          }}
        />
      </CardBody>
    </Card>
  );
};

export default ReservationAndCancelChart;
