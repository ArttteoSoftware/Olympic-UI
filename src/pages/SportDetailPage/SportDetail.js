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
		setLoading(true);
		try {
			const data = await getAthletesBySports();

			setData(data.data.units[1].units[0]);
		} catch (err) {
			console.error("Error while loading Data", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

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
