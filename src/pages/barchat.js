import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function Barchart() {
  const usersData = useSelector(({ role }) => role.rolelist);
  const ManagerCount = usersData.filter((user) => user.role === 'manager');
  const EmpCount = usersData.filter((user) => user.role === 'employee');
  const [bardata] = useState({
    series: [
      {
        data: [Number(ManagerCount.length), Number(EmpCount.length)]
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
        text: 'Role Chart',
        align: 'center'
      },
      xaxis: {
        categories: ['Managers', 'Employees']
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
