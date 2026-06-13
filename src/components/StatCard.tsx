import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";

export function Counter({
	value,
	suffix = "",
	reducedMotion,
}: {
	value: number;
	suffix?: string;
	reducedMotion: boolean;
}) {
	const ref = useRef<HTMLSpanElement>(null);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const print = (n: number) => {
			el.textContent = Math.round(n).toLocaleString("fr-FR") + suffix;
		};
		if (reducedMotion) {
			print(value);
			return;
		}
		const obj = { v: 0 };
		print(0);
		const tween = gsap.to(obj, {
			v: value,
			duration: 2,
			ease: "expoOut",
			onUpdate: () => print(obj.v),
			scrollTrigger: { trigger: el, start: "top 92%" },
		});
		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, [value, suffix, reducedMotion]);

	return <span ref={ref}>0{suffix}</span>;
}

interface StatCardProps {
	index: string;
	label: string;
	display: ReactNode;
	sub?: string;
	accent: string; // tailwind text color class for the index marker
}

function StatCard({ index, label, display, sub, accent }: StatCardProps) {
	return (
		<div
			data-reveal
			className="group relative flex flex-col justify-between gap-8 overflow-hidden p-6 transition-colors duration-500 hover:bg-main-100/[0.04] sm:p-8"
		>
			{/* hover glow */}
			<div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-main-100/60 to-transparent" />
			</div>

			<div className="flex items-center justify-between font-cousine text-[10px] uppercase tracking-[0.25em] text-mist/40">
				<span>{label}</span>
				<span className={accent}>{index}</span>
			</div>

			<div>
				<div className="font-serif-title text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-mist">
					{display}
				</div>
				{sub && (
					<p className="mt-3 font-cousine text-xs text-mist/45">{sub}</p>
				)}
			</div>
		</div>
	);
}

export default StatCard;
