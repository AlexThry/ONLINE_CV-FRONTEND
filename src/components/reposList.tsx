import { useEffect, useState } from "react";
import GithubService from "../service/github.service";

function RepoList() {
	const [repos, setRepos] = useState<
		{ name: string; description: string; owner: string; html_url: string }[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRepos = async () => {
			const githubService = new GithubService();
			const reposData = await githubService.getUserRepos(
				"AlexThry",
				5
			);
			setRepos(reposData);
			setIsLoading(false);
		};

		fetchRepos();
	}, []);

	const repo = (
		title: string,
		description: string,
		owner: string,
		url: string,
		last: boolean = false
	) => {
		return (
			<>
				<a
					href={url}
					target="_blank"
					className="flex w-full px-[10px] items-center justify-around border-main-100 h-[100px] border-opacity-10 gap-[10px] md:flex-1 md:h-auto hover:bg-main-100 hover:bg-opacity-10"
				>
					<h1 className="font-cousine text-[12px] w-[120px] line-clamp-3 break-words text-repos-base font-bold mdl:text-[16px]">
						{title}
					</h1>
					<p className="font-cousine line-clamp-3 text-[10px] text-repos-base w-[110px] mdl:text-[12px] mdl:w-[170px] lg:w-[350px]">
						{description}
					</p>
					<p className="font-cousine line-clamp-1 text-[10px] text-repos-base w-[80px] break-words mdl:text-[12px] md:w-[100px] lg:w-[150px]">
						{owner}
					</p>
				</a>
				{!last && (
					<div className="w-full border-main-100 border-opacity-10 border-b h-[1px]" />
				)}
			</>
		);
	};

	return (
		<>
			<div className="flex flex-col flex-auto w-full">
				{isLoading ? (
					<div className="w-full h-full flex justify-center items-center py-[25px]">
						<span className="loading loading-bars loading-lg bg-repos-base"></span>
					</div>
				) : (
					repos.map((repoData, index) => {
						return repo(
							repoData.name,
							repoData.description,
							repoData.owner,
							repoData.html_url,
							index === repos.length - 1
						);
					})
				)}
			</div>
		</>
	);
}

export default RepoList;
