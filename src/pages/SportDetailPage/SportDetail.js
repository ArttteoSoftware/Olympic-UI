import { useEffect, useState, useCallback } from "react";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { getSportDataBySportKey } from "../../services/SportsDetailService";
import styles from "./SportDetail.module.css";
import { u } from "framer-motion/client";

function SportDetail({ columns, title, filter, color, sportKey }) {
	const [selectedFilter, setSelectedFilter] = useState();
	const [unitNames, setUnitNames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			console.log("selected", selectedFilter);
			const { data } = await getSportDataBySportKey(sportKey);

			setUnitNames(data.units[0].unit_names);
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
	}, [selectedFilter, sportKey]);

	console.log("unitNames", unitNames);

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
