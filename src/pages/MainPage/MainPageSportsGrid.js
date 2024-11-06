import Card from "../../components/Card/Card";
import styles from "./MainPageSportsGrid.module.css";
import { getAllMatches } from "../../services/MainPageService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MainPageSportsGrid() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [startList, setStartList] = useState([{}]);

	const loadData = useCallback(async () => {
		try {
			const { data } = await getAllMatches();

			console.log("****DATA", data.units);
			for (let i = 0; i < data.units.length; i++) {
				// setStartList((prev) => [...prev, data.units[i]]);
				for (let j = 0; j < data.units[i].units.length; j++) {
					console.log("JJ", data.units[i].units[j]);
					setStartList((prev) => ({
						...prev,
						[data.units[i].units[j].item_name]:
							data.units[i].units[j].start_list,
					}));
				}
			}
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
					<div
						key={item._id}
						onClick={() => {
							navigate(`/${item._id}`);
						}}
					>
						<Card
							key={item._id}
							title={item._id}
							units={item.units}
							startList={startList}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default MainPageSportsGrid;
