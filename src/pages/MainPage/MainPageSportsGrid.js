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

			const newStartList = data.units.reduce((acc, unit) => {
				unit.units.forEach((subUnit) => {
					if (subUnit && subUnit.item_name) {
						const key = subUnit.unit_code.substring(0, 3); // Get the first 3 letters of unit_code

						acc[key] = { [subUnit.item_name]: subUnit.start_list };
					}
				});

				return acc;
			}, {});

			setStartList(newStartList); // Merge with existing startList
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
