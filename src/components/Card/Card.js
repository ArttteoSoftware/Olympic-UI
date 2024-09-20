import { useState } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./Card.module.css";

function Card() {
	const [gender, setGender] = useState({ label: "Girls", value: 0 });
	const [isOpen, setIsOpen] = useState(false);

	const genderValues = [
		{ label: "Girls", value: 0 },
		{ label: "Boys", value: 1 },
	];
	return (
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
			</div>
		</div>
	);
}

export default Card;
