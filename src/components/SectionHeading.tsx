interface SectionHeadingProps {
	index: string;
	kicker: string;
	title: string;
}

function SectionHeading({ index, kicker, title }: SectionHeadingProps) {
	return (
		<div data-reveal data-reveal-group className="flex flex-col gap-5">
			<div className="flex items-center gap-4 font-cousine text-[10px] uppercase tracking-[0.3em] text-main-100/70 sm:text-xs">
				<span>{index}</span>
				<span className="eyebrow-line h-px w-12" />
				<span className="text-mist/50">{kicker}</span>
			</div>
			<h2 className="max-w-2xl font-serif-title text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.05] text-mist">
				{title}
			</h2>
		</div>
	);
}

export default SectionHeading;
