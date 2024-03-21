import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const ChartKiemDinhCTDT = (props) => {
  return (
    <div>
      <Chart
        type="bar"
        series={[
          {
            name: 'Đã ĐGN',
            data: [10, 20, 30],
          },
          {
            name: 'Đã kiểm định',
            data: [40, 50, 60],
          },
          {
            name: 'Đang ĐGN',
            data: [70, 80, 90],
          },
          {
            name: 'Đang kiểm định',
            data: [15, 25, 35],
          },
          {
            name: 'Đủ ĐK kiểm định',
            data: [67, 47, 57],
          },
          {
            name: 'Đến hạn kiểm định',
            data: [46, 76, 56],
          },
          {
            name: 'Chưa đủ ĐK kiểm định',
            data: [24, 54, 14],
          },
        ]}
        options={{
          chart: {
            type: 'bar',
            width: 450,
            height: 20,
            stacked: true,
          },
          colors: [
            '#ef4444',
            '#f97316',
            '#10b981',
            '#06b6d4',
            '#8b5cf6',
            '#fca5a5',
            '#78716c',
          ],
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                total: {
                  enabled: true,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900,
                  },
                },
              },
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff'],
          },
          xaxis: {
            categories: ['Bậc đại học', 'Bậc Thạc sĩ', 'Bậc Tiến sĩ'],
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 50,
          },
        }}
      />
    </div>
  )
}

ChartKiemDinhCTDT.propTypes = {}

export default ChartKiemDinhCTDT
