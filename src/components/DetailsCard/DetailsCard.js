import { useState, useRef, useEffect } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./DetailsCard.module.css";
import Grid from "../Grid/Grid";
import Modal from "../Modal/Modal";
import useSocketStore from "../../store/socketStore";
function DetailsCard({
	columns,
	initialData,
	title,
	color,
	filter,
	setFilterValue,
	loading,
}) {
	const ref = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});
	const [gridData, setGridData] = useState([]);
	const { data } = useSocketStore();
	const handleRowClick = (record) => {
		setPlayerInfo(record);
		setOpenInfo(true);
	};

	useEffect(() => {
		setGridData(data || initialData?.start_list);
	}, [data, initialData]);

	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.cardTitle}>{title}</div>

				<div className={styles.divider}>
					<Divider />
				</div>
				<div className={styles.container}>
					<div className={styles.filterContainer}>
						<div
							className={styles.filterInnerContainer}
							style={{ backgroundColor: color }}
						>
							<div className={styles.filterTitle}>
								<div>Distance: 4x6 KM</div>
								<div className={styles.dateAndTime}>
									<div className={styles.date}>08.02.2024</div>
									<div className={styles.time}>
										<div>•</div>
										<div>12:30 </div>
									</div>
								</div>
							</div>
						</div>

						<Select
							onSelect={(e) => setFilterValue(e)}
							onClose={() => setIsOpen(false)}
							onClick={() => setIsOpen(!isOpen)}
							state={isOpen}
							options={filter}
							defaultValue={filter[0]}
						/>
					</div>

					<div className={styles.cardSubtitleContainer}>
						<div className={styles.cardSubtitleInnerContainer}>
							<div className={styles.dashedLine}></div>
							<div className={styles.subtitle}>GIRLS</div>
							<div className={styles.dashedLine}></div>
						</div>
					</div>
					<div className={styles.dataContainer}>
						<Grid
							columns={columns}
							data={gridData}
							rowKey={(record) => record._id}
							onRowClick={handleRowClick}
							loading={loading}
							isModal={false}
						/>
					</div>
				</div>
			</div>
			{openInfo && (
				<Modal
					record={playerInfo}
					ref={ref}
					visible={Boolean(openInfo)}
					title={playerInfo.name}
					onClose={() => setOpenInfo(false)}
				/>
			)}
		</>
	);
}

export default DetailsCard;
