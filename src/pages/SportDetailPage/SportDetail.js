import { useEffect, useState, useCallback } from "react";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { getSportDataBySportKey } from "../../services/SportsDetailService";
import styles from "./SportDetail.module.css";
import useSocketStore from "../../store/socketStore";

function SportDetail({ columns, title, filter, color, sportKey }) {
	const [selectedFilter, setSelectedFilter] = useState(filter[0]);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await getSportDataBySportKey(
				sportKey,
				selectedFilter.value
			);

			if (data.units.length > 0) {
				setData(data.units[0].units[0]);
			} else {
				setData([]);
			}
		} catch (err) {
			console.error("Error while loading Data", err);
		} finally {
			setLoading(false);
		}
	}, [selectedFilter]);

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
				filterValue={selectedFilter}
				setFilterValue={setSelectedFilter}
			/>
		</div>
	);
}

export default SportDetail;
