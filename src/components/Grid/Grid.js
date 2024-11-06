import { animate, AnimatePresence, Reorder } from "framer-motion";
import styles from "./Grid.module.css";
import Loading from "../../UI/Loader/Loading";
import useSocketStore from "../../store/socketStore";
import { useEffect, useState, memo } from "react";

const PlayerRow = memo(
	({ record, columns, rowKey, onRowClick, index, details, itemName }) => {
		return (
			<Reorder.Item
				as="tr"
				value={record}
				id={record.athlete?.code}
				className={details ? styles.tr_details : styles.tr}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				onClick={() => onRowClick(record, itemName)}
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
						{column.render ? column.render(record, index) : record[column.key]}
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
	forCard,
	details,
	itemName,
	sportKey,
}) {
	const { dataState, unitCode } = useSocketStore();
	const [animatedData, setAnimatedData] = useState([]);

	useEffect(() => {
		if (!details && unitCode === data?.unit_code) {
			setAnimatedData(dataState.current);
		} else if (details) {
			setAnimatedData(dataState.current || data);
		} else {
			setAnimatedData(data);
		}
	}, [dataState, data, unitCode, details]);

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
						values={animatedData[sportKey] || []}
						onReorder={setAnimatedData}
						drag={false}
					>
						<AnimatePresence>
							{Array.isArray(animatedData) &&
								animatedData?.map((record, index) => (
									<PlayerRow
										key={record.athlete?.code}
										record={record}
										columns={columns}
										rowKey={rowKey}
										onRowClick={onRowClick}
										animatedData={animatedData}
										index={index}
										details={details}
										itemName={itemName}
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
