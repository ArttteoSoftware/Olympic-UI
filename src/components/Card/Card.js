import { useState } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./Card.module.css";
import Grid from "../Grid/Grid";
import Modal from "../Modal/Modal";

function Card() {
	const [gender, setGender] = useState({ label: "Girls", value: 0 });
	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});

	const genderValues = [
		{ label: "Girls", value: 0 },
		{ label: "Boys", value: 1 },
	];

	const playerColumns = [
		{
			key: "_id",
			title: "#",
			width: 100,
			textAlign: "center",
			render: (record) => {
				return (
					<div className={styles.rankingContainer}>
						<div className={styles.ranking}>
							<div className={styles.index}>{1}.</div>
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
			render: (record) => {
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

	const handleRowClick = (record) => {
		setPlayerInfo(record); // set the clicked player's info
		setOpenInfo(true); // open modal
	};
	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.cardTitle}>BIATHLON (Individual)</div>

				<div className={styles.divider}>
					<Divider />
				</div>
				<div className={styles.container}>
					<div className={styles.filterContainer}>
						<div className={styles.filterInnerContainer}>
							<div className={styles.filterTitle}>
								<div>Distance: 4x6 KM</div>
								<div className={styles.dateAndTime}>
									<div className={styles.date}>08.02.2024</div>
									<div className={styles.time}>
										<div>•</div>
										<div>12:30 </div>
									</div>
								</div>
							</div>
						</div>

						<Select
							value={gender}
							onSelect={setGender}
							onClose={() => setIsOpen(false)}
							onClick={() => setIsOpen(!isOpen)}
							state={isOpen}
							options={genderValues}
							defaultValue={{ label: "Girls", value: 0 }}
						/>
					</div>

					<div className={styles.cardSubtitleContainer}>
						<div className={styles.cardSubtitleInnerContainer}>
							<div className={styles.dashedLine}></div>
							<div className={styles.subtitle}>GIRLS</div>
							<div className={styles.dashedLine}></div>
						</div>
					</div>
					<div className={styles.dataContainer}>
						<Grid
							columns={playerColumns}
							data={alpineSkiingBoys}
							openInfo={openInfo}
							rowKey={"name"}
							onRowClick={handleRowClick}
						/>
					</div>
				</div>
			</div>
			{openInfo && (
				<Modal
					visible={openInfo}
					title={playerInfo.name}
					onClose={() => setOpenInfo(false)}
				/>
			)}
		</>
	);
}

export default Card;
