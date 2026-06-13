import { useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import StatCard, { Counter } from "../components/StatCard";
import { useGithubData } from "../hooks/useGithubData";
import { useReveal } from "../hooks/useReveal";

function Stats({ reducedMotion }: { reducedMotion: boolean }) {
	const root = useRef<HTMLElement>(null);
	const { stats } = useGithubData();
	useReveal(root, { reducedMotion });

	return (
		<section ref={root} className="py-20 sm:py-28 lg:py-32">
			<SectionHeading
				index="01"
				kicker="Activité GitHub"
				title="Le code, en quelques chiffres."
			/>

			<div className="mt-12 grid grid-cols-2 divide-x divide-y divide-main-100/10 border border-main-100/10 lg:mt-16 lg:grid-cols-4 lg:divide-y-0">
				<StatCard
					index="↗"
					label="Commits · 12 mois"
					accent="text-commits-base"
					display={
						<Counter value={stats.totalCommits} reducedMotion={reducedMotion} />
					}
					sub={`${stats.activeMonths} mois actifs`}
				/>
				<StatCard
					index="◆"
					label="Pic mensuel"
					accent="text-languages-base"
					display={
						<Counter value={stats.peakMonth} reducedMotion={reducedMotion} />
					}
					sub="Meilleur mois"
				/>
				<StatCard
					index="✦"
					label="Langages"
					accent="text-main-100"
					display={
						<Counter
							value={stats.languagesCount}
							reducedMotion={reducedMotion}
						/>
					}
					sub="Suivis sur le profil"
				/>
				<StatCard
					index="★"
					label="Stack principale"
					accent="text-repos-base"
					display={
						<span className="break-words text-[clamp(1.6rem,4vw,2.8rem)]">
							{stats.topLanguage}
						</span>
					}
					sub={stats.topLanguagePct ? `${stats.topLanguagePct} du code` : undefined}
				/>
			</div>
		</section>
	);
}

export default Stats;
