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
import HistoryGrid from "../Grid/HistoryGrid";
import { returnSportColumn } from "../../UI/columns/Columns";
import useSocketStore from "../../store/socketStore";
import { convertSportTitle } from "../../enum/Sport";

export default function PlayerInfoModal({
	visible,
	onClose,
	modalRef,
	record,
	result_status,
	sportKey,
	item_name,
	discipline_code,
}) {
	const [medals, setMedals] = useState([]);
	const [results, setResults] = useState([]);
	const { dataState } = useSocketStore();

	console.log(record);
	const loadData = useCallback(async () => {
		try {
			const { data } = await getMedalsByPlayerId(record.athlete.code);

			setMedals(data.medals);
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

	console.log("****", result_status);
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
											breadcrumbName: convertSportTitle(discipline_code),
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
													src={getFlag(record.athlete?.organisation)}
													alt="flag"
													onError={(e) => (e.target.src = "flags/ESP.svg")}
												/>
											</div>
											<div>({record.athlete?.organisation})</div>
										</span>
									</div>
									<div className={styles.dob}>
										<span className={styles.label}>Date of birth:</span>
										{FormatData.formatDate(record.athlete?.birthDate)}
									</div>
								</div>
							</div>

							{/* {medals?.map((competition, index) => {
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
								})} */}

							{(record.rank === 1 || record.rank === 2 || record.rank === 3) &&
								result_status === "OFFICIAL" && (
									<div className={styles.medalContainer}>
										<div className={styles.competitionContainer}>
											{record.rank === 1 && <GoldMedal />}
											{record.rank === 2 && <SilverMedal />}
											{record.rank === 3 && <BronzeMedal />}
										</div>
									</div>
								)}

							<div className={styles.modalFooter}>
								<div className={styles.gridContainer}>
									{dataState?.item_name === item_name &&
										result_status !== "UNCONFIRMED" &&
										result_status !== "UNOFFICIAL" &&
										result_status !== "OFFICIAL" && (
											<>
												<span className={styles.modalFooterTitle}>Results</span>

												<div className={styles.tableContainer}>
													<HistoryGrid
														columns={returnSportColumn(
															sportKey,
															record.item_name
														)}
														athlete={record.athlete}
														data={[record]}
													/>
												</div>
											</>
										)}

									{results.length > 0 &&
										results?.map((element) => {
											const resultsArr = [];
											resultsArr.push(element.result);

											return (
												<div className={styles.tableContainer} key={element.id}>
													<HistoryGrid
														columns={returnSportColumn(
															sportKey,
															element.item_name
														)}
														data={resultsArr}
														athlete={record.athlete}
														result_status={element.status}
													/>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
