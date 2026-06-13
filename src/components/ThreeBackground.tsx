import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "../lib/gsap";

interface ThreeBackgroundProps {
	/** Flips to true once the preloader lifts — triggers the intro. */
	reveal: boolean;
	reducedMotion: boolean;
}

/** Soft radial sprite so every particle reads as a glowing dot, not a square. */
function makeSprite(): THREE.Texture {
	const size = 64;
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext("2d")!;
	const gradient = ctx.createRadialGradient(
		size / 2,
		size / 2,
		0,
		size / 2,
		size / 2,
		size / 2
	);
	gradient.addColorStop(0, "rgba(255,255,255,1)");
	gradient.addColorStop(0.35, "rgba(255,255,255,0.65)");
	gradient.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size, size);
	const texture = new THREE.CanvasTexture(canvas);
	texture.needsUpdate = true;
	return texture;
}

/** Evenly distribute points on a sphere (Fibonacci spiral). */
function buildGlobe(
	count: number,
	radius: number,
	palette: THREE.Color[]
): { positions: Float32Array; colors: Float32Array } {
	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);
	const golden = Math.PI * (1 + Math.sqrt(5));

	for (let i = 0; i < count; i++) {
		const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
		const theta = golden * i;
		const sinPhi = Math.sin(phi);
		positions[i * 3] = radius * sinPhi * Math.cos(theta);
		positions[i * 3 + 1] = radius * Math.cos(phi);
		positions[i * 3 + 2] = radius * sinPhi * Math.sin(theta);

		// Bias toward violet/teal, sprinkle rose accents.
		const roll = Math.random();
		const base =
			roll > 0.86 ? palette[2] : roll > 0.5 ? palette[1] : palette[0];
		const shade = 0.55 + Math.random() * 0.45;
		colors[i * 3] = base.r * shade;
		colors[i * 3 + 1] = base.g * shade;
		colors[i * 3 + 2] = base.b * shade;
	}
	return { positions, colors };
}

/** A loose halo of drifting dust around the globe. */
function buildDust(count: number, radius: number): Float32Array {
	const positions = new Float32Array(count * 3);
	for (let i = 0; i < count; i++) {
		const r = radius * (0.4 + Math.random() * 0.6);
		const phi = Math.acos(2 * Math.random() - 1);
		const theta = 2 * Math.PI * Math.random();
		positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
		positions[i * 3 + 1] = r * Math.cos(phi);
		positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
	}
	return positions;
}

