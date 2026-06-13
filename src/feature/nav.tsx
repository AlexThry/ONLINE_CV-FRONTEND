import Logo from "/logo.svg";

const GITHUB_URL = `https://github.com/${
	import.meta.env.VITE_USERNAME || "AlexThry"
}`;

function Nav({ loaded }: { loaded: boolean }) {
	return (
		<nav
			className={`fixed inset-x-0 top-0 z-30 transition-all duration-1000 ease-expo ${
				loaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
			}`}
		>
			<div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16 2xl:px-24">
				<button
					type="button"
					data-cursor
					onClick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })
					}
					className="flex items-center gap-3"
				>
					<img src={Logo} alt="" className="h-5 w-auto" aria-hidden="true" />
					<span className="font-serif-title text-base text-mist sm:text-lg">
						Alexis Thierry
					</span>
				</button>

				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor
					className="group flex items-center gap-2 font-cousine text-[11px] uppercase tracking-[0.25em] text-mist/80 transition-colors hover:text-main-100 sm:text-xs"
				>
					GitHub
					<span className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
						↗
					</span>
				</a>
			</div>
		</nav>
	);
}

export default Nav;
