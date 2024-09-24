import Card from "../../components/Card/Card";
import styles from "./SportDetail.module.css";

function SportDetail() {
	const playerColumns = [
		{
			key: "_id",
			title: "#",
			width: 100,
			textAlign: "center",
			render: (record, index) => {
				return (
					<div className={styles.rankingContainer}>
						<div className={styles.ranking}>
							<div className={styles.index}>{index + 1}.</div>
							<div className={styles.flag}>{record.flag}</div>
						</div>
					</div>
				);
			},
		},
		{
			key: "name",
			title: "Name",
			width: 800,
			textAlign: "start",
			render: (record, index) => {
				return (
					<>
						<div className={styles.nameContainer}>
							<div className={styles.country}>({record.country})</div>
							<div className={styles.name}>{record.name}</div>
						</div>
					</>
				);
			},
		},
		{
			key: "shooting",
			title: "Shooting",
			textAlign: "center",

			render: (record) => {
				return <>-</>;
			},
		},
		{
			key: "time",
			title: "Time",
			textAlign: "center",

			render: (record) => {
				return <>-</>;
			},
		},
		{
			key: "difference",
			title: "Diff.",
			textAlign: "center",

			render: (record) => {
				return <>-</>;
			},
		},
	];

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
			<Card data={alpineSkiingBoys} columns={playerColumns} />
		</div>
	);
}

export default SportDetail;
