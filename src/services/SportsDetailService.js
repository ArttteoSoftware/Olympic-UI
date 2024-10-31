import axios from "axios";

export const getSportDataBySportKey = async (sportKey, item_name) => {
	const url = `${process.env.REACT_APP_API_URL}units/${sportKey}?item_name=${item_name}`;
	return await axios.get(url);
};
