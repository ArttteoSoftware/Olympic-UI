import { useState } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./Card.module.css";
import Grid from "../Grid/Grid";
import Modal from "../Modal/Modal";

function Card({ columns, data }) {
	const [gender, setGender] = useState({ label: "Girls", value: 0 });
	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});

	const genderValues = [
		{ label: "Girls", value: 0 },
		{ label: "Boys", value: 1 },
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
							columns={columns}
							data={data}
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
