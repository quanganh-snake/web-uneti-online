import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const ChartNhanLuc = (props) => {
  return (
    <>
      <div className="grid grid-cols-3 items-center justify-center gap-10 lg:justify-between">
        <div className="col-span-3 flex items-center justify-center lg:col-span-2">
          <Chart
            type="pie"
            width={300}
            height={300}
            series={[100, 32, 44, 66, 34, 21]}
            options={{
              colors: [
                '#2d99ae',
                '#46c93a',
                '#ffba00',
                '#ff4757',
                '#593e67',
                '#b85b56',
              ],
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
              labels: [
                'Giáo sư',
                'Phó giáo sư',
                'Tiến sĩ khoa học',
                'Tiến sĩ',
                'Thạc sĩ',
                'Khác',
              ],
              fill: {
                colors: [
                  '#2d99ae',
                  '#46c93a',
                  '#ffba00',
                  '#ff4757',
                  '#593e67',
                  '#b85b56',
                ],
                opacity: [0.9, 0.9, 0.9, 0.9],
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: false,
                      total: {
                        show: true,
                        label: 'Tổng số giảng viên',
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
              <div className="h-2 w-2 bg-[#2d99ae]"></div>
              <p className="text-xs font-medium">Giáo sư</p>
            </div>
            {/* END: Item ghi chú nhân lực */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#46c93a]"></div>
              <p className="text-xs font-medium">Phó giáo sư</p>
            </div>
            {/* END: Item ghi chú nhân lực */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#ffba00]"></div>
              <p className="text-xs font-medium">Tiến sĩ khoa học</p>
            </div>
            {/* END: Item ghi chú nhân lực */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#ff4757]"></div>
              <p className="text-xs font-medium">Tiến sĩ</p>
            </div>
            {/* END: Item ghi chú nhân lực */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#593e67]"></div>
              <p className="text-xs font-medium">Thạc sĩ</p>
            </div>
            {/* END: Item ghi chú nhân lực */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#b85b56]"></div>
              <p className="text-xs font-medium">Khác</p>
            </div>
            {/* END: Item ghi chú nhân lực */}
          </div>
        </div>
        {/* END: Ghi chú nhân lực */}
      </div>
    </>
  )
}

ChartNhanLuc.propTypes = {}

export default ChartNhanLuc
