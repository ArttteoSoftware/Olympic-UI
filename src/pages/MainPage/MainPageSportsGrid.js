import Card from "../../components/Card/Card";
import styles from "./MainPageSportsGrid.module.css";
import useSocketStore from "../../store/socketStore";
import { getAllMatches } from "../../services/MainPageService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MainPageSportsGrid() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { data: socketData } = useSocketStore();
	const [data, setData] = useState([]);
	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await getAllMatches();

			setData(data.units);
		} catch (err) {
			console.error("Error while loading Data", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	console.log("socket", socketData);
	return (
		<div className={styles.container}>
			{data.map(
				(item) => (
					console.log("item", item),
					(
						<>
							<div
								onClick={() => {
									navigate(`/${item._id}`);
								}}
							>
								<Card key={item._id} title={item._id} units={item.units} />
							</div>
						</>
					)
				)
			)}
		</div>
	);
}

export default MainPageSportsGrid;
