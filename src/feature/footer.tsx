import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";

const USERNAME = import.meta.env.VITE_USERNAME || "AlexThry";
const GITHUB_URL = `https://github.com/${USERNAME}`;
const EMAIL = "alexis.thierry.pro@gmail.com";
const MARQUEE = "Alexis Thierry ✦ Data Engineer ✦ Web Developer ✦ ";

function Footer({ reducedMotion }: { reducedMotion: boolean }) {
	const root = useRef<HTMLElement>(null);
	useReveal(root, { reducedMotion });

	return (
		<footer
			ref={root}
			className="relative border-t border-main-100/10 pb-10 pt-20 sm:pt-24"
		>
			{/* Marquee */}
			<div className="overflow-hidden py-2" aria-hidden="true">
				<div
					className={`flex w-max whitespace-nowrap ${
						reducedMotion ? "" : "animate-marquee"
					}`}
				>
					{[0, 1].map((group) => (
						<span
							key={group}
							className="font-serif-title text-[clamp(2rem,7vw,5rem)] italic leading-none text-main-100/15"
						>
							{MARQUEE.repeat(3)}
						</span>
					))}
				</div>
			</div>

			{/* CTA */}
			<div
				data-reveal
				className="mt-16 flex flex-col gap-10 sm:mt-20 sm:flex-row sm:items-end sm:justify-between"
			>
				<div className="flex flex-col gap-4">
					<span className="font-cousine text-[10px] uppercase tracking-[0.3em] text-main-100/70">
						Travaillons ensemble
					</span>
					<a
						href={`mailto:${EMAIL}`}
						data-cursor
						className="group inline-flex w-fit items-center gap-3 font-serif-title text-[clamp(1.8rem,5vw,3.2rem)] leading-tight text-mist transition-colors hover:text-main-100"
					>
						{EMAIL}
						<span className="text-main-100 transition-transform duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1">
							↗
						</span>
					</a>
				</div>

				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor
					className="group inline-flex items-center gap-3 rounded-full border border-main-100/30 px-6 py-3 font-cousine text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:border-main-100 hover:bg-main-100/10"
				>
					Voir le GitHub
					<span className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
						↗
					</span>
				</a>
			</div>

			{/* Bottom row */}
			<div
				data-reveal
				className="mt-16 flex flex-col gap-3 border-t border-main-100/10 pt-8 font-cousine text-[10px] uppercase tracking-[0.2em] text-mist/40 sm:flex-row sm:items-center sm:justify-between"
			>
				<span>© {new Date().getFullYear()} Alexis Thierry</span>
				<span>Conçu avec React · Three.js · GSAP</span>
				<button
					type="button"
					data-cursor
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="text-left transition-colors hover:text-main-100 sm:text-right"
				>
					Retour en haut ↑
				</button>
			</div>
		</footer>
	);
}

export default Footer;
