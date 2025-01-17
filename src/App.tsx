import Dashboard from "./feature/dashboard";
import Header from "./feature/header";

function App() {
	const description = import.meta.env.VITE_PAGE_DESCRIPTION;
	return (
		<>
			<div className="md:h-screen md:max-h-screen w-screen bg-main-base p-[15px] flex flex-col justify-between gap-[5px] hlg:p-[20px] hxl:p-[40px] hlg:gap-[10px] hxl:gap-[40px] hxxl-2xl:justify-around hxxl-2xl:px-[100px] hxxl-2xl:py-[80px]">
				<Header />
				<p className="font-cousine flex-initial h-auto text-[12px] text-main-100 leading-tight lg:w-2/3 md:text-[16px] lg:max-w-[950px] hxxl-2xl:text-[22px]">
					{description}
				</p>
				<Dashboard />
			</div>
		</>
	);
}

export default App;
