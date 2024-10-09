import { useEffect, useState } from "react";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { getAthletesBySports } from "../../services/SportsDetailService";
import styles from "./SportDetail.module.css";

function SportDetail({ columns, title, filter, color, sportKey }) {
	const [data, setData] = useState();
	const [filterValue, setFilterValue] = useState(filter[0]);
	const [loading, setLoading] = useState(false);

	const loadData = async () => {
		setLoading(true);
		try {
			const { data } = await getAthletesBySports({
				sport: sportKey,
				gender: filterValue.value,
			});

			setData(data);
			setLoading(false);
		} catch (err) {
			console.log("Error while loading Data", err);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, [filterValue]);

	return (
		<div className={styles.container}>
			<DetailsCard
				loading={loading}
				data={data}
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
