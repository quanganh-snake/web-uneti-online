import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const ChartCongBoKhoaHoc = (props) => {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-10 lg:justify-between">
      <div className="col-span-2 flex items-center justify-center lg:col-span-1">
        <div className="h-full w-full">
          <Chart
            type="bar"
            series={[
              {
                name: 'Tổng: ',
                data: [30, 40, 45, 50, 49],
              },
            ]}
            options={{
              colors: ['#2d99ae', '#46c93a', '#ffba00', '#ff4757', '#593e67'],
              chart: {
                height: 400,
                type: 'bar',
              },
              responsive: [
                {
                  breakpoint: 320,
                  options: {
                    chart: {
                      width: 250,
                      height: 400,
                    },
                  },
                },
                {
                  breakpoint: 420,
                  options: {
                    chart: {
                      width: 300,
                      height: 400,
                    },
                  },
                },
                {
                  breakpoint: 580,
                  options: {
                    chart: {
                      width: 270,
                      height: 400,
                    },
                  },
                },
                {
                  breakpoint: 780,
                  options: {
                    chart: {
                      width: 680,
                      height: 400,
                    },
                  },
                },
                {
                  breakpoint: 992,
                  options: {
                    chart: {
                      width: 600,
                      height: 400,
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                      },
                    },
                  },
                },
                {
                  breakpoint: 1200,
                  options: {
                    chart: {
                      width: 450,
                      height: 400,
                    },
                  },
                },
                {
                  breakpoint: 1440,
                  options: {
                    chart: {
                      width: 550,
                      height: 400,
                    },
                  },
                },
                {
                  breakpoint: 5000,
                  options: {
                    chart: {
                      width: 550,
                      height: 400,
                    },
                  },
                },
              ],
              plotOptions: {
                bar: {
                  horizontal: true,
                  columnWidth: '55%',
                  distributed: true,
                  barHeight: '100%',
                },
                dataLabels: {
                  hideOverflowingLabels: true,
                  orientation: 'vertical',
                },
              },
              legend: {
                show: false,
              },
              xaxis: {
                categories: [
                  'WoS/ISI',
                  'Scopus',
                  'Bài đăng TC quốc tế khác',
                  'Bài đăng TC trong nước',
                  'Sách chuyên khảo',
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

ChartCongBoKhoaHoc.propTypes = {}

export default ChartCongBoKhoaHoc
