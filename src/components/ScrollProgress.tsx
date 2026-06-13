import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/** A hairline bar across the top of the viewport tracking scroll progress. */
function ScrollProgress() {
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tween = gsap.to(barRef.current, {
			scaleX: 1,
			ease: "none",
			scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
		});
		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, []);

	return (
		<div
			aria-hidden="true"
			className="fixed inset-x-0 top-0 z-40 h-[2px] bg-main-100/10"
		>
			<div
				ref={barRef}
				className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-languages-base via-main-100 to-commits-base"
			/>
		</div>
	);
}

export default ScrollProgress;
