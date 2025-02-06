import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import GithubService from "../service/github.service";

function Piechart() {
	const [chartData, setChartData] = useState({ series: [], labels: [] });
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTopLanguages = async () => {
			const githubService = new GithubService();
			const topLanguages = await githubService.getTopLanguages(
				"AlexThry"
			);

			const series = topLanguages.map((lang: any) =>
				parseFloat(lang.percentage.replace("%", ""))
			);
			const labels = topLanguages.map((lang: any) => lang.language);

			setChartData({ series, labels });
			setIsLoading(false);
		};

		fetchTopLanguages();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			const getChartOptions = () => {
				return {
					series: chartData.series,
					colors: ["#EAC8CA", "#99E1D9", "#EB5E5E", "#878787"],
					chart: {
						height: "80%",
						width: "100%",
						type: "donut",
					},
					stroke: {
						colors: ["transparent"],
						lineCap: "",
					},
					grid: {
						padding: {
							top: 0,
						},
					},
					labels: chartData.labels,
					dataLabels: {
						enabled: false,
					},
					legend: {
						position: "right",
						fontFamily: "Cousine, sans-serif",
					},
					yaxis: {
						labels: {
							formatter: function (value: string) {
								return value + "%";
							},
						},
					},
				};
			};

			if (
				document.getElementById("donut-chart") &&
				typeof ApexCharts !== "undefined"
			) {
				const chart = new ApexCharts(
					document.getElementById("donut-chart"),
					getChartOptions()
				);
				chart.render();
			}
		}
	}, [chartData, isLoading]);

	return (
		<>
			<div className="flex flex-col items-start h-full w-full max-h-full">
				<p className="text-[16px] text-languages-base font-cousine">
					Languages
				</p>
				<div className="flex justify-center items-center w-full h-full border-main-100 border-opacity-10">
					{isLoading ? (
						<div className="w-full h-full flex justify-center items-center">
							<span className="loading loading-bars loading-lg bg-languages-base"></span>
						</div>
					) : (
						<div id="donut-chart"></div>
					)}
				</div>
			</div>
		</>
	);
}

export default Piechart;
