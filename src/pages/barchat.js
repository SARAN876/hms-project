import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// import { useSelector } from 'react-redux';

function Barchart() {
  // const usersData = useSelector(({ role }) => role.rolelist);
  // const ManagerCount = usersData.filter((user) => user.role === 'manager');
  // const EmpCount = usersData.filter((user) => user.role === 'employee');
  const [bardata] = useState({
    series: [
      {
        data: [
          {
            x: 'Ap',
            y: 1600
          },
          {
            x: 'Ka',
            y: 733,
            fillColor: '#EB8C87',
            strokeColor: '#C23829'
          },
          {
            x: 'Tn',
            y: 1532,
            fillColor: '#Ea2d87',
            strokeColor: '#C13829'
          }
        ]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Price Chart',
        align: 'center'
      },
      xaxis: {
        categories: ['Ap', 'Ka', 'Tn']
      }
    }
  });

  return (
    <>
      <ReactApexChart options={bardata.options} series={bardata.series} type="bar" height={200} />
    </>
  );
}

export default Barchart;
