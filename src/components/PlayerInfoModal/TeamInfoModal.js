import React from "react";
import styles from "./TeamInfoModal.module.css";
import {
  CloseModalIcon,
  SilverMedal,
  GoldMedal,
  BronzeMedal,
} from "../../UI/Icons";
import Bread from "../Bread/Bread";
import { getFlag } from "../../UI/flags";
import { convertSportTitle } from "../../enum/Sport";
import { GoalIcon } from "../../UI/Icons";

export default function TeamInfoModal({
  visible,
  onClose,
  modalRef,
  record,
  result_status,
  sportKey,
  item_name,
  discipline_code,
  vsTeam,
}) {
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
              <div
                className={
                  Boolean(Array.isArray(record))
                    ? styles.contentContainer
                    : styles.countryContentContainer
                }
              >
                {vsTeam ? (
                  <div className={styles.teamNamesContainer}>
                    {Object.keys(record).map((key, i) => (
                      <>
                        <div key={i}>
                          <div>{record[key]?.athlete?.organisation} </div>
                          <img
                            className={styles.flag}
                            src={getFlag(record[key]?.athlete?.organisation)}
                            alt="flag"
                            onError={(e) => (e.target.src = "flags/ESP.svg")}
                          />

                          {/* Refactoring from Backend. Some sports have record[key].result and some do not. */}
                          <div className={styles.score}>
                            {/* {record[key]?.result !== undefined &&
                            record[key]?.result !== null
                              ? record[key]?.result
                              : record[key]?.intermediates?.result} */}

                            {record[key]?.intermediates[
                              record[key]?.intermediates?.length - 1
                            ].intermediates.result ?? record[key]?.result}
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
                    ))}
                  </div>
                ) : (
                  <>
                    <div>
                      <img
                        className={styles.flag}
                        src={getFlag(record.athlete?.organisation)}
                        alt="flag"
                        onError={(e) => (e.target.src = "flags/ESP.svg")}
                      />
                    </div>
                    <div className={styles.countryNameContainer}>
                      <div className={styles.fullName}>
                        {record.athlete.name}
                      </div>
                      <span className={styles.label}>
                        ({record.athlete.organisation})
                      </span>
                    </div>
                  </>
                )}
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
                          key={athlete.code}
                        >
                          {athlete.name}
                          {Array.from({ length: athlete.scoreCount }).map(
                            (_, i) => (
                              <span style={{ padding: "5px" }} key={i}>
                                <GoalIcon color="black" />
                              </span>
                            )
                          )}
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
