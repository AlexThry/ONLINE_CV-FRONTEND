/**
 * Shared types for the GitHub activity data + graceful demo fallbacks.
 *
 * The live API (https://api.alexis-thierry.com/github) may be unreachable
 * in some environments. To keep the experience "award worthy" no matter
 * what, every widget falls back to this curated demo data instead of
 * rendering empty states.
 */

export interface LanguageDatum {
	language: string;
	percentage: string; // e.g. "38%"
}

export interface RepoDatum {
	name: string;
	description: string;
	owner: string;
	html_url: string;
}

export type CommitsPerMonth = Record<string, number>;

export const fallbackLanguages: LanguageDatum[] = [
	{ language: "TypeScript", percentage: "36%" },
	{ language: "Python", percentage: "28%" },
	{ language: "JavaScript", percentage: "19%" },
	{ language: "Other", percentage: "17%" },
];

export const fallbackCommits: CommitsPerMonth = {
	"2025-07": 38,
	"2025-08": 52,
	"2025-09": 41,
	"2025-10": 67,
	"2025-11": 73,
	"2025-12": 49,
	"2026-01": 88,
	"2026-02": 61,
	"2026-03": 95,
	"2026-04": 72,
	"2026-05": 110,
	"2026-06": 64,
};

export const fallbackRepos: RepoDatum[] = [
	{
		name: "online-cv-frontend",
		description:
			"Portfolio temps réel propulsé par l'API GitHub — Three.js, GSAP et data-viz.",
		owner: "AlexThry",
		html_url: "https://github.com/AlexThry",
	},
	{
		name: "data-pipeline-engine",
		description:
			"ETL distribué pour l'ingestion et la transformation de larges jeux de données.",
		owner: "AlexThry",
		html_url: "https://github.com/AlexThry",
	},
	{
		name: "ml-forecast-lab",
		description:
			"Laboratoire de modèles de séries temporelles et de prévision pour la prod.",
		owner: "AlexThry",
		html_url: "https://github.com/AlexThry",
	},
	{
		name: "github-insights-api",
		description:
			"Service qui agrège l'activité GitHub : langages, commits et dépôts.",
		owner: "AlexThry",
		html_url: "https://github.com/AlexThry",
	},
	{
		name: "design-system-kit",
		description:
			"Système de composants accessibles, animés et entièrement responsives.",
		owner: "AlexThry",
		html_url: "https://github.com/AlexThry",
	},
];

/** Palette mapped to the brand. Cycled if there are more languages. */
export const CHART_PALETTE = [
	"#BF93E4", // violet
	"#99E1D9", // teal
	"#EAC8CA", // rose
	"#AD75DD",
	"#7E26C9",
	"#F9F8F8",
];
