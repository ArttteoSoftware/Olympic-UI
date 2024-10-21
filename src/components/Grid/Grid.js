import styles from "./Grid.module.css";
import Loading from "../../UI/Loader/Loading";
import useSocketStore from "../../store/socketStore";

function Grid({ columns, data, rowKey, onRowClick, loading }) {
	const { data: socketData } = useSocketStore();
	console.log("333", socketData);
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
					<tbody>
						{data?.length > 0 &&
							data.map((record, rowIndex) => (
								<tr key={record[rowKey]} onClick={() => onRowClick(record)}>
									{columns?.map((column, index) => (
										<td
											key={[record[rowKey], index].join(",")}
											style={{
												width: column.width,
												textAlign: column.textAlign,
											}}
										>
											{column.render && column.render(record, rowIndex)}
										</td>
									))}
								</tr>
							))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default Grid;
