import React, { useCallback, useEffect, useState } from "react";
import styles from "./TeamInfoModal.module.css";
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
import { getFlag } from "../../UI/flags";
import FormatData from "../../util/FormatData";
import HistoryGrid from "../Grid/HistoryGrid";
import useSocketStore from "../../store/socketStore";
import { convertSportTitle } from "../../enum/Sport";
import { returnSportColumn } from "../../UI/columns/Columns";
import Grid from "../Grid/Grid";
import { style } from "framer-motion/client";

export default function TeamInfoModal({
  visible,
  onClose,
  modalRef,
  record,
  result_status,
  sportKey,
  item_name,
  discipline_code,
}) {
  console.log(record);

  const [medals, setMedals] = useState([]);
  const [results, setResults] = useState([]);
  const { dataState } = useSocketStore();
  const currentGameData = dataState[sportKey]?.[item_name];
  console.log(record);

  // const loadData = useCallback(async () => {
  // 	try {
  // 		const { data } = await getMedalsByPlayerId(record.athlete.code);
  // 		setMedals(data.medals);
  // 	} catch (err) {
  // 		console.error("Error while loading Data", err);
  // 	}
  // }, [record.athlete.code]);

  // const loadResults = useCallback(async () => {
  // 	try {
  // 		const { data } = await getResultsByPlayerId(record.athlete.code);
  // 		setResults(data);
  // 	} catch (err) {
  // 		console.error("Error while loading player's result", err);
  // 	}
  // }, [record.athlete.code]);

  // useEffect(() => {
  // 	loadData();
  // }, [loadData]);

  // useEffect(() => {
  // 	loadResults();
  // }, [loadResults]);

  console.log("****", record);

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
                      breadcrumbName: `Olympic Games: ${item_name || ""}`,
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
                <div className={styles.teamNamesContainer}>
                  {Object.keys(record).map(
                    (key, i) => (
                      console.log(
                        "********************************",
                        record[key]
                      ),
                      (
                        <>
                          <div key={i}>
                            <div>{record[key]?.athlete?.name} </div>
                            <img
                              className={styles.flag}
                              src={getFlag(record[key]?.athlete?.organisation)}
                              alt="flag"
                              onError={(e) => (e.target.src = "flags/ESP.svg")}
                            />

                            {/* Refactoring from Backend. Some sports have record[key].result and some do not. */}
                            <div className={styles.score}>
                              {record[key]?.result !== undefined &&
                              record[key]?.result !== null
                                ? record[key]?.result
                                : record[key]?.intermediates?.result}
                            </div>
                          </div>
                          {i < Object.keys(record).length - 1 && (
                            <div
                              className={`${styles.score} ${
                                result_status === "LIVE" ? styles.live : ""
                              }`}
                            >
                              -
                            </div>
                          )}
                        </>
                      )
                    )
                  )}
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
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.gridContainer}>
                {record &&
                  Object.keys(record).map((key, i) => (
                    <div className={styles.lineUpPlayerContainer} key={i}>
                      {record[key]?.athletes?.map((athlete, index) => (
                        <div
                          className={`${styles.lineUpPlayer} ${
                            index % 2 === 1 ? styles.grayLineUpPlayer : ""
                          }`}
                          key={index}
                        >
                          {athlete.name}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            {/* <div className={styles.modalFooter}>
							<div className={styles.gridContainer}>
								{currentGameData && (
									<>
										<span className={styles.modalFooterTitle}>Results</span>

										<div className={styles.tableContainer}>
											<HistoryGrid
												columns={returnSportColumn(sportKey, record.item_name)}
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
						</div> */}
          </div>
        </div>
      )}
    </div>
  );
}
