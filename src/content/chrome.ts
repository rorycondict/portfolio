export interface RouteChrome {
	header: boolean;
	terminal: boolean;
	footer: boolean;
}

export const FULL_CHROME: RouteChrome = {
	header: true,
	terminal: true,
	footer: true,
};

export const NO_CHROME: Partial<RouteChrome> = {
	header: false,
	terminal: false,
	footer: false,
};

export const HEADER_FOOTER_CHROME: Partial<RouteChrome> = {
	header: true,
	terminal: false,
	footer: true,
};

declare module "@tanstack/react-router" {
	interface StaticDataRouteOption {
		chrome?: Partial<RouteChrome>;
	}
}
