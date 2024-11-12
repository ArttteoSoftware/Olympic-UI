export const getFlag = (countryCode) => {
	let flagPath = `flags/${countryCode}.svg`;
	const defaultPath = "flags/GEO.svg";

	const img = new Image();
	img.src = flagPath;

	img.onerror = () => {
		// console;
		img.src = defaultPath;
		flagPath = defaultPath;
		// return defaultPath;
	};
	return flagPath;
};
