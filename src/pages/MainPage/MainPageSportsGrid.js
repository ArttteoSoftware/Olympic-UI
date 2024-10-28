import Card from "../../components/Card/Card";
import styles from "./MainPageSportsGrid.module.css";
import { getAllMatches } from "../../services/MainPageService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
			{data.map((item) => (
				<>
					<div
						onClick={() => {
							navigate(`/${item._id}`);
						}}
					>
						<Card key={item._id} title={item._id} units={item.units} />
					</div>
				</>
			))}
		</div>
	);
}

export default MainPageSportsGrid;
