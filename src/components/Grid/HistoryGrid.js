import styles from "./HistoryGrid.module.css";
import Loading from "../../UI/Loader/Loading";
import { memo } from "react";

const PlayerRow = memo(
	({ record, columns, rowKey, index, details, result_status }) => {
		return (
			<tr className={details ? styles.tr_details : styles.tr}>
				{Array.isArray(columns) &&
					columns?.map((column) => (
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
			</tr>
		);
	}
);

function HistoryGrid({
	columns,
	data,
	loading,
	details,
	itemName,
	result_status,
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
							{Array.isArray(columns) &&
								columns?.map((column) => (
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
									data={data}
									index={index}
									details={details}
									itemName={itemName}
									result_status={result_status}
								/>
							))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default HistoryGrid;
