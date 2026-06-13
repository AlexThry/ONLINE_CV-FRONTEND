import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

interface RevealOptions {
	reducedMotion: boolean;
	/** Re-runs the setup when these change (e.g. once async data lands). */
	deps?: unknown[];
	y?: number;
	stagger?: number;
}

/**
 * Reveals every `[data-reveal]` element inside `scope` as it scrolls into
 * view. When reduced motion is requested the elements simply stay visible.
 */
export function useReveal(
	scope: RefObject<HTMLElement | null>,
	{ reducedMotion, deps = [], y = 48, stagger = 0.09 }: RevealOptions
) {
	useLayoutEffect(() => {
		if (reducedMotion || !scope.current) return;
		const el = scope.current;

		const ctx = gsap.context(() => {
			// Scope the query to this section so sections don't animate each other.
			const items = Array.from(
				el.querySelectorAll<HTMLElement>("[data-reveal]")
			);
			items.forEach((item) => {
				const group = item.hasAttribute("data-reveal-group")
					? (Array.from(item.children) as HTMLElement[])
					: [item];
				gsap.from(group, {
					y,
					autoAlpha: 0,
					duration: 1.05,
					ease: "expoOut",
					stagger,
					scrollTrigger: {
						trigger: item,
						start: "top 88%",
					},
				});
			});
		}, scope);

		ScrollTrigger.refresh();
		return () => ctx.revert();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reducedMotion, ...deps]);
}
