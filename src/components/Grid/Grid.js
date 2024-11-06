import { animate, AnimatePresence, Reorder } from "framer-motion";
import styles from "./Grid.module.css";
import Loading from "../../UI/Loader/Loading";
import useSocketStore from "../../store/socketStore";
import { useEffect, useState, memo } from "react";

const PlayerRow = memo(
	({ record, columns, rowKey, onRowClick, index, details, itemName }) => {
		console.log(record);
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
	isModal,
	forCard,
	details,
	itemName,
	sportKey,
}) {
	const { dataState, unitCode } = useSocketStore();
	const [animatedData, setAnimatedData] = useState([]);

	useEffect(() => {
		if (!isModal) {
			if (!details && dataState?.current?.results?.length > 0) {
				const sportKey = dataState.current?.unit_code?.substring(0, 3);
				const item_name = dataState.current?.item_name;

				data[sportKey][item_name] = dataState.current.results;
				// data = {
				// 	...data,
				// 	[sportKey]: {
				// 		[item_name]: dataState.current.results,
				// 	},
				// };

				setAnimatedData(data[sportKey][item_name]);
			} else if (details) {
				setAnimatedData(dataState.current || data);
			} else {
				setAnimatedData(data);
			}
		}
	}, [dataState, data, isModal, unitCode, details]);

	console.log(animatedData);
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
							{Array.isArray(animatedData[sportKey]) &&
								animatedData[sportKey]?.map(
									(record, index) => (
										console.log(record),
										(
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
										)
									)
								)}
						</AnimatePresence>
					</Reorder.Group>
				</table>
			)}
		</div>
	);
}

export default Grid;
