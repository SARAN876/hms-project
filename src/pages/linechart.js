import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function linechart() {
  const userList = useSelector(({ users }) => users.userslist);
  const userCount = userList.filter((user) => user.status === '1');
  const [linedata] = useState({
    series: [
      {
        name: 'Users',
        data: [0, Number(userCount.length)]
      }
    ],
    options: {
      chart: {
        height: 500,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Number of active users',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['', '']
      }
    }
  });

  return (
    <>
      <ReactApexChart
        options={linedata.options}
        series={linedata.series}
        type="line"
        height={200}
      />
    </>
  );
}

export default linechart;
