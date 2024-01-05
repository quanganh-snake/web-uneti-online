import { useBem } from '@/Services/Hooks'
import React, { useState, useEffect, useRef } from 'react'
import Chart from 'react-apexcharts'

import './ChartMotCua.scss'

const DEFAULT_CHAR_WIDTH = '400px'
const DEFAULT_CHAR_HEIGHT = '400px'

function ChartMotCua() {
  const bem = useBem('uneti_chart')

  const apexchartRef = useRef()

  const [dataAudits, setDataAudits] = useState([])

  const windowWidth = window.innerWidth

  const [chartWidth, setChartWidth] = useState(DEFAULT_CHAR_WIDTH)
  const [chartHeight, setChartHeight] = useState(DEFAULT_CHAR_HEIGHT)

  useEffect(() => {
    const updateChartSize = () => {
      if (windowWidth < 660) {
        setChartWidth(240)
        setChartHeight(240)
      } else {
        setChartWidth(DEFAULT_CHAR_WIDTH)
        setChartHeight(DEFAULT_CHAR_HEIGHT)
      }
    }

    window.onresize = updateChartSize
  }, [])

  return (
    <React.Fragment>
      <div className="my-10 rounded-lg px-4">
        <div className={bem.e('view')}>
          <Chart
            type="donut"
            ref={apexchartRef}
            width={chartWidth}
            height={chartHeight}
            series={[45, 67, 89, 34]}
            options={{
              chart: {
                width: 400,
                height: 400,
              },
              responsive: [
                {
                  breakpoint: 660,
                  options: {
                    chart: {
                      width: 240,
                      height: 240,
                    },
                  },
                },
              ],
              labels: ['Khảo thí', 'Đào tạo', 'CT&CTSV', 'Hành chính'],
              fill: {
                colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757'],
                opacity: [0.9, 0.9, 0.9, 0.9],
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: 'TỔNG',
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
          <div className={bem.e('details')}>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: '#1a5cff',
                })}
              />
              <span>Khảo thí</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: '#46c93a',
                })}
              />
              <span>Đào tạo</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: '#ffba00',
                })}
              />
              <span>CT&CTSV</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: '#ff4757',
                })}
              />
              <span>Hành chính</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChartMotCua
