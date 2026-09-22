export interface RouteChrome {
	header: boolean;
	terminal: boolean;
	footer: boolean;
	transition: boolean;
}

export const FULL_CHROME: RouteChrome = {
	header: true,
	terminal: true,
	footer: true,
	transition: true,
};

export const NO_CHROME: Partial<RouteChrome> = {
	header: false,
	terminal: false,
	footer: false,
	transition: false,
};

export const HEADER_FOOTER_CHROME: Partial<RouteChrome> = {
	header: true,
	terminal: false,
	footer: true,
	transition: false,
};

declare module "@tanstack/react-router" {
	interface StaticDataRouteOption {
		chrome?: Partial<RouteChrome>;
	}
}
