import React from "react";
import styles from "./Modal.module.css";
import Grid from "../Grid/Grid";
import { CloseModalIcon } from "../../UI/Icons";
import Bread from "../Bread/Bread";

export default function Modal({ visible, onClose }) {
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
			key: "description",
			title: "Description",
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
	];

	return (
		<div className={styles.modalOverlay}>
			{visible && (
				<div>
					<div className={styles.modal}>
						<div className={styles.modalHeader}>
							<div className={styles.modalBreadcrumbs}>
								<Bread
									routes={[
										{
											breadcrumbName: "Biathlon",
										},
										{
											breadcrumbName: "Olympic Games: Inidividual - Men",
										},
									]}
								/>
							</div>
							<button className={styles.closeButton} onClick={onClose}>
								<CloseModalIcon />
							</button>
						</div>
						<div className={styles.modalBody}>
							<div className={styles.contentContainer}>
								<div>
									<img
										src="image.png"
										alt="profile"
										width={54}
										height={54}
										className={styles.avatar}
									/>
								</div>
								<div>
									<div className={styles.fullName}>
										Fillon Maillet Quentin{" "}
										<span className={styles.country}>(FRA)</span>
									</div>
									<div className={styles.dob}>
										<span className={styles.label}>Date of birth:</span>{" "}
										16.08.1992
									</div>
								</div>
							</div>
						</div>
						<div className={styles.modalFooter}>
							<span className={styles.modalFooterTitle}>Results</span>
							<div className={styles.tableContainer}>
								<Grid columns={playerColumns} data={alpineSkiingBoys} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
