declare module 'react-tippy' {
	interface TooltipProps {
		title?: string;
		distance?: number;
		arrow?: boolean;
		sticky?: boolean;
		children: React.ReactNode
	}

	class Tooltip extends React.Component<TooltipProps> { }
}
