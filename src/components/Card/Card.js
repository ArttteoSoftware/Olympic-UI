import React, { useState, useMemo, useEffect } from "react";
import styles from "./Card.module.css";
import { LayoutGroup, motion, Reorder } from "framer-motion";
import { BTH, Divider, IHO } from "../../UI/Icons";
import { convertSportTitle } from "../../enum/Sport";
import useSocketStore from "../../store/socketStore";
import Grid from "../Grid/Grid";
import TeamGrid from "../Grid/TeamGrid";
import { returnSportColumn } from "../../UI/columns/Columns";
import MarqueeEffect from "../MarqueeEffect/MarqueeEffect";
import VideoPlayer from "../Videoplayer/VideoPlayer";
import { returnSportTeamColumn } from "../../UI/columns/TeamColumns";
import FormatData from "../../util/FormatData";
const Card = ({ className, title, units, divider, item }) => {
  const [data, setData] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const { dataState, unitCode } = useSocketStore();
  const [loading, setLoading] = useState(true);
  const [play, setPlay] = useState(false);

  const currentGameData = dataState[`${title}`]?.[`${unitCode}`];

  useEffect(() => {
    if (units && units.length > 0) {
      setData(units);
    }

    setLoading(false);
  }, [units]);

  useEffect(() => {
    if (isFlipped) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [isFlipped]);

  const commonStyles = useMemo(
    () => ({
      padding: "0px",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backfaceVisibility: "hidden",
    }),
    []
  );
  const getListData = (unit) => {
    if (unit.item_name === currentGameData?.item_name) {
      const updatedData = data.map((item) =>
        item.item_name === currentGameData?.item_name
          ? { ...item, start_list: unit.start_list }
          : item
      );

      return updatedData[0];
    } else {
      return unit.start_list;
    }
  };

  const renderUnit = (unit, loading) => {
    const listData = getListData(unit);

    const isTeam = Boolean(
      unit.unit_code.includes("TE") || unit.unit_code.includes("RELAY")
    );

    const vsTeam = Boolean(
      (unit.start_list[0]?.intermediates?.result !== undefined &&
        unit.start_list[0]?.intermediates?.result !== null) ||
        (unit.start_list[0]?.result !== undefined &&
          unit.start_list[0]?.result !== null) ||
        false
    );

    if (unit.item_name === currentGameData?.item_name) {
      return (
        <div key={`${unit.unit_code}-${unit.item_name}`}>
          <UnitHeader item={unit} loading={loading} />

          {isTeam ? (
            // თიმების თამაშები თუ ქვემოთაა, თამაში რომ დაიწყება ზემოთ არ ადის

            // <MarqueeEffect shouldAnimate={listData?.length > 7}>
            <TeamGrid
              result_status={unit.result_status}
              details={false}
              columns={returnSportTeamColumn(title)}
              data={listData}
              className={styles.cardGrid}
              isTeam={isTeam}
              vsTeam={vsTeam}
              unit_code={unit.unit_code}
              sportKey={title}
              item_name={unit.item_name}
            />
          ) : (
            // </MarqueeEffect>
            <MarqueeEffect shouldAnimate={listData?.length > 7}>
              <Grid
                result_status={unit.result_status}
                details={false}
                columns={returnSportColumn(title)}
                data={listData}
                className={styles.cardGrid}
                isTeam={isTeam}
                unit_code={unit.unit_code}
                sportKey={title}
                item_name={unit.item_name}
              />
            </MarqueeEffect>
          )}
        </div>
      );
    } else {
      return (
        <div key={`${unit.unit_code}-${unit.item_name}`}>
          <UnitHeader item={unit} loading={loading} />

          {isTeam ? (
            // <MarqueeEffect shouldAnimate={listData?.length > 7}>
            <TeamGrid
              result_status={unit.result_status}
              details={false}
              columns={returnSportTeamColumn(title)}
              data={listData}
              unit_code={unit.unit_code}
              className={styles.cardGrid}
              sportKey={title}
              item_name={unit.item_name}
            />
          ) : (
            // </MarqueeEffect>
            <MarqueeEffect shouldAnimate={listData?.length > 7}>
              <Grid
                result_status={unit.result_status}
                details={false}
                columns={returnSportColumn(title)}
                data={listData}
                className={styles.cardGrid}
                unit_code={unit.unit_code}
                item_name={unit.item_name}
                sportKey={title}
              />
            </MarqueeEffect>
          )}
        </div>
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <FrontCard
        className={className}
        commonStyles={commonStyles}
        isFlipped={isFlipped}
        title={title}
        data={data}
        setData={setData}
        renderUnit={renderUnit}
        setIsFlipped={setIsFlipped}
        divider={divider}
        loading={loading}
        play={play}
        setPlay={setPlay}
      />
      <BackCard
        commonStyles={commonStyles}
        isFlipped={isFlipped}
        title={title}
        setIsFlipped={setIsFlipped}
        play={play}
        setPlay={setPlay}
      />
    </div>
  );
};

const UnitHeader = ({ item }) => {
  if (item?.item_name) {
    return (
      <div className={styles.subtitleContainer}>
        <div className={styles.subtitleInnerContainer}>
          <div className={styles.dashedLine} />
          <div className={styles.subtitle}>
            {item.item_name}{" "}
            <span className={styles.startDateContainer}>
              {FormatData.formatUTCTime(item.start_date)}
            </span>
          </div>
          <div className={styles.dashedLine} />
        </div>
      </div>
    );
  }
};

const FrontCard = ({
  commonStyles,
  isFlipped,
  title,
  data,
  setData,
  renderUnit,
  setIsFlipped,
  divider,
  loading,
  className,
  setPlay,
  play,
}) => {
  const { srtData } = useSocketStore();

  useEffect(() => {
    if (Boolean(srtData[title])) {
      setIsFlipped(true);
      setPlay(true);
    }
  }, [srtData[title], play, isFlipped]);
  return (
    <Reorder.Group
      style={commonStyles}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.4 }}
      values={data}
      onReorder={setData}
      className={`${styles.container} ${
        className ? styles[`${className}`] : ""
      }`}
    >
      <div className={styles.title}>{convertSportTitle(title)}</div>
      <div className={styles.tableContainer}>
        {divider}

        <div className={styles.innerContainer}>
          {data?.length > 0 ? (
            (console.log("DDATA", data),
            (<>{data.map((unit) => renderUnit(unit, loading))}</>))
          ) : (
            <>
              {loading === false && (
                <div className={styles.placeholderContainer}>
                  <div className={styles.placeholderImg}>
                    <img
                      src={`assets/placeholders/${title}.png`}
                      alt="placeholder"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.placeholderText}>
                    The game is scheduled for tomorrow
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Reorder.Group>
  );
};

const BackCard = ({
  title,
  commonStyles,
  isFlipped,
  setIsFlipped,
  setPlay,
  play,
}) => {
  const { srtData } = useSocketStore();

  useEffect(() => {
    if (!Boolean(srtData[title])) {
      setIsFlipped(false);
      setPlay(false);
    }
  }, [srtData[title]]);

  return (
    <div className={styles.backCardContainer}>
      <motion.div
        style={{
          ...commonStyles,
          borderRadius: "1.25rem",
          backgroundColor: "#fff",
        }}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={{ duration: 0.4 }}
      >
        <VideoPlayer
          streamUrl={`${process.env.REACT_APP_API_URL}${srtData[title]}`}
          shouldPlay={true}
          play={play}
          setPlay={setPlay}
        />
      </motion.div>
    </div>
  );
};

export default Card;
