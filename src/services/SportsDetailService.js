import axios from "axios";

export const getAthletesBySports = async () => {
	const url = `${process.env.REACT_APP_API_URL}session/by/time`;
	// if (query.gender) {
	// 	return await axios.get(`${url}&gender=${query.gender}`);
	// }
	return await axios.get(url);
};
