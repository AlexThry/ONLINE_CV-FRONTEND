import type { ReactNode } from "react";

interface PanelProps {
	children: ReactNode;
	className?: string;
	reveal?: boolean;
	padded?: boolean;
}

/** Glassy bordered surface with a hairline glow on hover. */
function Panel({
	children,
	className = "",
	reveal = true,
	padded = true,
}: PanelProps) {
	return (
		<div
			{...(reveal ? { "data-reveal": "" } : {})}
			className={`group relative overflow-hidden rounded-2xl border border-main-100/10 bg-gradient-to-br from-main-100/[0.06] to-main-100/[0.01] transition-colors duration-500 hover:border-main-100/25 ${
				padded ? "p-6 sm:p-8" : ""
			} ${className}`}
		>
			<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-main-100/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
			{children}
		</div>
	);
}

export default Panel;
