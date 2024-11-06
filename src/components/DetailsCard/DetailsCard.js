import { useState, useRef, useEffect } from "react";
import { Divider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./DetailsCard.module.css";
import Grid from "../Grid/Grid";
import PlayerInfoModal from "../PlayerInfoModal/PlayerInfoModal";
import useSocketStore from "../../store/socketStore";

const DetailsCard = ({
	columns,
	initialData,
	title,
	color,
	unitNames,
	setFilterValue,
	sportKey,
	loading,
}) => {
	const modalRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});
	const [gridData, setGridData] = useState([]);
	const { dataState } = useSocketStore();

	useEffect(() => {
		setGridData(dataState?.length > 0 ? dataState : initialData);
	}, [dataState, initialData]);

	const handleRowClick = (record, unitName) => {
		setPlayerInfo({ ...record, item_name: unitName });
		setOpenInfo(true);
	};

	const handleFilterSelect = (filter) => {
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
						unitNames={unitNames}
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
			<PlayerInfo
				ref={modalRef}
				sportKey={sportKey}
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

const FilterSection = ({ unitNames, isOpen, setIsOpen, onFilterSelect }) => (
	<div className={styles.filterContainer}>
		<Select
			onSelect={onFilterSelect}
			onClose={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
			state={isOpen}
			options={unitNames}
			defaultValue={{ item_name: "All Group", unit_code: "" }}
		/>
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
						itemName={item.item_name}
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

const PlayerInfo = ({ sportKey, playerInfo, openInfo, onClose, ref }) =>
	openInfo && (
		<PlayerInfoModal
			record={playerInfo}
			ref={ref}
			visible={Boolean(openInfo)}
			sportKey={sportKey}
			onClose={onClose}
		/>
	);

export default DetailsCard;
