import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function picchart() {
  const departmentData = useSelector(({ department }) => department.departmentlist);
  const name = departmentData.map((name) => name.name);
  const dupName = name.filter((item, index) => name.indexOf(item) === index);
  const proCount = departmentData.filter((user) => user.name === 'Production');
  const HouseCount = departmentData.filter((user) => user.name === 'Housekeeping');
  const FrontCount = departmentData.filter((user) => user.name === 'Front office');
  const [pie] = useState({
    series: [Number(HouseCount.length), Number(proCount.length), Number(FrontCount.length)],
    options: {
      labels: dupName,
      title: {
        text: 'Department Chart',
        align: 'center'
      },
      responsive: [
        {
          breakpoint: 0,
          options: {
            chart: {
              width: 260
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  });
  return (
    <>
      <ReactApexChart options={pie.options} series={pie.series} type="donut" width={363} />
    </>
  );
}

export default picchart;
