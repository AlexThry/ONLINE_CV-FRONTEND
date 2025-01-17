import Image from "/photo.png";
import Logo from "/logo.svg";

function Header() {
	return (
		<>
			<div className="flex w-full justify-between items-center flex-col gap-[20px] sm:flex-row sm:gap-[75px]">
				<img
					src={Image}
					alt="photo de moi :)"
					className="rounded-full h-[120px] w-[120px] hxl-mdl:h-[160px] hxl-mdl:w-[160px] hxxl-2xl:h-[240px] hxxl-2xl:w-[240px]"
				/>
				<div className="flex flex-col h-full w-full justify-center">
					<h1 className="font-serif-title text-main-100 text-[60px] leading-tight tracking-[-2%] hxl-mdl:text-[80px] hxxl-2xl:text-[120px]">
						Alexis Thierry
					</h1>
					<h1 className="font-serif-title text-main-100 text-[30px] leading-tight tracking-[-1%] hxl-mdl:text-[40px] hxxl-2xl:text-[60px]">
						Data Engineer - Web Developeur
					</h1>
				</div>
				<img
					src={Logo}
					alt="mon petit logo"
					className="fill-main-100 w-[200px] h-[160px] hidden xl:block hxxl-2xl:!w-[260px] hxxl-2xl:!h-[208px]"
				/>
			</div>
		</>
	);
}

export default Header;
