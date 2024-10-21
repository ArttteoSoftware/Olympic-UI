import { useEffect, useState, useCallback } from "react";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { getAthletesBySports } from "../../services/SportsDetailService";
import styles from "./SportDetail.module.css";
import useSocketStore from "../../store/socketStore";

function SportDetail({ columns, title, filter, color, sportKey }) {
	const [filterValue, setFilterValue] = useState(filter[0]);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const loadData = useCallback(async () => {
		console.log("loadData function called");
		setLoading(true);
		try {
			console.log("Attempting to fetch athletes data");
			const data = await getAthletesBySports();
			console.log("Received data:", data);

			setData(data);
		} catch (err) {
			console.error("Error while loading Data", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		console.log("useEffect running");
		loadData();
	}, [loadData]);

	console.log("Rendering SportDetail component");
	return (
		<div className={styles.container}>
			<DetailsCard
				loading={loading}
				initialData={data}
				columns={columns}
				title={title}
				filter={filter}
				color={color}
				filterValue={filterValue}
				setFilterValue={setFilterValue}
			/>
		</div>
	);
}

export default SportDetail;