function ThreeBackground({ reveal, reducedMotion }: ThreeBackgroundProps) {
	const mountRef = useRef<HTMLDivElement>(null);
	const groupRef = useRef<THREE.Group | null>(null);
	const matsRef = useRef<THREE.PointsMaterial[]>([]);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		} catch {
			// No WebGL — the CSS atmosphere gradient remains as a graceful fallback.
			return;
		}

		const width = mount.clientWidth;
		const height = mount.clientHeight;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		renderer.setClearAlpha(0);
		mount.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
		camera.position.z = 6.4;

		const palette = [
			new THREE.Color("#BF93E4"),
			new THREE.Color("#99E1D9"),
			new THREE.Color("#EAC8CA"),
		];
		const sprite = makeSprite();

		const group = new THREE.Group();
		group.rotation.x = 0.35;
		groupRef.current = group;
		scene.add(group);

		// --- Globe -----------------------------------------------------------
		const globeCount = reducedMotion ? 1400 : 2800;
		const globeRadius = 2.45;
		const { positions, colors } = buildGlobe(globeCount, globeRadius, palette);
		const globeGeo = new THREE.BufferGeometry();
		globeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		globeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
		const globeMat = new THREE.PointsMaterial({
			size: 0.055,
			map: sprite,
			vertexColors: true,
			transparent: true,
			opacity: 0,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
		});
		const globe = new THREE.Points(globeGeo, globeMat);
		group.add(globe);

		// --- Dust ------------------------------------------------------------
		const dustCount = reducedMotion ? 260 : 720;
		const dustGeo = new THREE.BufferGeometry();
		dustGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(buildDust(dustCount, 9), 3)
		);
		const dustMat = new THREE.PointsMaterial({
			size: 0.04,
			map: sprite,
			color: new THREE.Color("#BF93E4"),
			transparent: true,
			opacity: 0,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
		});
		const dust = new THREE.Points(dustGeo, dustMat);
		scene.add(dust);

		matsRef.current = [globeMat, dustMat];

		// --- Interaction -----------------------------------------------------
		const pointer = { x: 0, y: 0 };
		const target = { x: 0, y: 0 };
		const onPointerMove = (event: PointerEvent) => {
			target.x = (event.clientX / window.innerWidth - 0.5) * 2;
			target.y = (event.clientY / window.innerHeight - 0.5) * 2;
		};
		if (!reducedMotion) window.addEventListener("pointermove", onPointerMove);

		const clock = new THREE.Clock();
		let frameId = 0;
		let running = true;

		const render = () => {
			const elapsed = clock.getElapsedTime();
			pointer.x += (target.x - pointer.x) * 0.04;
			pointer.y += (target.y - pointer.y) * 0.04;

			if (!reducedMotion) {
				group.rotation.y = elapsed * 0.06 + pointer.x * 0.4;
				group.rotation.x = 0.35 + pointer.y * 0.25;
				const breathe = 1 + Math.sin(elapsed * 0.6) * 0.015;
				group.scale.setScalar(breathe);
				dust.rotation.y = -elapsed * 0.02;
				camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.05;
				camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.05;
				camera.lookAt(scene.position);
			}

			renderer.render(scene, camera);
			if (running) frameId = requestAnimationFrame(render);
		};

		const onResize = () => {
			const w = mount.clientWidth;
			const h = mount.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
			if (!running) renderer.render(scene, camera);
		};
		window.addEventListener("resize", onResize);

		// Pause when the tab is hidden to save the battery.
		const onVisibility = () => {
			if (document.hidden) {
				running = false;
				cancelAnimationFrame(frameId);
			} else if (!reducedMotion) {
				running = true;
				frameId = requestAnimationFrame(render);
			}
		};
		document.addEventListener("visibilitychange", onVisibility);

		if (reducedMotion) {
			gsap.to([globeMat, dustMat], { opacity: 0.85, duration: 1 });
			renderer.render(scene, camera);
		} else {
			render();
		}

		return () => {
			running = false;
			cancelAnimationFrame(frameId);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("resize", onResize);
			document.removeEventListener("visibilitychange", onVisibility);
			globeGeo.dispose();
			dustGeo.dispose();
			globeMat.dispose();
			dustMat.dispose();
			sprite.dispose();
			renderer.dispose();
			if (renderer.domElement.parentNode === mount) {
				mount.removeChild(renderer.domElement);
			}
			groupRef.current = null;
			matsRef.current = [];
		};
	}, [reducedMotion]);

	// Intro: fade the particles up and spin the globe into place.
	useEffect(() => {
		if (!reveal || reducedMotion) return;
		const group = groupRef.current;
		const mats = matsRef.current;
		if (!group || mats.length === 0) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				mats[0],
				{ opacity: 0 },
				{ opacity: 0.95, duration: 2.2, ease: "power2.out" }
			);
			gsap.fromTo(
				mats[1],
				{ opacity: 0 },
				{ opacity: 0.5, duration: 2.6, ease: "power2.out" }
			);
			gsap.from(group.rotation, {
				y: -1.4,
				duration: 2.8,
				ease: "expoOut",
			});
			gsap.from(group.scale, {
				x: 0.4,
				y: 0.4,
				z: 0.4,
				duration: 2.6,
				ease: "expoOut",
			});
		});
		return () => ctx.revert();
	}, [reveal, reducedMotion]);

	return (
		<div
			ref={mountRef}
			aria-hidden="true"
			className="fixed inset-0 z-0 h-[100dvh] w-full"
		/>
	);
}

export default ThreeBackground;
