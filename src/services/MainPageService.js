import axios from "axios";

export const getAllMatches = async (selectedDate) => {
  // const currentDate = new Date()
  // const date = new Date(Date.UTC(2022, 1, currentDate.getUTCDate(), 12, 10, 0))
  // const formattedDate = date.toISOString()

  const formattedDate = selectedDate?.toISOString();

  const url = `${process.env.REACT_APP_API_URL}/next?date=${formattedDate}`;

  // const url = `${process.env.REACT_APP_API_URL}/session/by/time`;

  return await axios.get(url);
};

export const getTodaysMatches = async (disciplineCode, date) => {
  const ff = new Date("2022-02-11");
  const url = `${
    process.env.REACT_APP_API_URL
  }/units/${disciplineCode}/${ff.toISOString()}`;

  return await axios.get(url);
};
