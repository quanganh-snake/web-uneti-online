import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export const SubjectItem = ({ dataHocPhan }) => {
    const [dataChart, setDataChart] = useState([100, 0])
    const labelsChart = ['Đã làm', 'Tổng câu hỏi']
    const colorChart = ['#0098EF', '#BCEBFF']

    useEffect(() => {}, [])

    return (
        <div className="subject__item my-2 shadow-md px-3 py-2 cursor-pointer rounded-md bg-white flex items-center justify-between hover:bg-gray-50/80">
            <div className="flex items-center gap-4">
                <img src="/images/study.png" className="w-20" alt="Study" />
                <div className="flex flex-col">
                    <h3 className="font-medium">{dataHocPhan?.TenMonHoc}</h3>
                    <p>Mã môn học: {dataHocPhan?.MaMonHoc}</p>
                </div>
            </div>
            <div className="w-20 h-20 rounded-full">
                <Chart
                    type="donut"
                    width={100}
                    height={100}
                    series={[
                        parseInt(dataHocPhan?.SoCauDaLam),
                        parseInt(dataHocPhan?.TongCauHoi),
                    ]}
                    options={{
                        colors: colorChart,
                        labels: labelsChart,
                        plotOptions: {
                            pie: {
                                size: 20,
                                donut: {
                                    size: '70%',
                                    labels: {
                                        show: true,
                                        name: {
                                            show: false,
                                        },
                                        total: {
                                            show: true,
                                            formatter: function (w) {
                                                return `${Math.floor(
                                                    (w.globals.seriesTotals[0] /
                                                        w.globals
                                                            .seriesTotals[1]) *
                                                        100,
                                                )}%`
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        legend: {
                            show: false,
                        },
                    }}
                />
            </div>
        </div>
    )
}
