import axios from "axios";

export const getSportDataBySportKey = async (sportKey, gender) => {
	const url = `${process.env.REACT_APP_API_URL}units/${sportKey}`;
	return await axios.get(url);
};
