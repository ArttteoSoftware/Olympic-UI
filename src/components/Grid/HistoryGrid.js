import styles from "./HistoryGrid.module.css";
import Loading from "../../UI/Loader/Loading";
import { memo } from "react";

const PlayerRow = memo(
	({ record, columns, rowKey, onRowClick, index, details, itemName }) => {
		return (
			<tr
				className={details ? styles.tr_details : styles.tr}
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
			</tr>
		);
	}
);

function HistoryGrid({
	columns,
	data,
	rowKey,
	onRowClick,
	loading,
	details,
	itemName,
}) {
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
					<tbody>
						{Array.isArray(data) &&
							data.map((record, index) => (
								<PlayerRow
									key={record.athlete?.code}
									record={record}
									columns={columns}
									rowKey={rowKey}
									onRowClick={onRowClick}
									data={data}
									index={index}
									details={details}
									itemName={itemName}
								/>
							))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default HistoryGrid;
