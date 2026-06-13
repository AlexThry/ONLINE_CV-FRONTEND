import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Nav from "./feature/nav";
import Header from "./feature/header";
import Stats from "./feature/stats";
import Dashboard from "./feature/dashboard";
import Footer from "./feature/footer";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import { GithubDataProvider } from "./hooks/useGithubData";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { ScrollTrigger } from "./lib/gsap";

// Three.js is heavy and purely decorative — load it after first paint.
const ThreeBackground = lazy(() => import("./components/ThreeBackground"));

function App() {
	const reducedMotion = usePrefersReducedMotion();
	const [loaded, setLoaded] = useState(false);

	useSmoothScroll(!reducedMotion);

	const handleReveal = useCallback(() => setLoaded(true), []);

	// Once the curtain lifts and overflow is restored, recompute triggers.
	useEffect(() => {
		if (!loaded) return;
		const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
		return () => window.clearTimeout(id);
	}, [loaded]);

	return (
		<GithubDataProvider>
			<Cursor />
			<ScrollProgress />
			<Suspense fallback={null}>
				<ThreeBackground reveal={loaded} reducedMotion={reducedMotion} />
			</Suspense>
			<div className="atmosphere" aria-hidden="true" />
			<Preloader onReveal={handleReveal} reducedMotion={reducedMotion} />

			<Nav loaded={loaded} />

			<main className="relative z-10">
				<div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 2xl:px-24">
					<Header loaded={loaded} reducedMotion={reducedMotion} />
					<Stats reducedMotion={reducedMotion} />
					<Dashboard reducedMotion={reducedMotion} />
					<Footer reducedMotion={reducedMotion} />
				</div>
			</main>
		</GithubDataProvider>
	);
}

export default App;
