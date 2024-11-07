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
	onClose,
	modalRef,
	record,
}) {
	const [data, setData] = useState([]);
	const [results, setResults] = useState([]);

	const loadData = useCallback(async () => {
		try {
			const { data } = await getMedalsByPlayerId(record.athlete.code);

			setData(data);
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
		loadData();
	}, [loadData]);

	useEffect(() => {
		loadResults();
	}, [loadResults]);

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
										{`${data.given_name} ${data.family_name}`}

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
								{data?.medals?.map((competition, index) => {
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

						{results && (
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
