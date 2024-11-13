import React from "react";
import styles from "./PlayerInfoModal.module.css";
import {
	CloseModalIcon,
	SilverMedal,
	GoldMedal,
	BronzeMedal,
	VerticalDivider,
} from "../../UI/Icons";
import Bread from "../Bread/Bread";
import {
	getMedalsByPlayerId,
	getResultsByPlayerId,
} from "../../services/PlayerDetailService";
import { useCallback, useEffect, useState } from "react";
import { getFlag } from "../../UI/flags";
import FormatData from "../../util/FormatData";
import { HistoryCol } from "../../UI/columns/Columns";
import HistoryGrid from "../Grid/HistoryGrid";

export default function PlayerInfoModal({
	visible,
	athlete,
	onClose,
	modalRef,
	record,
}) {
	const [medals, setMedals] = useState([]);
	const [results, setResults] = useState([]);

	const loadData = useCallback(async () => {
		console.log("Loading medals data..."); // Log before the API call

		try {
			const { data } = await getMedalsByPlayerId(record.athlete.code);
			console.log("***", data); // Log the data received

			setMedals(data.medals);
			console.log("Medals Data:", data); // Added log for medals data
		} catch (err) {
			console.error("Error while loading Data", err);
		}
	}, [record.athlete.code]);

	const loadResults = useCallback(async () => {
		try {
			const { data } = await getResultsByPlayerId(record.athlete.code);

			setResults(data);
		} catch (err) {
			console.error("Error while loading player's result", err);
		}
	}, [record.athlete.code]);

	useEffect(() => {
		console.log("(***");
		loadData();
	}, [loadData]);

	useEffect(() => {
		loadResults();
	}, [loadResults]);

	console.log(record);
	return (
		<div className={styles.modalOverlay}>
			{visible && (
				<div>
					<div className={styles.modal} ref={modalRef}>
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
										{record.athlete.fullName}
										<span className={styles.verticalDivider}>
											<VerticalDivider />
										</span>
										<span className={styles.country}>
											<div>
												<img
													className="flag"
													src={getFlag(record.athlete.organisation)}
													alt="flag"
													onError={(e) => (e.target.src = "flags/ESP.svg")}
												/>
											</div>
											<div>({record.athlete?.organisation})</div>
										</span>
									</div>
									<div className={styles.dob}>
										<span className={styles.label}>Date of birth:</span>
										{FormatData.formatDate(record.athlete.birthDate)}
									</div>
								</div>
							</div>

							<div className={styles.medalsContainer}>
								{medals?.map((competition, index) => {
									return (
										<div
											className={styles.medalContainer}
											key={competition._id ? competition._id : `medal-${index}`}
										>
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

						{results.length > 0 && (
							<div className={styles.modalFooter}>
								<span className={styles.modalFooterTitle}>Results</span>
								{results?.map((element) => {
									const resultsArr = [];
									resultsArr.push(element.result);

									console.log(element.status);
									return (
										<div className={styles.tableContainer} key={element.id}>
											<HistoryGrid
												columns={HistoryCol(element.item_name)}
												data={resultsArr}
												result_status={element.status}
											/>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
