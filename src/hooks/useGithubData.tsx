import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import GithubService from "../service/github.service";
import {
	fallbackCommits,
	fallbackLanguages,
	fallbackRepos,
	type CommitsPerMonth,
	type LanguageDatum,
	type RepoDatum,
} from "../data/github";

export interface CommitPoint {
	label: string; // "Jun 26"
	raw: string; // "2026-06"
	count: number;
}

export interface GithubStats {
	totalCommits: number;
	peakMonth: number;
	activeMonths: number;
	languagesCount: number;
	projectsCount: number;
	topLanguage: string;
	topLanguagePct: string;
}

interface GithubData {
	languages: LanguageDatum[];
	commits: CommitPoint[];
	repos: RepoDatum[];
	stats: GithubStats;
	isLoading: boolean;
	usingFallback: boolean;
}

const USERNAME = import.meta.env.VITE_USERNAME || "AlexThry";

const MONTH_LABELS = [
	"Jan",
	"Fév",
	"Mar",
	"Avr",
	"Mai",
	"Juin",
	"Juil",
	"Aoû",
	"Sep",
	"Oct",
	"Nov",
	"Déc",
];

function toCommitPoints(data: CommitsPerMonth): CommitPoint[] {
	return Object.entries(data)
		.sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
		.map(([raw, count]) => {
			const [year, month] = raw.split("-");
			const monthIndex = Math.max(0, parseInt(month, 10) - 1);
			const label = `${MONTH_LABELS[monthIndex] ?? month} ${
				year?.slice(2) ?? ""
			}`.trim();
			return { raw, label, count: Number(count) || 0 };
		});
}

function sortLanguages(langs: LanguageDatum[]): LanguageDatum[] {
	return [...langs].sort(
		(a, b) =>
			parseFloat(b.percentage.replace("%", "")) -
			parseFloat(a.percentage.replace("%", ""))
	);
}

const GithubDataContext = createContext<GithubData | null>(null);

export function GithubDataProvider({ children }: { children: ReactNode }) {
	const [languages, setLanguages] = useState<LanguageDatum[]>([]);
	const [commits, setCommits] = useState<CommitPoint[]>([]);
	const [repos, setRepos] = useState<RepoDatum[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [usingFallback, setUsingFallback] = useState(false);

	useEffect(() => {
		let cancelled = false;
		const service = new GithubService();

		const run = async () => {
			const [langRes, commitRes, repoRes] = await Promise.allSettled([
				service.getTopLanguages(USERNAME),
				service.getUserCommitsPerMonth(USERNAME),
				service.getUserRepos(USERNAME, 5),
			]);

			if (cancelled) return;

			let fellBack = false;

			if (langRes.status === "fulfilled" && langRes.value?.length) {
				setLanguages(sortLanguages(langRes.value));
			} else {
				setLanguages(sortLanguages(fallbackLanguages));
				fellBack = true;
			}

			if (
				commitRes.status === "fulfilled" &&
				commitRes.value &&
				Object.keys(commitRes.value).length
			) {
				setCommits(toCommitPoints(commitRes.value));
			} else {
				setCommits(toCommitPoints(fallbackCommits));
				fellBack = true;
			}

			if (repoRes.status === "fulfilled" && repoRes.value?.length) {
				setRepos(repoRes.value);
			} else {
				setRepos(fallbackRepos);
				fellBack = true;
			}

			setUsingFallback(fellBack);
			setIsLoading(false);
		};

		run();
		return () => {
			cancelled = true;
		};
	}, []);

	const stats = useMemo<GithubStats>(() => {
		const counts = commits.map((c) => c.count);
		const totalCommits = counts.reduce((sum, n) => sum + n, 0);
		const top = languages[0];
		return {
			totalCommits,
			peakMonth: counts.length ? Math.max(...counts) : 0,
			activeMonths: counts.filter((n) => n > 0).length,
			languagesCount: languages.length,
			projectsCount: repos.length,
			topLanguage: top?.language ?? "—",
			topLanguagePct: top?.percentage ?? "",
		};
	}, [commits, languages, repos]);

	const value = useMemo<GithubData>(
		() => ({ languages, commits, repos, stats, isLoading, usingFallback }),
		[languages, commits, repos, stats, isLoading, usingFallback]
	);

	return (
		<GithubDataContext.Provider value={value}>
			{children}
		</GithubDataContext.Provider>
	);
}

export function useGithubData(): GithubData {
	const ctx = useContext(GithubDataContext);
	if (!ctx) {
		throw new Error("useGithubData must be used within a GithubDataProvider");
	}
	return ctx;
}
