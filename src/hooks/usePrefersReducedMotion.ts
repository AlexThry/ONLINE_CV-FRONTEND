import { useEffect, useState } from "react";

/**
 * Tracks the user's "prefers-reduced-motion" setting so heavy animations
 * (Three.js, smooth scroll, GSAP timelines) can be toned down or skipped.
 */
export function usePrefersReducedMotion(): boolean {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(query.matches);

		const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
		query.addEventListener("change", handler);
		return () => query.removeEventListener("change", handler);
	}, []);

	return reduced;
}
