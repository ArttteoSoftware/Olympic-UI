export const SportTitleEnum = {
	BTH: "Biathlon",
	ALP: "Alpine Skiing",
};

export const convertSportTitle = (props) => {
	return SportTitleEnum[props] || props;
};
