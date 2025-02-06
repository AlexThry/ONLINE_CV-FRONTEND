import Dashboard from "./feature/dashboard";
import Header from "./feature/header";

function App() {
	const description =
		"Étudiant ingénieur en data et développeur web sur des projets internes en entreprise, j’adore explorer la data science et développer des idées en code. Pas de projets extravagants ici, mais sur GitHub, c’est une collection de petits et grands projets qui reflètent ma curiosité et mon goût pour le travail bien fait.";
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
