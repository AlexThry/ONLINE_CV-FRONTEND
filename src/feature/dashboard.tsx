import Piechart from "../components/piechart";
import RepoList from "../components/reposList";
import Timechart from "../components/timechart";

function Dashboard() {
	return (
		<>
			<div className="h-full flex-1 flex w-full flex-col gap-[25px] md:max-h-[600px] md:w-full md:flex-row">
				<div className="h-full w-full md:w-[600px] gap-[25px] flex flex-col hxxl-2xl:w-[800px]">
                    <div className="w-full flex flex-1 p-[20px] bg-main-100 bg-opacity-10 border-main-100 border-opacity-10 border border-solid">
                        <Piechart/>
                    </div>
					<div className="w-full flex flex-1 p-[20px] bg-main-100 bg-opacity-10 border-main-100 border-opacity-10 border border-solid">
                        <Timechart/>
                    </div>
				</div>
                <div className="w-[1px] hidden bg-main-100 bg-opacity-20 mdl:block"></div>
                <div className="h-full w-full flex bg-main-100 bg-opacity-10 border-main-100 border-opacity-10 border border-solid overflow-hidden">
                    <RepoList/>
                </div>
			</div>
		</>
	);
}

export default Dashboard;
