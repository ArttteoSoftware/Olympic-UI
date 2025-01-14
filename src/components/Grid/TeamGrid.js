import { AnimatePresence, Reorder } from "framer-motion";
import styles from "./TeamGrid.module.css";
import Loading from "../../UI/Loader/Loading";
import useSocketStore from "../../store/socketStore";
import { useEffect, useState, memo } from "react";

const PlayerRow = memo(
  ({
    record,
    columns,
    rowKey,
    onRowClick,
    index,
    details,
    itemName,
    result_status,
    athlete,
    isGoal,
    sportKey,
    unit_code,
    vsTeam,
  }) => {
    const { dataState } = useSocketStore();
    const currentGameData = dataState[`${sportKey}`]?.[`${unit_code}`];

    return (
      <Reorder.Item
        as="tr"
        value={record}
        id={record.athlete?.code}
        className={details ? styles.tr_details : styles.tr}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        drag={false}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          if (!vsTeam && details) {
            onRowClick(record, itemName, unit_code, result_status);
          }
        }}
      >
        {Array.isArray(columns) &&
          columns?.map((column, index) => (
            <td
              key={index}
              style={{
                width: `${column.width}px`,
                minWidth: `${column.minWidth}px`,
                maxWidth: `${column.maxWidth}px`,
                textAlign: column.textAlign,
              }}
              className={details ? styles.td_details : styles.td}
            >
              {column.render
                ? column.render(
                    record,
                    index,
                    result_status,
                    Boolean(itemName === currentGameData?.item_name),
                    isGoal,
                    sportKey,
                    unit_code
                  )
                : record[column.key]}
            </td>
          ))}
      </Reorder.Item>
    );
  }
);

function Grid({
  columns,
  data,
  rowKey,
  onRowClick,
  details,
  item_name,
  unit_code,
  loading,
  result_status,
  sportKey,
  vsTeam,
}) {
  const { dataState, unitCode } = useSocketStore();
  const [animatedData, setAnimatedData] = useState([]);
  const [status, setStatus] = useState();
  const [loader, setLoader] = useState(true);
  const [isGoal, setIsGoal] = useState(false);

  useEffect(() => {
    setLoader(true);

    const currentGameData = dataState[`${sportKey}`]?.[`${unit_code}`];
    if (unit_code === unitCode || item_name === currentGameData?.item_name) {
      setAnimatedData(currentGameData.current);
      setStatus(currentGameData.result_status);

      const firstInt = currentGameData?.current[0].intermediates;
      const secondInt = currentGameData?.current[1].intermediates;
      if (
        (firstInt && firstInt[firstInt.length - 1]?.action === "Goal") ||
        (secondInt && secondInt[secondInt.length - 1]?.action === "Goal")
      ) {
        setIsGoal(true);
      } else {
        setIsGoal(false);
      }
      setLoader(false);
    } else {
      setStatus(result_status);

      setIsGoal(false);

      setAnimatedData(data);
      setLoader(false);
    }
  }, [
    dataState,
    data,
    unitCode,
    result_status,
    unit_code,
    details,
    item_name,
    sportKey,
  ]);
  const result =
    animatedData[0]?.intermediates?.length > 0 &&
    animatedData[0]?.intermediates[animatedData[0]?.intermediates?.length - 1];

  // const goalBackground =
  // 	animatedData[0]?.intermediates?.length > 0 &&
  // 	animatedData[0]?.intermediates[animatedData[0]?.intermediates?.length - 1];

  return (
    <>
      {data.length > 0 && (
        <div className={details ? styles.container_details : styles.container}>
          {loading || loader ? (
            <div className={styles.loaderContainer}>
              <Loading />
            </div>
          ) : (
            <div
              className={styles.teamTableContainer}
              onClick={() => {
                if (vsTeam && details) {
                  onRowClick(data, item_name, unit_code, result_status);
                }
              }}
            >
              {sportKey === "IHO" && animatedData?.length > 1 && (
                <div className={styles.periodTimeContainer}>
                  <div className={styles.periodTimeInnerContainer}>
                    <div>{result?.period} </div>
                  </div>
                </div>
              )}
              <table
                className={`${details ? styles.table_details : styles.table} ${
                  isGoal ? styles.goalContainer : ""
                }`}
              >
                <Reorder.Group
                  as="tbody"
                  axis="y"
                  values={animatedData || []}
                  onReorder={setAnimatedData}
                  drag={false}
                >
                  <AnimatePresence>
                    {Array.isArray(animatedData) &&
                      animatedData?.map((record, index) => {
                        const currentGameData =
                          dataState[`${sportKey}`]?.[`${unit_code}`];

                        return (
                          <PlayerRow
                            key={record.athlete?.code || index}
                            record={record}
                            columns={columns}
                            rowKey={rowKey}
                            animatedData={animatedData}
                            index={index}
                            details={details}
                            itemName={item_name}
                            result_status={status}
                            sportKey={sportKey}
                            unit_code={unit_code}
                            vsTeam={vsTeam}
                            onRowClick={onRowClick}
                            isGoal={Boolean(
                              currentGameData?.current?.length > 0 &&
                                record?.athlete?.code ===
                                  currentGameData?.current[index]?.athlete
                                    ?.code &&
                                currentGameData?.current[index]?.intermediates[
                                  currentGameData?.current[index]?.intermediates
                                    ?.length - 1
                                ]?.intermediates?.action === "Goal"
                            )}
                          />
                        );
                      })}
                  </AnimatePresence>
                </Reorder.Group>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Grid;
