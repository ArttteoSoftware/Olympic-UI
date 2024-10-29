import { useState, useRef, useEffect } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./DetailsCard.module.css";
import Grid from "../Grid/Grid";
import Modal from "../Modal/Modal";
import useSocketStore from "../../store/socketStore";
import { convertGender } from "../../enum/Gender";
import FormatData from "../../util/FormatData";
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

	const [selectedFilter, setSelectedFilter] = useState(filter[0]);
	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});
	const [gridData, setGridData] = useState([]);
	const { dataState } = useSocketStore();
	const handleRowClick = (record) => {
		setPlayerInfo(record);
		setOpenInfo(true);
	};

	useEffect(() => {
		if (dataState && dataState.length > 0) {
			// console.log("data", dataState);
			setGridData(dataState);
		} else {
			// console.log("initialData", initialData);
			setGridData(initialData);
		}
	}, [dataState, initialData]);

	console.log("initialData", initialData);
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
								<div>
									Distance: {FormatData.formatDistance(initialData?.unit_code)}
									KM
								</div>
								<div className={styles.dateAndTime}>
									<div className={styles.date}>
										{FormatData.formatDate(initialData?.start_date)}
									</div>
									<div className={styles.time}>
										<div>•</div>
										<div>{FormatData.formatTime(initialData?.start_date)}</div>
									</div>
								</div>
							</div>
						</div>

						<Select
							onSelect={(e) => {
								setSelectedFilter(e);
								setFilterValue(e);
							}}
							onClose={() => setIsOpen(false)}
							onClick={() => setIsOpen(!isOpen)}
							state={isOpen}
							options={filter}
							defaultValue={filter[0]}
						/>
					</div>

					{gridData.map((item) => {
						console.log("item", item);
						return (
							<>
								<div className={styles.cardSubtitleContainer}>
									<div className={styles.cardSubtitleInnerContainer}>
										<div className={styles.dashedLine}></div>
										<div className={styles.subtitle}>{item.unit_code}</div>
										<div className={styles.dashedLine}></div>
									</div>
								</div>
								<div className={styles.dataContainer}>
									<Grid
										details={true}
										columns={columns}
										data={item.start_list}
										rowKey={(record) => record._id}
										onRowClick={handleRowClick}
										loading={loading}
										isModal={false}
									/>
								</div>
							</>
						);
					})}
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
