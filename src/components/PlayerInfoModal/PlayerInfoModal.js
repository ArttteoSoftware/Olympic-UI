import React from "react";
import styles from "./PlayerInfoModal.module.css";
import Grid from "../Grid/Grid";
import {
	CloseModalIcon,
	SilverMedal,
	GoldMedal,
	BronzeMedal,
	VerticalDivider,
} from "../../UI/Icons";
import Bread from "../Bread/Bread";
import { getMedalsByPlayerId } from "../../services/PlayerDetailService";
import { useCallback, useEffect, useState } from "react";
import { getFlag } from "../../UI/flags";
import FormatData from "../../util/FormatData";

export default function PlayerInfoModal({
	visible,
	onClose,
	ref,
	record,
	title,
}) {
	// const playerColumns = [
	// 	{
	// 		key: "_id",
	// 		title: "#",
	// 		width: 100,
	// 		textAlign: "center",
	// 		render: (record) => {
	// 			return (
	// 				<div className={styles.rankingContainer}>
	// 					<div className={styles.ranking}>
	// 						<div className={styles.index}>{1}.</div>
	// 						<div className={styles.flag}>{record.flag}</div>
	// 					</div>
	// 				</div>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		key: "description",
	// 		title: "Description",
	// 		width: 800,
	// 		textAlign: "start",
	// 		render: (record) => {
	// 			return (
	// 				<>
	// 					<div className={styles.nameContainer}>
	// 						<div className={styles.country}>({record.country})</div>
	// 						<div className={styles.name}>{record.name}</div>
	// 					</div>
	// 				</>
	// 			);
	// 		},
	// 	},

	// 	{
	// 		key: "shooting",
	// 		title: "Shooting",
	// 		textAlign: "center",

	// 		render: (record) => {
	// 			return <>-</>;
	// 		},
	// 	},
	// 	{
	// 		key: "time",
	// 		title: "Time",
	// 		textAlign: "center",

	// 		render: (record) => {
	// 			return <>-</>;
	// 		},
	// 	},
	// 	{
	// 		key: "difference",
	// 		title: "Diff.",
	// 		textAlign: "center",

	// 		render: (record) => {
	// 			return <>-</>;
	// 		},
	// 	},
	// ];

	// const alpineSkiingBoys = [
	// 	{
	// 		country: "FIN",
	// 		flag: <img className="flag" alt="country-flag" src="flags/Finland.png" />,
	// 		name: "E. Saravuo",
	// 		time: "1:29.55",
	// 		rankChangeAmount: 0,
	// 	},
	// ];

	const [data, setData] = useState([]);

	const loadData = useCallback(async () => {
		try {
			const { data } = await getMedalsByPlayerId("1000188");
			setData(data);
		} catch (err) {
			console.error("Error while loading Data", err);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);
	return (
		<div className={styles.modalOverlay}>
			{visible && (
				<div>
					<div className={styles.modal} ref={ref}>
						<div className={styles.modalHeader}>
							<div className={styles.modalBreadcrumbs}>
								<Bread
									routes={[
										{
											breadcrumbName: "Biathlon",
										},
										{
											breadcrumbName: `Olympic Games: ${
												record.item_name || ""
											}`,
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
										{`${data.given_name} ${data.family_name}`}

										<span className={styles.verticalDivider}>
											<VerticalDivider />
										</span>
										<span className={styles.country}>
											<div>{getFlag(data.organisation)}</div>
											<div>({data.organisation})</div>
										</span>
									</div>
									<div className={styles.dob}>
										<span className={styles.label}>Date of birth:</span>{" "}
										{FormatData.formatDate(data.birth_date)}
									</div>
								</div>
							</div>

							<div className={styles.medalsContainer}>
								{data?.medals?.map((competition) => {
									return (
										<div className={styles.medalContainer}>
											<div className={styles.competitionContainer}>
												{competition.unit.item_name}
												{competition.medal_code === "GOLD" && <GoldMedal />}
												{competition.medal_code === "SILVER" && <SilverMedal />}
												{competition.medal_code === "BRONZE" && <BronzeMedal />}
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className={styles.modalFooter}>
							<span className={styles.modalFooterTitle}>Results</span>
							<div className={styles.tableContainer}>
								<Grid columns={[]} data={[]} isModal={true} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
