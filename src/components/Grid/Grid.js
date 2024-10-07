import styles from "./Grid.module.css";

function Grid({ columns, data, rowKey, onRowClick }) {
	console.log("c", columns);
	return (
		<>
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
				<tbody>
					{data.map((record, rowIndex) => (
						<tr key={record[rowKey]} onClick={() => onRowClick(record)}>
							{columns?.map((column, index) => (
								<td
									key={[record[rowKey], index].join(",")}
									style={{ width: column.width, textAlign: column.textAlign }}
								>
									{column.render && column.render(record, rowIndex)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default Grid;
