import axios, { type AxiosInstance } from "axios";
import type {
	CommitsPerMonth,
	LanguageDatum,
	RepoDatum,
} from "../data/github";

class GithubService {
	private client: AxiosInstance;

	constructor() {
		const root =
			import.meta.env.VITE_API_BASE_URL ?? "https://api.alexis-thierry.com";
		this.client = axios.create({
			baseURL: `${root.replace(/\/$/, "")}/github`,
			// Fail fast so the UI can fall back to demo data instead of hanging.
			timeout: 8000,
		});
	}

	async getUserRepos(username: string, perPage: number): Promise<RepoDatum[]> {
		const response = await this.client.get(
			`/user/${username}/repos/${perPage}`
		);
		return response.data;
	}

	async getUserCommitsPerMonth(username: string): Promise<CommitsPerMonth> {
		const response = await this.client.get(
			`/user/${username}/commits-per-month`
		);
		return response.data;
	}

	async getTopLanguages(username: string): Promise<LanguageDatum[]> {
		const response = await this.client.get(`/user/${username}/top-languages`);
		return response.data;
	}
}

export default GithubService;
