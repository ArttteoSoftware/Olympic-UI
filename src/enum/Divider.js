export const DividerColorEnum = {
	ALP: "D64540",
	BTH: "E8BC4F",
	CCS: "57A870",
	FRS: "3F78A3",
	FSK: "D64540",
	IHO: "E8BC4F",
	SBD: "57A870",
	STK: "3F78A3",
};

export const getDividerColor = (disciplineCode) => {
	console.log("disciplineCode", disciplineCode);
	switch (disciplineCode) {
		case "ALP":
			return DividerColorEnum.ALP;
		case "BTH":
			return DividerColorEnum.BTH;
		case "CCS":
			return DividerColorEnum.CCS;
		case "FRS":
			return DividerColorEnum.FRS;
		case "FSK":
			return DividerColorEnum.FSK;
		case "IHO":
			return DividerColorEnum.IHO;
		case "SBD":
			return DividerColorEnum.SBD;
		case "STK":
			return DividerColorEnum.STK;
		default:
			return null; // or a default color
	}
};
