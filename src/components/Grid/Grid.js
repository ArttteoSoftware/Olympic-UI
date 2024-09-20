import styles from "./Grid.module.css";

function Grid({ columns, data, rowKey }) {
	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr>
					{columns.map((column) => (
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
				{data.map((record) => (
					<tr key={record[rowKey]}>
						{columns.map((column, index) => (
							<td
								key={[record[rowKey], index].join(",")}
								style={{ width: column.width }}
							>
								{column.render && column.render(record)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Grid;
