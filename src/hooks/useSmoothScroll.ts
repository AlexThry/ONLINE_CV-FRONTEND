import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Wires Lenis momentum scrolling into GSAP's ticker and keeps ScrollTrigger
 * in sync. Disabled when the user prefers reduced motion (native scroll wins).
 */
export function useSmoothScroll(enabled: boolean) {
	useEffect(() => {
		if (!enabled) return;

		const lenis = new Lenis({
			duration: 1.1,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			touchMultiplier: 1.6,
		});

		lenis.on("scroll", ScrollTrigger.update);

		const ticker = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(ticker);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(ticker);
			lenis.destroy();
		};
	}, [enabled]);
}
