import { useState, useRef, useEffect } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./DetailsCard.module.css";
import Grid from "../Grid/Grid";
import Modal from "../Modal/Modal";
import useSocketStore from "../../store/socketStore";
import FormatData from "../../util/FormatData";

const DetailsCard = ({
	columns,
	initialData,
	title,
	color,
	filter,
	setFilterValue,
	loading,
}) => {
	const modalRef = useRef(null);
	const [selectedFilter, setSelectedFilter] = useState(filter[0]);
	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});
	const [gridData, setGridData] = useState([]);
	const { dataState } = useSocketStore();

	useEffect(() => {
		setGridData(dataState?.length > 0 ? dataState : initialData);
	}, [dataState, initialData]);

	const handleRowClick = (record) => {
		setPlayerInfo(record);
		setOpenInfo(true);
	};

	const handleFilterSelect = (filter) => {
		setSelectedFilter(filter);
		setFilterValue(filter);
	};

	return (
		<>
			<div className={styles.mainContainer}>
				<CardHeader title={title} />
				<div className={styles.container}>
					<FilterSection
						initialData={initialData}
						color={color}
						filter={filter}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						onFilterSelect={handleFilterSelect}
					/>
					<GridSection
						gridData={gridData}
						columns={columns}
						handleRowClick={handleRowClick}
						loading={loading}
					/>
				</div>
			</div>
			<PlayerInfoModal
				ref={modalRef}
				playerInfo={playerInfo}
				openInfo={openInfo}
				onClose={() => setOpenInfo(false)}
			/>
		</>
	);
};

const CardHeader = ({ title }) => (
	<>
		<div className={styles.cardTitle}>{title}</div>
		<div className={styles.divider}>
			<Divider />
		</div>
	</>
);

const FilterSection = ({
	initialData,
	color,
	filter,
	isOpen,
	setIsOpen,
	onFilterSelect,
}) => (
	<div className={styles.filterContainer}>
		<FilterInfo initialData={initialData} color={color} />
		<Select
			onSelect={onFilterSelect}
			onClose={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
			state={isOpen}
			options={filter}
			defaultValue={filter[0]}
		/>
	</div>
);

const FilterInfo = ({ initialData, color }) => (
	<div
		className={styles.filterInnerContainer}
		style={{ backgroundColor: color }}
	>
		<div className={styles.filterTitle}>
			<div>Distance: {FormatData.formatDistance(initialData?.unit_code)}KM</div>
			<DateTimeDisplay initialData={initialData} />
		</div>
	</div>
);

const DateTimeDisplay = ({ initialData }) => (
	<div className={styles.dateAndTime}>
		<div className={styles.date}>
			{FormatData.formatDate(initialData?.start_date)}
		</div>
		<div className={styles.time}>
			<div>•</div>
			<div>{FormatData.formatTime(initialData?.start_date)}</div>
		</div>
	</div>
);

const GridSection = ({ gridData, columns, handleRowClick, loading }) => (
	<>
		{gridData.map((item) => (
			<div key={item.item_name}>
				<GridHeader itemName={item.item_name} />
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
			</div>
		))}
	</>
);

const GridHeader = ({ itemName }) => (
	<div className={styles.cardSubtitleContainer}>
		<div className={styles.cardSubtitleInnerContainer}>
			<div className={styles.dashedLine} />
			<div className={styles.subtitle}>{itemName}</div>
			<div className={styles.dashedLine} />
		</div>
	</div>
);

const PlayerInfoModal = ({ playerInfo, openInfo, onClose, ref }) =>
	openInfo && (
		<Modal
			record={playerInfo}
			ref={ref}
			visible={Boolean(openInfo)}
			title={playerInfo.name}
			onClose={onClose}
		/>
	);

export default DetailsCard;
