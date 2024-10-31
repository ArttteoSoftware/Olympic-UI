import axios from "axios";

export const getSportDataBySportKey = async (sportKey, item) => {
	if (item.unit_code === "") {
		const url = `${process.env.REACT_APP_API_URL}units/${sportKey}`;
		return await axios.get(url);
	} else {
		const url = `${process.env.REACT_APP_API_URL}units/${sportKey}?item_name=${item.item_name}`;
		return await axios.get(url);
	}
};
