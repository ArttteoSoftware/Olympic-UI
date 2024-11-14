import {
	BlueDivider,
	GreenDivider,
	RedDivider,
	YellowDivider,
} from "../UI/Icons";

export const DividerColorEnum = {
	ALP: <RedDivider />,
	BTH: <YellowDivider />,
	CCS: <GreenDivider />,
	FRS: <BlueDivider />,
	FSK: <RedDivider />,
	IHO: <YellowDivider />,
	SBD: <GreenDivider />,
	STK: <BlueDivider />,
};

export const getDividerColor = (disciplineCode) => {
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
