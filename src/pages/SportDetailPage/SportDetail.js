import { useEffect, useState } from "react";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { getAthletesBySports } from "../../services/SportsDetailService";
import styles from "./SportDetail.module.css";

function SportDetail({ columns, title, filter, color }) {
	// const alpineSkiingBoys = [
	// 	{
	// 		country: "FIN",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Finland.png" />,
	// 		name: "E. Saravuo",
	// 		time: "1:29.55",
	// 		rankChangeAmount: 0,
	// 	},
	// 	{
	// 		country: "NOR",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Norway.png" />,
	// 		name: "J. Braathen Herland",
	// 		time: "1:29.57",
	// 		rankChangeAmount: 0,
	// 	},
	// 	{
	// 		country: "FIN",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Finland.png" />,
	// 		name: "J. Kempainen",
	// 		time: "1:30.12",
	// 		rankChangeAmount: 0,
	// 	},
	// 	{
	// 		country: "ITA",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Italy.png" />,
	// 		name: "E. Mondinelli",
	// 		time: "1:30.12",
	// 		rankChangeAmount: 0,
	// 	},
	// 	{
	// 		country: "AUT",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Austria.png" />,
	// 		name: "V. Olivier",
	// 		time: "1:30.30",
	// 		rankChangeAmount: 0,
	// 	},
	// 	{
	// 		country: "SVK",
	// 		flag: (
	// 			<img className="flag" alt="country-flag" src="flags/Slovakia.png" />
	// 		),
	// 		name: "L. Kaparkalejs",
	// 		time: "1:30.40",
	// 		rankChangeAmount: 0,
	// 	},
	// 	{
	// 		country: "POL",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Poland.png" />,
	// 		name: "V. Badacz",
	// 		time: "1:30.44",
	// 		rankChangeAmount: 0,
	// 	},
	// ];

	const [data, setData] = useState();
	const [filterValue, setFilterValue] = useState(filter[0]);
	const [loading, setLoading] = useState(false);

	const loadData = async () => {
		setLoading(true);
		try {
			const { data } = await getAthletesBySports({
				sport: "BTH-------------------------------",
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
