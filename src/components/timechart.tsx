import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import GithubService from "../service/github.service";

function Timechart() {
	const [chartData, setChartData] = useState<{
		series: number[];
		categories: string[];
	}>({ series: [], categories: [] });
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCommitsData = async () => {
			const githubService = new GithubService();
			const commitsData = await githubService.getUserCommitsPerMonth(
				"AlexThry"
			);

			const sortedData = Object.entries(commitsData).sort(
				([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
			);
			const categories = sortedData.map(([date]) => date);
			const series: number[] = sortedData.map(
				([, count]) => count as number
			);

			setChartData({ series, categories });
			setIsLoading(false);
		};

		fetchCommitsData();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			const options = {
				chart: {
					height: "80%",
					maxWidth: "100%",
					type: "area",
					fontFamily: "Cousine",
					dropShadow: {
						enabled: false,
					},
					toolbar: {
						show: false,
					},
				},
				tooltip: {
					enabled: true,
					marker: {
						show: true,
					},
					shared: false,
					x: {
						show: true,
					},
					onDatasetHover: {
						highlightDataSeries: false,
					},
				},
				fill: {
					type: "gradient",
					gradient: {
						opacityFrom: 0,
						opacityTo: 0,
						shade: "#99E1D9",
						gradientToColors: ["#99E1D9"],
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					width: 8,
				},
				grid: {
					show: false,
					strokeDashArray: 4,
					padding: {
						left: 2,
						right: 2,
						top: 0,
					},
				},
				series: [
					{
						name: "Commits",
						data: chartData.series,
						color: "#99E1D9",
					},
				],
				xaxis: {
					categories: chartData.categories,
					labels: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					tooltip: {
						enabled: false,
					},
				},
				yaxis: {
					show: false,
				},
			};

			if (
				document.getElementById("area-chart") &&
				typeof ApexCharts !== "undefined"
			) {
				const chart = new ApexCharts(
					document.getElementById("area-chart"),
					options
				);
				chart.render();
			}
		}
	}, [chartData, isLoading]);

	return (
		<>
			<div className="flex flex-col h-full w-full max-h-full">
				<p className="text-[16px] text-commits-base font-cousine">
					Commits
				</p>
				{isLoading ? (
					<div className="w-full h-full flex justify-center items-center">
						<span className="loading loading-bars loading-lg bg-commits-base"></span>
					</div>
				) : (
					<div className="h-full border-b border-l border-main-100 border-opacity-10">
						<div id="area-chart"></div>
					</div>
				)}
			</div>
		</>
	);
}

export default Timechart;
