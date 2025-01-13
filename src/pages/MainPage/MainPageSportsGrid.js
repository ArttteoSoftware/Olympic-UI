import Card from "../../components/Card/Card";
import styles from "./MainPageSportsGrid.module.css";
import { getAllMatches } from "../../services/MainPageService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getDividerColor } from "../../enum/Divider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MainPageSportsGrid() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  // Initialize with current UTC date but 2022 year
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return new Date(
      Date.UTC(
        2022,
        1,
        today.getUTCDate(),
        today.getUTCHours(),
        today.getUTCMinutes()
      )
    );
  });

  const loadData = useCallback(async () => {
    try {
      setLoader(true);
      // Convert to UTC before sending to API
      const utcDate = new Date(
        Date.UTC(
          selectedDate.getUTCFullYear(),
          selectedDate.getUTCMonth(),
          selectedDate.getUTCDate(),
          selectedDate.getUTCHours(),
          selectedDate.getUTCMinutes()
        )
      );
      const { data } = await getAllMatches(utcDate);
      if (data) {
        setData(data.units);
      }
    } catch (err) {
      console.error("Error while loading Data", err);
    } finally {
      setLoader(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDateChange = (date) => {
    // Convert the selected date to UTC
    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
    setSelectedDate(utcDate);
  };

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <motion.div key={item._id} onClick={() => navigate(`/${item._id}`)}>
          <Card
            divider={getDividerColor(item._id)}
            key={item._id}
            title={item._id}
            units={item.units}
            item={item}
            loader={loader}
          />
        </motion.div>
      ))}
      {/* <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="yyyy MMM dd h:mm aa"
        className={styles.datePicker}
        // Use UTC timezone for DatePicker
        utcOffset={0}
      /> */}
    </div>
  );
}

export default MainPageSportsGrid;
