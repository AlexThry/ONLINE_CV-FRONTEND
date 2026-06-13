import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

interface PreloaderProps {
	/** Fires the moment the curtain starts lifting (hero + 3D intro begin). */
	onReveal: () => void;
	reducedMotion: boolean;
}

function Preloader({ onReveal, reducedMotion }: PreloaderProps) {
	const root = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const [gone, setGone] = useState(false);

	useLayoutEffect(() => {
		document.body.style.overflow = "hidden";

		const ctx = gsap.context(() => {
			const counter = { value: 0 };
			const setCount = () => {
				if (counterRef.current) {
					counterRef.current.textContent = String(
						Math.round(counter.value)
					).padStart(3, "0");
				}
			};

			const reveal = () => {
				// Hand scrolling back as the curtain lifts.
				document.body.style.overflow = "";
				onReveal();
			};

			if (reducedMotion) {
				setCount();
				gsap
					.timeline({ onComplete: () => setGone(true) })
					.set(counter, { value: 100, onUpdate: setCount })
					.call(reveal)
					.to(root.current, { autoAlpha: 0, duration: 0.6 }, "+=0.2");
				return;
			}

			const tl = gsap.timeline({
				defaults: { ease: "expoOut" },
				onComplete: () => setGone(true),
			});

			tl.to(counter, {
				value: 100,
				duration: 1.7,
				ease: "power2.inOut",
				onUpdate: setCount,
			})
				.to(barRef.current, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0)
				.to(
					innerRef.current,
					{ yPercent: -120, autoAlpha: 0, duration: 0.9 },
					"+=0.15"
				)
				.call(reveal, [], "-=0.2")
				.to(
					root.current,
					{ yPercent: -100, duration: 1.1, ease: "powerReveal" },
					"-=0.1"
				);
		}, root);

		return () => {
			ctx.revert();
			document.body.style.overflow = "";
		};
	}, [onReveal, reducedMotion]);

	if (gone) return null;

	return (
		<div
			ref={root}
			className="fixed inset-0 z-50 flex items-center justify-center bg-night"
		>
			<div
				ref={innerRef}
				className="flex w-full max-w-[460px] flex-col items-center gap-8 px-8"
			>
				<svg
					width="64"
					height="38"
					viewBox="0 0 200 118"
					fill="none"
					className="animate-pulse-soft"
				>
					<path
						d="M100 81.2716L146.85 0.818176H53.15L100 81.2716ZM46.85 36.7284L0 117.182H93.7L46.85 36.7284ZM153.15 36.7284L106.3 117.182H200L153.15 36.7284Z"
						fill="#BF93E4"
					/>
				</svg>

				<div className="flex w-full items-end justify-between font-cousine text-mist">
					<span className="text-xs uppercase tracking-[0.3em] text-main-100/60">
						Chargement
					</span>
					<span className="font-serif-title text-5xl leading-none">
						<span ref={counterRef}>000</span>
						<span className="text-main-100">%</span>
					</span>
				</div>

				<div className="h-px w-full overflow-hidden bg-main-100/15">
					<div
						ref={barRef}
						className="h-full w-full origin-left scale-x-0 bg-main-100"
					/>
				</div>
			</div>
		</div>
	);
}

export default Preloader;
