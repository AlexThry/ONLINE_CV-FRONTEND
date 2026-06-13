import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useGithubData } from "../hooks/useGithubData";
import { CHART_PALETTE } from "../data/github";

function Piechart({ reducedMotion }: { reducedMotion: boolean }) {
	const { languages, isLoading, stats } = useGithubData();

	const series = useMemo(
		() => languages.map((l) => parseFloat(l.percentage.replace("%", "")) || 0),
		[languages]
	);
	const labels = useMemo(() => languages.map((l) => l.language), [languages]);
	const colors = useMemo(
		() => languages.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
		[languages]
	);

	const options = useMemo<ApexOptions>(
		() => ({
			chart: {
				type: "donut",
				background: "transparent",
				fontFamily: "Cousine, monospace",
				animations: { enabled: !reducedMotion, speed: 900 },
			},
			labels,
			colors,
			stroke: { width: 0 },
			dataLabels: { enabled: false },
			legend: {
				position: "bottom",
				fontFamily: "Cousine, monospace",
				fontSize: "11px",
				labels: { colors: "#F5F1FA" },
				itemMargin: { horizontal: 4, vertical: 4 },
				markers: { size: 5, offsetX: -3 },
			},
			plotOptions: {
				pie: {
					donut: {
						size: "74%",
						labels: {
							show: true,
							name: {
								show: true,
								fontFamily: "Cousine, monospace",
								fontSize: "12px",
								color: "#F5F1FA",
								offsetY: -2,
							},
							value: {
								show: true,
								fontFamily: "DM Serif Display, serif",
								fontSize: "30px",
								color: "#F5F1FA",
								offsetY: 4,
								formatter: (v: string) => `${v}%`,
							},
							total: {
								show: true,
								showAlways: true,
								label: stats.topLanguage,
								color: "#F5F1FA",
								fontFamily: "DM Serif Display, serif",
								fontSize: "26px",
								formatter: () => stats.topLanguagePct || "—",
							},
						},
					},
				},
			},
			states: {
				hover: { filter: { type: "lighten", value: 0.06 } },
				active: { filter: { type: "darken", value: 0.1 } },
			},
			tooltip: {
				theme: "dark",
				y: { formatter: (v: number) => `${v}%` },
			},
			responsive: [
				{
					breakpoint: 480,
					options: { legend: { fontSize: "10px" } },
				},
			],
		}),
		[labels, colors, stats.topLanguage, stats.topLanguagePct, reducedMotion]
	);

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex items-center justify-between">
				<p className="font-cousine text-xs uppercase tracking-[0.2em] text-languages-base">
					Langages
				</p>
				<span className="font-cousine text-[10px] text-mist/40">
					{labels.length} détectés
				</span>
			</div>

			<div className="flex flex-1 items-center justify-center">
				{isLoading ? (
					<div className="my-8 aspect-square w-44 animate-pulse-soft rounded-full border-[10px] border-languages-base/30" />
				) : (
					<Chart
						type="donut"
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

export default Piechart;
