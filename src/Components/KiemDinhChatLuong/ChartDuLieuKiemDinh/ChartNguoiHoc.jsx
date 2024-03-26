import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const ChartNguoiHoc = (props) => {
  return (
    <div className="grid grid-cols-3 items-center justify-center gap-10 lg:justify-between">
      <div className="col-span-3 lg:col-span-2">
        <div className="flex items-center justify-center">
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
              labels: ['Đại học', 'Cao học', 'NCS'],
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
      </div>
      {/* START: Ghi chú nhân lực */}
      <div className="col-span-3 lg:col-span-1">
        <div className="w-1/2 mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#FEB018]"></div>
            <p className="text-xs font-medium">Đại học</p>
          </div>
          {/* END: Item ghi chú nhân lực */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#008FFB]"></div>
            <p className="text-xs font-medium">Cao học</p>
          </div>
          {/* END: Item ghi chú nhân lực */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#1AE396]"></div>
            <p className="text-xs font-medium">NCS</p>
          </div>
          {/* END: Item ghi chú nhân lực */}
        </div>
      </div>
      {/* END: Ghi chú nhân lực */}
    </div>
  )
}

ChartNguoiHoc.propTypes = {}

export default ChartNguoiHoc
