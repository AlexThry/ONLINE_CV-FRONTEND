import { lazy, Suspense, useRef } from "react";
import Panel from "../components/Panel";
import RepoList from "../components/reposList";
import SectionHeading from "../components/SectionHeading";
import { useGithubData } from "../hooks/useGithubData";
import { useReveal } from "../hooks/useReveal";

// ApexCharts is below the fold — defer it to a separate chunk.
const Piechart = lazy(() => import("../components/piechart"));
const Timechart = lazy(() => import("../components/timechart"));

const ChartFallback = () => (
	<div className="my-8 h-44 w-full animate-pulse-soft rounded-xl bg-main-100/10" />
);

function Dashboard({ reducedMotion }: { reducedMotion: boolean }) {
	const root = useRef<HTMLElement>(null);
	const { usingFallback } = useGithubData();
	useReveal(root, { reducedMotion });

	return (
		<section ref={root} id="dashboard" className="py-20 sm:py-28 lg:py-32">
			<div className="flex flex-wrap items-end justify-between gap-6">
				<SectionHeading
					index="02"
					kicker="Dashboard"
					title="Langages, commits & dépôts en direct."
				/>
				{usingFallback && (
					<span
						data-reveal
						className="flex items-center gap-2 rounded-full border border-languages-base/30 px-3 py-1.5 font-cousine text-[10px] uppercase tracking-widest text-languages-base/80"
					>
						<span className="h-1.5 w-1.5 rounded-full bg-languages-base" />
						Données de démonstration
					</span>
				)}
			</div>

			<div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
				<Panel className="flex min-h-[380px] flex-col lg:col-span-5">
					<Suspense fallback={<ChartFallback />}>
						<Piechart reducedMotion={reducedMotion} />
					</Suspense>
				</Panel>

				<Panel className="flex min-h-[380px] flex-col lg:col-span-7">
					<Suspense fallback={<ChartFallback />}>
						<Timechart reducedMotion={reducedMotion} />
					</Suspense>
				</Panel>

				<Panel
					reveal={false}
					padded={false}
					className="md:col-span-2 lg:col-span-12"
				>
					<RepoList reducedMotion={reducedMotion} />
				</Panel>
			</div>
		</section>
	);
}

export default Dashboard;
