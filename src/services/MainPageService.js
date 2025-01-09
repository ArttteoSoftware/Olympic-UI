import axios from 'axios'

export const getAllMatches = async () => {
  const currentDate = new Date()
  const date = new Date(Date.UTC(2022, 1, currentDate.getUTCDate(), 12, 10, 0))
  const formattedDate = date.toISOString()

  

  console.log(formattedDate)
  const url = `${process.env.REACT_APP_API_URL}/next?date=${formattedDate}`

  return await axios.get(url)
}
