import axios from "axios";

export const getAllMatches = async () => {
  const url = `${process.env.REACT_APP_API_URL}/session/by/time`;
  return await axios.get(url);
};
