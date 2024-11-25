export const SportTitleEnum = {
	BTH: "BIATHLON",
	ALP: "ALPINE SKIING",
	CCS: "CROSS COUNTRY SKIING",
	FRS: "FREESTYLE SKIING",
	FSK: "FIGURE SKATING",
	IHO: "ICE HOCKEY",
	SBD: "SNOWBOARDING",
	STK: "SHORT TRACK",
};

export const convertSportTitle = (props) => {
	return SportTitleEnum[props] || props;
};
