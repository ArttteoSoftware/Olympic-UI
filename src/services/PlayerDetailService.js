import axios from "axios";

export const getMedalsByPlayerId = async (playerId) => {
	const url = `${process.env.REACT_APP_API_URL}medals/athlete/${playerId}`;
	return await axios.get(url);
};

export const getResultsByPlayerId = async (playerId) => {
	const url = `${process.env.REACT_APP_API_URL}results/${playerId}`;
	return await axios.get(url);
};
