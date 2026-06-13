import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

/**
 * A two-part custom cursor: a precise dot plus a trailing ring that grows
 * over interactive elements. Only mounts on devices with a fine pointer.
 */
function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const fine = window.matchMedia("(pointer: fine)").matches;
		if (!fine) return;
		setEnabled(true);
		document.documentElement.classList.add("has-cursor");
		return () => document.documentElement.classList.remove("has-cursor");
	}, []);

	useEffect(() => {
		if (!enabled) return;
		const dot = dotRef.current!;
		const ring = ringRef.current!;

		// GSAP owns the transform, so center the elements via xPercent/yPercent.
		gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

		const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
		const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
		const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
		const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

		let visible = false;
		const move = (e: PointerEvent) => {
			if (!visible) {
				visible = true;
				gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
			}
			dotX(e.clientX);
			dotY(e.clientY);
			ringX(e.clientX);
			ringY(e.clientY);
		};

		const isInteractive = (el: EventTarget | null) =>
			el instanceof Element &&
			el.closest("a, button, [data-cursor], input, label");

		const over = (e: PointerEvent) => {
			if (isInteractive(e.target)) {
				gsap.to(ring, {
					scale: 1.8,
					borderColor: "rgba(153,225,217,0.9)",
					duration: 0.35,
					ease: "expoOut",
				});
				gsap.to(dot, { scale: 0.4, duration: 0.35, ease: "expoOut" });
			}
		};
		const out = (e: PointerEvent) => {
			if (isInteractive(e.target)) {
				gsap.to(ring, {
					scale: 1,
					borderColor: "rgba(191,147,228,0.6)",
					duration: 0.35,
					ease: "expoOut",
				});
				gsap.to(dot, { scale: 1, duration: 0.35, ease: "expoOut" });
			}
		};
		const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });

		window.addEventListener("pointermove", move);
		document.addEventListener("pointerover", over);
		document.addEventListener("pointerout", out);
		document.addEventListener("pointerleave", leave);

		return () => {
			window.removeEventListener("pointermove", move);
			document.removeEventListener("pointerover", over);
			document.removeEventListener("pointerout", out);
			document.removeEventListener("pointerleave", leave);
		};
	}, [enabled]);

	if (!enabled) return null;

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
			<div
				ref={ringRef}
				className="absolute left-0 top-0 h-9 w-9 rounded-full border border-main-100/60 opacity-0"
			/>
			<div
				ref={dotRef}
				className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-main-100 opacity-0"
			/>
		</div>
	);
}

export default Cursor;
