import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "../lib/gsap";
import Image from "/photo.png";
import Logo from "/logo.svg";

interface HeaderProps {
	loaded: boolean;
	reducedMotion: boolean;
}

const DESCRIPTION =
	import.meta.env.VITE_PAGE_DESCRIPTION ||
	"Étudiant ingénieur en data et développeur web sur des projets internes en entreprise, j'adore explorer la data science et développer des idées en code. Pas de projets extravagants ici, mais sur GitHub, c'est une collection de petits et grands projets qui reflètent ma curiosité et mon goût pour le travail bien fait.";

function Header({ loaded, reducedMotion }: HeaderProps) {
	const root = useRef<HTMLElement>(null);
	const portraitRef = useRef<HTMLDivElement>(null);

	// Intro reveal — built once, played the moment the preloader lifts.
	useLayoutEffect(() => {
		if (reducedMotion || !root.current) return;

		let titleSplit: SplitText | undefined;
		let descSplit: SplitText | undefined;

		const ctx = gsap.context(() => {
			// No line mask on the title: masking clips the descenders (the
			// bottom of the "y" in Thierry). We fade + rise the chars instead.
			titleSplit = new SplitText(".hero-title", {
				type: "lines,chars",
			});
			descSplit = new SplitText(".hero-desc", {
				type: "lines",
				mask: "lines",
			});

			const fadeBits = gsap.utils.toArray<HTMLElement>(".hero-fade");

			gsap.set(titleSplit.chars, { yPercent: 115, autoAlpha: 0 });
			gsap.set(descSplit.lines, { yPercent: 110 });
			gsap.set(fadeBits, { autoAlpha: 0, y: 24 });
			gsap.set(portraitRef.current, { autoAlpha: 0, scale: 0.92, y: 40 });

			if (!loaded) return;

			const tl = gsap.timeline({ defaults: { ease: "expoOut" } });
			tl.to(".hero-eyebrow .hero-fade", {
				autoAlpha: 1,
				y: 0,
				duration: 1,
				stagger: 0.08,
			})
				.to(
					titleSplit.chars,
					{ yPercent: 0, autoAlpha: 1, duration: 1.2, stagger: 0.022 },
					"-=0.7"
				)
				.to(
					portraitRef.current,
					{ autoAlpha: 1, scale: 1, y: 0, duration: 1.4 },
					"-=1"
				)
				.to(
					".hero-role .hero-fade",
					{ autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 },
					"-=1"
				)
				.to(
					descSplit.lines,
					{ yPercent: 0, duration: 1.1, stagger: 0.09 },
					"-=0.9"
				)
				.to(".hero-cue", { autoAlpha: 1, y: 0, duration: 1 }, "-=0.6");
		}, root);

		return () => {
			ctx.revert();
			titleSplit?.revert();
			descSplit?.revert();
		};
	}, [loaded, reducedMotion]);

	// Subtle pointer-driven tilt on the portrait card.
	useLayoutEffect(() => {
		const card = portraitRef.current;
		if (!card || reducedMotion) return;
		const rotX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
		const rotY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });

		const onMove = (e: PointerEvent) => {
			const rect = card.getBoundingClientRect();
			const px = (e.clientX - rect.left) / rect.width - 0.5;
			const py = (e.clientY - rect.top) / rect.height - 0.5;
			rotY(px * 14);
			rotX(-py * 14);
		};
		const onLeave = () => {
			rotX(0);
			rotY(0);
		};
		card.addEventListener("pointermove", onMove);
		card.addEventListener("pointerleave", onLeave);
		return () => {
			card.removeEventListener("pointermove", onMove);
			card.removeEventListener("pointerleave", onLeave);
		};
	}, [reducedMotion]);

	return (
		<header
			ref={root}
			className="relative flex min-h-[100svh] flex-col justify-center pb-24 pt-28 sm:pt-32"
		>
			{/* Eyebrow */}
			<div className="hero-eyebrow flex flex-wrap items-center justify-between gap-4 font-cousine text-[10px] uppercase tracking-[0.3em] text-main-100/70 sm:text-xs">
				<span className="hero-fade flex items-center gap-3">
					<span className="h-1.5 w-1.5 rounded-full bg-commits-base shadow-[0_0_12px_2px_rgba(153,225,217,0.7)]" />
					Disponible pour de nouveaux projets
				</span>
				<span className="hero-fade hidden sm:inline">Portfolio — 2026</span>
			</div>

			<div className="mt-10 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8">
				{/* Name + role */}
				<div className="order-2 lg:order-1 lg:col-span-8">
					<h1 className="hero-title font-serif-title leading-[0.95] tracking-[-0.02em] text-mist pb-[0.12em]">
						<span className="block text-[clamp(3.6rem,13vw,11rem)]">
							Alexis
						</span>
						<span
							className="block text-[clamp(3.6rem,13vw,11rem)]"
							style={{
								color: "rgba(191,147,228,0.16)",
								WebkitTextStroke: "1.5px rgba(191,147,228,0.85)",
							}}
						>
							Thierry
						</span>
					</h1>

					<div className="hero-role mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
						<p className="hero-fade font-cousine text-sm uppercase tracking-[0.25em] text-mist/80 sm:text-base">
							Data Engineer
						</p>
						<span className="hero-fade hidden h-px w-16 bg-main-100/40 sm:block" />
						<p className="hero-fade font-cousine text-sm uppercase tracking-[0.25em] text-mist/80 sm:text-base">
							Web Developer
						</p>
					</div>
				</div>

				{/* Portrait */}
				<div
					className="order-1 flex justify-center lg:order-2 lg:col-span-4 lg:justify-end"
					style={{ perspective: "1000px" }}
				>
					<div
						ref={portraitRef}
						data-cursor
						className="group relative w-[210px] sm:w-[260px] lg:w-full lg:max-w-[300px]"
						style={{ transformStyle: "preserve-3d" }}
					>
						<div className="glass relative overflow-hidden rounded-[28px] p-3">
							<img
								src={Image}
								alt="Portrait d'Alexis Thierry"
								className="aspect-square w-full rounded-[20px] object-cover grayscale transition-all duration-700 ease-expo group-hover:grayscale-0"
							/>
							<span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-night/70 px-3 py-1.5 font-cousine text-[10px] uppercase tracking-widest text-mist backdrop-blur">
								<span className="h-1.5 w-1.5 rounded-full bg-commits-base" />
								AlexThry
							</span>
						</div>
						<img
							src={Logo}
							alt=""
							aria-hidden="true"
							className="animate-float absolute -bottom-6 -right-4 w-20 opacity-90 drop-shadow-[0_0_24px_rgba(191,147,228,0.5)] lg:-right-8 lg:w-24"
						/>
					</div>
				</div>
			</div>

			{/* Description */}
			<p className="hero-desc mt-14 max-w-2xl font-cousine text-sm leading-relaxed text-mist/70 sm:text-base lg:mt-16 lg:max-w-3xl">
				{DESCRIPTION}
			</p>

			{/* Scroll cue */}
			<div className="hero-cue mt-16 flex items-center gap-4 font-cousine text-[10px] uppercase tracking-[0.3em] text-main-100/60">
				<span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-main-100/30 p-1">
					<span className="h-2 w-1 animate-bounce rounded-full bg-main-100" />
				</span>
				Défiler pour explorer
			</div>
		</header>
	);
}

export default Header;
