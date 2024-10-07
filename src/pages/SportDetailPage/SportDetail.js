import Card from "../../components/DetailsCard/DetailsCard";
import styles from "./SportDetail.module.css";

function SportDetail({ columns, title, filter, color }) {
	const alpineSkiingBoys = [
		{
			country: "FIN",
			flag: <img className="flag" alt="country-flag" src="flags/Finland.png" />,
			name: "E. Saravuo",
			time: "1:29.55",
			rankChangeAmount: 0,
		},
		{
			country: "NOR",
			flag: <img className="flag" alt="country-flag" src="flags/Norway.png" />,
			name: "J. Braathen Herland",
			time: "1:29.57",
			rankChangeAmount: 0,
		},
		{
			country: "FIN",
			flag: <img className="flag" alt="country-flag" src="flags/Finland.png" />,
			name: "J. Kempainen",
			time: "1:30.12",
			rankChangeAmount: 0,
		},
		{
			country: "ITA",
			flag: <img className="flag" alt="country-flag" src="flags/Italy.png" />,
			name: "E. Mondinelli",
			time: "1:30.12",
			rankChangeAmount: 0,
		},
		{
			country: "AUT",
			flag: <img className="flag" alt="country-flag" src="flags/Austria.png" />,
			name: "V. Olivier",
			time: "1:30.30",
			rankChangeAmount: 0,
		},
		{
			country: "SVK",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovakia.png" />
			),
			name: "L. Kaparkalejs",
			time: "1:30.40",
			rankChangeAmount: 0,
		},
		{
			country: "POL",
			flag: <img className="flag" alt="country-flag" src="flags/Poland.png" />,
			name: "V. Badacz",
			time: "1:30.44",
			rankChangeAmount: 0,
		},
	];

	return (
		<div className={styles.container}>
			<Card
				data={alpineSkiingBoys}
				columns={columns}
				title={title}
				filter={filter}
				color={color}
			/>
		</div>
	);
}

export default SportDetail;
