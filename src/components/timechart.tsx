import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useGithubData } from "../hooks/useGithubData";

function Timechart({ reducedMotion }: { reducedMotion: boolean }) {
	const { commits, isLoading, stats } = useGithubData();

	const series = useMemo(
		() => [{ name: "Commits", data: commits.map((c) => c.count) }],
		[commits]
	);
	const categories = useMemo(() => commits.map((c) => c.label), [commits]);

	const options = useMemo<ApexOptions>(
		() => ({
			chart: {
				type: "area",
				background: "transparent",
				fontFamily: "Cousine, monospace",
				toolbar: { show: false },
				zoom: { enabled: false },
				animations: {
					enabled: !reducedMotion,
					speed: 1000,
					easing: "easeinout",
				},
			},
			colors: ["#99E1D9"],
			stroke: { curve: "smooth", width: 3 },
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.45,
					opacityTo: 0,
					stops: [0, 95],
				},
			},
			dataLabels: { enabled: false },
			markers: {
				size: 0,
				strokeColors: "#06040A",
				colors: ["#99E1D9"],
				hover: { size: 6 },
			},
			grid: {
				borderColor: "rgba(191,147,228,0.08)",
				strokeDashArray: 4,
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } },
				padding: { left: 6, right: 6, top: 0, bottom: 0 },
			},
			xaxis: {
				categories,
				tickPlacement: "on",
				labels: {
					rotate: 0,
					hideOverlappingLabels: true,
					style: {
						colors: "rgba(245,241,250,0.5)",
						fontFamily: "Cousine, monospace",
						fontSize: "10px",
					},
				},
				axisBorder: { show: false },
				axisTicks: { show: false },
				tooltip: { enabled: false },
			},
			yaxis: {
				labels: {
					style: {
						colors: "rgba(245,241,250,0.4)",
						fontFamily: "Cousine, monospace",
						fontSize: "10px",
					},
					formatter: (v: number) => `${Math.round(v)}`,
				},
			},
			tooltip: {
				theme: "dark",
				x: { show: true },
				y: { formatter: (v: number) => `${v} commits` },
			},
		}),
		[categories, reducedMotion]
	);

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex items-center justify-between">
				<p className="font-cousine text-xs uppercase tracking-[0.2em] text-commits-base">
					Commits / mois
				</p>
				<span className="font-cousine text-[10px] text-mist/40">
					{stats.totalCommits.toLocaleString("fr-FR")} au total
				</span>
			</div>

			<div className="flex flex-1 items-center justify-center">
				{isLoading ? (
					<div className="my-8 h-40 w-full animate-pulse-soft rounded-xl bg-gradient-to-t from-commits-base/20 to-transparent" />
				) : (
					<Chart
						type="area"
						series={series}
						options={options}
						height={300}
						width="100%"
					/>
				)}
			</div>
		</div>
	);
}

export default Timechart;
