import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function ChartMotCua() {
	const [dataAudits, setDataAudits] = useState([]);

	const windowWidth = window.innerWidth;

	const [chartWidth, setChartWidth] = useState(800);
	const [chartHeight, setChartHeight] = useState(800);

	useEffect(() => {
		const updateChartSize = () => {
			if (windowWidth < 565) {
				setChartWidth(360);
				setChartHeight(360);
			} else {
				setChartWidth(800);
				setChartHeight(550);
			}
		};

		window.onresize = updateChartSize();
	}, []);

	return (
		<React.Fragment>
			<div className="my-10 rounded-lg px-4">
				<div className="uneti__chart-view p-5 rounded-lg bg-white flex flex-col lg:flex-row items-center">
					<Chart
						type="donut"
						width={chartWidth}
						height={chartHeight}
						series={[45, 67, 89, 34]}
						options={{
							labels: ["Khảo thí", "Đào tạo", "CT&CTSV", "Hành chính"],
							plotOptions: {
								pie: {
									donut: {
										labels: {
											show: true,
											total: {
												show: true,
												label: "TỔNG",
												fontSize: 30,
												fontWeight: 600,
												color: "#336699",
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
					<div className="uneti__chart-detail">
						<div className="flex items-center gap-5 mb-4">
							<div className="w-12 h-5 rounded-md bg-[#008EFB]"></div>
							<span>Khảo thí</span>
						</div>
						<div className="flex items-center gap-5 mb-4">
							<div className="w-12 h-5 rounded-md bg-[#1AE396]"></div>
							<span>Đào tạo</span>
						</div>
						<div className="flex items-center gap-5 mb-4">
							<div className="w-12 h-5 rounded-md bg-[#FEB018]"></div>
							<span>CT&CTSV</span>
						</div>
						<div className="flex items-center gap-5 mb-4">
							<div className="w-12 h-5 rounded-md bg-[#FE4560]"></div>
							<span>Hành chính</span>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ChartMotCua;
