import { animate, AnimatePresence, Reorder } from "framer-motion";
import styles from "./Grid.module.css";
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
    sportKey,
    unit_code,
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
          if (details) {
            onRowClick(record, itemName, unit_code, result_status);
          }
        }}
      >
        {Array.isArray(columns) &&
          columns?.map((column) => (
            <td
              key={`${record[rowKey]}-${column.key}`}
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
                    athlete,
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
}) {
  const { dataState, unitCode } = useSocketStore();
  const [animatedData, setAnimatedData] = useState([]);
  const [status, setStatus] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    const currentGameData = dataState[`${sportKey}`]?.[`${unit_code}`];
    if (unit_code === unitCode || item_name === currentGameData?.item_name) {
      setAnimatedData(currentGameData?.current);
      setStatus(currentGameData?.result_status);
      setLoader(false);
    } else {
      setStatus(result_status);
      if (details) {
        setAnimatedData(data.start_list);
      } else {
        setAnimatedData(data);
      }
      setLoader(false);
    }
  }, [dataState, data, unitCode, result_status, unit_code, details, item_name]);

  console.log("***", sportKey, data);

  return (
    <>
      {data.length > 0 && (
        <div className={details ? styles.container_details : styles.container}>
          {loading || loader ? (
            <div className={styles.loaderContainer}>
              <Loading />
            </div>
          ) : (
            <table className={details ? styles.table_details : styles.table}>
              <thead className={details ? styles.thead_details : styles.thead}>
                <tr>
                  {Array.isArray(columns) &&
                    columns?.map((column) => (
                      <th
                        key={column.key}
                        style={{
                          width: `${column.width}px`,
                          minWidth: `${column.minWidth}px`,
                          maxWidth: `${column.maxWidth}px`,
                          textAlign: column.textAlign,
                        }}
                      >
                        {column.title}
                      </th>
                    ))}
                </tr>
              </thead>
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
                          onRowClick={onRowClick}
                          result_status={status}
                          athlete={record.athlete}
                          sportKey={sportKey}
                          unit_code={unit_code}
                        />
                      );
                    })}
                </AnimatePresence>
              </Reorder.Group>
            </table>
          )}
        </div>
      )}
    </>
  );
}

export default Grid;
