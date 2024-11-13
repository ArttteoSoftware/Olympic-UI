import { AnimatePresence, Reorder } from "framer-motion";
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
	}) => {
		console.log("i***III	", itemName);
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
						console.log("**itemm", itemName);
						onRowClick(record, itemName, athlete);
					}
				}}
			>
				{columns?.map((column) => (
					<td
						key={`${record[rowKey]}-${column.key}`}
						style={{
							width: column.width,
							minWidth: column.minWidth,
							maxWidth: column.maxWidth,
							textAlign: column.textAlign,
						}}
						className={details ? styles.td_details : styles.td}
					>
						{column.render
							? column.render(record, index, result_status)
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
	loading,
	details,
	itemName,
	item_name,
	result_status,
}) {
	const { dataState, unitCode } = useSocketStore();
	const [animatedData, setAnimatedData] = useState([]);
	const [status, setStatus] = useState();

	console.log("dd", result_status);
	useEffect(() => {
		if (dataState.item_name === item_name) {
			setAnimatedData(dataState.current);
			setStatus(dataState.result_status);
		} else {
			setStatus(result_status);

			if (details) {
				setAnimatedData(data.start_list);
			} else {
				setAnimatedData(data);
			}
		}
	}, [dataState, data, unitCode, details, item_name]);

	return (
		<div className={details ? styles.container_details : styles.container}>
			{loading ? (
				<div className={styles.loaderContainer}>
					<Loading />
				</div>
			) : (
				<table className={details ? styles.table_details : styles.table}>
					<thead className={details ? styles.thead_details : styles.thead}>
						<tr>
							{columns?.map((column) => (
								<th
									key={column.key}
									style={{
										width: column.width,
										minWidth: column.minWidth,
										maxWidth: column.maxWidth,
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
								animatedData?.map((record, index) => (
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
									/>
								))}
						</AnimatePresence>
					</Reorder.Group>
				</table>
			)}
		</div>
	);
}

export default Grid;
