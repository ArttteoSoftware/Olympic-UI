import Card from "../../components/Card/Card";
import styles from "./MainPageSportsGrid.module.css";
import { getAllMatches } from "../../services/MainPageService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/Videoplayer/VideoPlayer";
import { motion } from "framer-motion";
import { getDividerColor } from "../../enum/Divider";

function MainPageSportsGrid() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	const loadData = useCallback(async () => {
		try {
			const { data } = await getAllMatches();

			setData(data.units);
		} catch (err) {
			console.error("Error while loading Data", err);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<div className={styles.container}>
			{data.map((item) => {
				return (
					<motion.div
						key={item._id}
						// onClick={() => {
						// 	navigate(`/${item._id}`);
						// }}
					>
						<Card
							divider={getDividerColor(item._id)}
							key={item._id}
							title={item._id}
							units={item.units}
						/>
					</motion.div>
				);
			})}
			{/* <VideoPlayer /> */}
		</div>
	);
}

export default MainPageSportsGrid;
