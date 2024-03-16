import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const ChartNguonThuNhap = (props) => {
  return (
    <div className="grid grid-cols-3 h-full gap-10 items-center">
      <div className="col-span-3 flex items-center justify-center lg:col-span-2">
        <Chart
          type="pie"
          width={300}
          height={300}
          series={[66, 34, 21]}
          options={{
            colors: ['#FEB018', '#008FFB', '#1AE396'],
            chart: {
              width: 300,
              height: 300,
            },
            responsive: [
              {
                breakpoint: 660,
                options: {
                  chart: {
                    width: 300,
                    height: 300,
                  },
                },
              },
            ],
            labels: ['KH&CN', 'Chuyển giao', 'Khác'],
            fill: {
              colors: ['#FEB018', '#008FFB', '#1AE396'],
              opacity: [0.9, 0.9, 0.9, 0.9],
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: false,
                    total: {
                      show: true,
                      label: 'Tổng số người học',
                      fontSize: 24,
                      fontWeight: 600,
                      color: '#336699',
                    },
                  },
                },
              },
            },
            legend: {
              show: false,
            },
          }}
        />
      </div>
      {/* START: Ghi chú nhân lực */}
      <div className="col-span-3 lg:col-span-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#FEB018]"></div>
            <p className="text-xs font-medium">KH&CN</p>
          </div>
          {/* END: Item ghi chú nhân lực */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#008FFB]"></div>
            <p className="text-xs font-medium">Chuyển giao</p>
          </div>
          {/* END: Item ghi chú nhân lực */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#1AE396]"></div>
            <p className="text-xs font-medium">Khác</p>
          </div>
          {/* END: Item ghi chú nhân lực */}
        </div>
      </div>
      {/* END: Ghi chú nhân lực */}
    </div>
  )
}

ChartNguonThuNhap.propTypes = {}

export default ChartNguonThuNhap
