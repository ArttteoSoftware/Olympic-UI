import axios from "axios";

export const getAthletesBySports = async (query) => {
	const url = `${process.env.REACT_APP_API_URL}sport?sport=${query.sport}`;
	if (query.gender) {
		return await axios.get(`${url}&gender=${query.gender}`);
	}
	return await axios.get(url);
};
