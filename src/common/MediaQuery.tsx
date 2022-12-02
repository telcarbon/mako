import { useState, useEffect } from "react";

interface MediaQueryProps {
	mediaQueryType: MediaQueryType;
	value: number;
	unit: MediaQueryUnit;
}

export const useMediaQuery = (query: MediaQueryProps) => {
	const { mediaQueryType, value, unit } = query;
	const mediaQuery = getMediaQuery(mediaQueryType, value, unit);
	const [isMatch, setIsMatch] = useState(window.matchMedia(mediaQuery).matches);

	const matchMediaHandler = (e: MediaQueryListEvent) => {
		setIsMatch(e.matches);
	};

	useEffect(() => {
		window.matchMedia(mediaQuery).addListener(matchMediaHandler);
		return () => {
			window.matchMedia(mediaQuery).removeListener(matchMediaHandler);
		};
	}, []);

	return isMatch;
};

export enum MediaQueryType {
	MIN_WIDTH = "min-width",
	MAX_WIDTH = "max-width",
}

export enum MediaQueryUnit {
	PX = "px",
}

const getMediaQuery = (
	mediaQueryType: MediaQueryType,
	value: number,
	unit: MediaQueryUnit
) => {
	return `(${mediaQueryType}: ${value}${unit})`;
};
