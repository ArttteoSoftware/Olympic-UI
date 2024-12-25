import React, { useState, useRef, useEffect } from "react";
import { Divider, RedDivider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./DetailsCard.module.css";
import Grid from "../Grid/Grid";
import PlayerInfoModal from "../PlayerInfoModal/PlayerInfoModal";
import useSocketStore from "../../store/socketStore";
import { convertSportTitle } from "../../enum/Sport";
import { returnSportColumn } from "../../UI/columns/Columns";
import { returnSportTeamColumn } from "../../UI/columns/TeamColumns";
import TeamGrid from "../Grid/TeamGrid";
import TeamInfoModal from "../PlayerInfoModal/TeamInfoModal";

const DetailsCard = ({
  columns,
  initialData,
  unitNames,
  setFilterValue,
  sportKey,
  loading,
  color,
  isTeam,
}) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({});
  const [gridData, setGridData] = useState([]);
  const { dataState, unitCode } = useSocketStore();
  const [youtube, setYoutube] = useState(false);

  useEffect(() => {
    if (dataState) {
      initialData.forEach((element) => {
        const currentGameData =
          dataState[element.unitCode]?.[element.item_name];
        if (currentGameData) {
          initialData.start_list = currentGameData.current;
          initialData.result_status = currentGameData.result_status;
        }
        setGridData(initialData);
      });
    } else {
      setGridData(initialData);
    }
  }, [dataState, initialData, unitCode]);

  const handleRowClick = (record, unitName, unit_code, result_status) => {
    setPlayerInfo({
      ...record,
      item_name: unitName,
      unit_code: unit_code,
      result_status: result_status,
    });
    setOpenInfo(true);
  };

  const handleFilterSelect = (filter) => {
    setFilterValue(filter);
  };

  const handleModal = () => {
    setYoutube(!youtube);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.cardHeaderContainer}>
          <div className={styles.liveIndicatorContainer}></div>
          <CardHeader title={convertSportTitle(sportKey)} />
          <div className={styles.liveIndicatorContainer}>
            {initialData.result_status === "LIVE" && (
              <div
                onClick={() => setYoutube(true)}
                className={styles.liveIndicator}
              >
                Live
                <span
                  className={`${styles.liveIcon} ${styles.pulseDot}`}
                ></span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.divider}>
          <RedDivider />
        </div>
        <div className={styles.container}>
          <FilterSection
            initialData={initialData}
            color={color}
            unitNames={unitNames}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onFilterSelect={handleFilterSelect}
          />
          <GridSection
            gridData={gridData}
            columns={
              isTeam
                ? returnSportTeamColumn(sportKey)
                : returnSportColumn(sportKey)
            }
            handleRowClick={handleRowClick}
            loading={loading}
            sportKey={sportKey}
          />
        </div>
      </div>

      <PlayerInfo
        ref={modalRef}
        sportKey={sportKey}
        result_status={playerInfo?.result_status}
        isTeam={Boolean(
          (playerInfo?.unit_code && playerInfo?.unit_code?.includes("TE")) ||
            playerInfo?.unit_code?.includes("RELAY")
        )}
        playerInfo={playerInfo}
        columns={columns}
        openInfo={openInfo}
        onClose={() => setOpenInfo(false)}
      />
      {youtube && (
        <div className={styles.overlay} onClick={handleModal}>
          <iframe
            className={styles.youtubeIframe}
            src="https://eoctv.org/9189d432-8ce2-4853-bb9d-3e78918b9fe0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

const CardHeader = ({ title }) => (
  <div className={styles.cardTitle}>{title}</div>
);

const FilterSection = ({ unitNames, isOpen, setIsOpen, onFilterSelect }) => (
  <div className={styles.filterContainer}>
    <Select
      onSelect={onFilterSelect}
      onClose={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      state={isOpen}
      options={unitNames}
      defaultValue={{ item_name: "All Group", unit_code: "" }}
    />
  </div>
);

const GridSection = ({
  gridData,
  columns,
  handleRowClick,
  loading,
  sportKey,
}) => (
  <>
    {gridData.map((item) => (
      <div key={item.item_name}>
        <GridHeader itemName={item.item_name} />
        <div className={styles.dataContainer}>
          {item.unit_code.includes("TE") || item.unit_code.includes("RELAY") ? (
            <TeamGrid
              result_status={item?.result_status || ""}
              details={true}
              columns={returnSportTeamColumn(sportKey)}
              data={item.start_list}
              className={styles.cardGrid}
              onRowClick={handleRowClick}
              isTeam={true}
              unit_code={item.unit_code}
              sportKey={sportKey}
              item_name={item.item_name}
              vsTeam={Boolean(
                (item.start_list[0]?.intermediates?.result !== undefined &&
                  item.start_list[0]?.intermediates?.result !== null) ||
                  (item.start_list[0]?.result !== undefined &&
                    item.start_list[0]?.result !== null) ||
                  false
              )}
            />
          ) : (
            <Grid
              result_status={item.result_status}
              details={true}
              columns={columns}
              data={item}
              rowKey={(record) => record._id}
              onRowClick={handleRowClick}
              loading={loading}
              item_name={item.item_name}
              unit_code={item.unit_code}
              athlete={item.athlete}
              sportKey={sportKey}
            />
          )}
        </div>
      </div>
    ))}
  </>
);

const GridHeader = ({ itemName }) => (
  <div className={styles.cardSubtitleContainer}>
    <div className={styles.cardSubtitleInnerContainer}>
      <div className={styles.dashedLine} />
      <div className={styles.subtitle}>{itemName}</div>
      <div className={styles.dashedLine} />
    </div>
  </div>
);

const PlayerInfo = React.forwardRef(
  (
    { sportKey, playerInfo, openInfo, onClose, result_status, columns, isTeam },
    ref
  ) => {
    const getValueByKey = (obj, key) => {
      return obj && obj[key] ? obj[key] : null;
    };

    const firstTeam = getValueByKey(playerInfo, 0);

    const vsTeam =
      Boolean(
        (firstTeam?.intermediates?.result !== undefined &&
          firstTeam?.intermediates?.result !== null) ||
          (firstTeam?.intermediates[0]?.result !== undefined &&
            firstTeam?.intermediates[0]?.result !== null)
      ) ||
      (firstTeam?.result !== undefined && firstTeam?.result !== null) ||
      false;

    return (
      <>
        {isTeam
          ? openInfo && (
              <TeamInfoModal
                record={
                  vsTeam ? { 0: playerInfo[0], 1: playerInfo[1] } : playerInfo
                }
                result_status={result_status}
                modalRef={ref}
                visible={Boolean(openInfo)}
                sportKey={sportKey}
                item_name={playerInfo.item_name}
                onClose={onClose}
                columns={columns}
                discipline_code={sportKey}
                vsTeam={vsTeam}
              />
            )
          : openInfo && (
              <PlayerInfoModal
                record={playerInfo}
                result_status={result_status}
                modalRef={ref}
                visible={Boolean(openInfo)}
                sportKey={sportKey}
                item_name={playerInfo.item_name}
                onClose={onClose}
                columns={columns}
                discipline_code={sportKey}
              />
            )}
      </>
    );
  }
);

export default DetailsCard;
