import { motion, AnimatePresence, Reorder } from "framer-motion";
import styles from "./Grid.module.css";
import Loading from "../../UI/Loader/Loading";
import useSocketStore from "../../store/socketStore";
import { useEffect, useState, memo, useCallback } from "react";

const PlayerRow = memo(({ record, columns, rowKey, onRowClick }) => {
	return (
		<Reorder.Item
			value={record}
			id={record.athlete.code}
			className={styles.tr}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			onClick={() => onRowClick(record)}
		>
			{columns?.map((column, index) => (
				<td
					key={`${record[rowKey]}-${column.key}`}
					style={{
						width: column.width,
						textAlign: column.textAlign,
					}}
				>
					{column.render ? column.render(record, index) : record[column.key]}
				</td>
			))}
		</Reorder.Item>
	);
});

function Grid({ columns, data, rowKey, onRowClick, loading, isModal }) {
	const { data: socketData } = useSocketStore();
	const [animatedData, setAnimatedData] = useState([]);

	useEffect(() => {
		if (!isModal) {
			const newData = socketData?.length > 0 ? socketData : data;
			if (JSON.stringify(newData) !== JSON.stringify(animatedData)) {
				setAnimatedData(newData);
			}
		}
	}, [socketData, data, isModal, animatedData]);

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.loaderContainer}>
					<Loading />
				</div>
			) : (
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							{columns?.map((column) => (
								<th
									key={column.key}
									style={{ width: column.width, textAlign: column.textAlign }}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<Reorder.Group
						as="tbody"
						axis="y"
						values={animatedData}
						onReorder={setAnimatedData}
					>
						<AnimatePresence>
							{animatedData?.map((record) => (
								<PlayerRow
									key={record.athlete.code}
									record={record}
									columns={columns}
									rowKey={rowKey}
									onRowClick={onRowClick}
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
