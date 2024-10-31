import { useEffect, useState, useCallback } from "react";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { getSportDataBySportKey } from "../../services/SportsDetailService";
import styles from "./SportDetail.module.css";

function SportDetail({ columns, title, filter, color, sportKey }) {
	const [selectedFilter, setSelectedFilter] = useState({
		item_name: "",
		unit_code: "",
	});
	const [unitNames, setUnitNames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await getSportDataBySportKey(sportKey, selectedFilter);

			if (unitNames.length > 0) {
			} else {
				setUnitNames(data.units[0].unit_names);
			}
			if (data.units.length > 0) {
				setData(data.units[0].units);
			} else {
				setData([]);
			}
		} catch (err) {
			console.error("Error while loading Data", err);
		} finally {
			setLoading(false);
		}
	}, [selectedFilter, sportKey, unitNames.length]);

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
				unitNames={unitNames}
				color={color}
				filterValue={selectedFilter}
				setFilterValue={setSelectedFilter}
			/>
		</div>
	);
}

export default SportDetail;
