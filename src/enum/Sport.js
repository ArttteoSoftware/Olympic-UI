export const SportTitleEnum = {
	BTH: "Biathlon",
	ALP: "Alpine Skiing",
	CCS: "Cross Country Skiing",
	FRS: "Freestyle Skiing",
	IHO: "Ice Hockey",
	SBD: "Snowboarding",
	STK: "Short Track",
};

export const convertSportTitle = (props) => {
	return SportTitleEnum[props] || props;
};
