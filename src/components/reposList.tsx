import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useGithubData } from "../hooks/useGithubData";

function RepoList({ reducedMotion }: { reducedMotion: boolean }) {
	const root = useRef<HTMLDivElement>(null);
	const { repos, isLoading } = useGithubData();

	useLayoutEffect(() => {
		if (reducedMotion || isLoading || !root.current) return;
		const ctx = gsap.context(() => {
			gsap.from(".repo-row", {
				y: 32,
				autoAlpha: 0,
				duration: 0.9,
				ease: "expoOut",
				stagger: 0.08,
				scrollTrigger: { trigger: root.current, start: "top 82%" },
			});
		}, root);
		return () => ctx.revert();
	}, [reducedMotion, isLoading]);

	return (
		<div ref={root} className="flex h-full w-full flex-col">
			<div className="flex items-center justify-between px-5 pt-5 sm:px-7 sm:pt-6">
				<p className="font-cousine text-xs uppercase tracking-[0.2em] text-repos-base">
					Dépôts récents
				</p>
				<span className="font-cousine text-[10px] text-mist/40">
					{isLoading ? "—" : `${repos.length} projets`}
				</span>
			</div>

			<div className="mt-4 flex flex-1 flex-col">
				{isLoading
					? Array.from({ length: 5 }).map((_, i) => (
							<div
								key={i}
								className="flex items-center gap-4 border-t border-main-100/10 px-5 py-6 sm:px-7"
							>
								<div className="h-3 w-6 animate-pulse-soft rounded bg-main-100/20" />
								<div className="h-4 flex-1 animate-pulse-soft rounded bg-main-100/15" />
							</div>
					  ))
					: repos.map((repo, i) => (
							<a
								key={`${repo.name}-${i}`}
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								data-cursor
								className="repo-row group/repo relative flex items-center gap-4 overflow-hidden border-t border-main-100/10 px-5 py-5 sm:gap-6 sm:px-7 sm:py-6"
							>
								{/* hover sweep */}
								<span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-main-100/[0.06] transition-transform duration-500 ease-expo group-hover/repo:scale-y-100" />
								<span className="pointer-events-none absolute bottom-0 left-0 top-0 w-px origin-bottom scale-y-0 bg-gradient-to-t from-languages-base via-main-100 to-commits-base transition-transform duration-500 ease-expo group-hover/repo:scale-y-100" />

								<span className="relative z-10 w-7 shrink-0 font-cousine text-xs text-mist/40">
									{String(i + 1).padStart(2, "0")}
								</span>

								<div className="relative z-10 min-w-0 flex-1">
									<h3 className="truncate font-serif-title text-lg text-mist transition-colors duration-300 group-hover/repo:text-main-100 sm:text-2xl">
										{repo.name}
									</h3>
									<p className="mt-1 line-clamp-1 font-cousine text-[11px] text-mist/50 sm:text-xs">
										{repo.description || "Sans description"}
									</p>
								</div>

								<span className="relative z-10 hidden shrink-0 rounded-full border border-main-100/20 px-3 py-1 font-cousine text-[10px] uppercase tracking-widest text-mist/45 md:inline-block">
									{repo.owner}
								</span>

								<span className="relative z-10 shrink-0 font-serif-title text-xl text-main-100 transition-transform duration-300 ease-expo group-hover/repo:-translate-y-1 group-hover/repo:translate-x-1">
									↗
								</span>
							</a>
					  ))}
			</div>
		</div>
	);
}

export default RepoList;
