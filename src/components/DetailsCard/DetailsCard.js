import React, { useState, useRef, useEffect } from "react";
import { Divider, RedDivider, YellowDivider } from "../../UI/Icons";
import Select from "../Select/Select";
import styles from "./DetailsCard.module.css";
import Grid from "../Grid/Grid";
import PlayerInfoModal from "../PlayerInfoModal/PlayerInfoModal";
import useSocketStore from "../../store/socketStore";

const DetailsCard = ({
	columns,
	initialData,
	title,
	unitNames,
	setFilterValue,
	sportKey,
	loading,
	color,
}) => {
	const modalRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [playerInfo, setPlayerInfo] = useState({});
	const [gridData, setGridData] = useState([]);
	const { dataState } = useSocketStore();
	const [youtube, setYoutube] = useState(false);

	useEffect(() => {
		if (dataState?.current?.length > 0) {
			initialData.forEach((element) => {
				if (element.item_name === dataState.item_name) {
					initialData.startList = dataState.current;
					initialData.result_status = dataState.result_status;
				}
				setGridData(initialData);
			});
		} else {
			setGridData(initialData);
		}
	}, [dataState, initialData]);

	const handleRowClick = (record, unitName) => {
		setPlayerInfo({ ...record, item_name: unitName });
		setOpenInfo(true);
	};

	const handleFilterSelect = (filter) => {
		setFilterValue(filter);
	};

	const handleModal = () => {
		setYoutube(!youtube);
	};
	return (
		<>
			<div className={styles.mainContainer}>
				<div
					className={styles.cardHeaderContainer}
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div style={styles.liveIndicatorContainer}></div>
					<CardHeader title={title} />

					<div className={styles.liveIndicatorContainer}>
						{/* TODO : There is a time gap while dataState is loaded */}
						{initialData.result_status === "LIVE" && (
							<div
								style={{ width: "100px" }}
								onClick={() => {
									setYoutube(true);
								}}
								className={styles.liveIndicator}
							>
								Live
								<span
									className={`${styles.liveIcon} ${styles.pulseDot}`}
								></span>
							</div>
						)}
					</div>
				</div>

				<div className={styles.divider}>
					<RedDivider />
				</div>
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
				result_status={initialData?.result_status}
				playerInfo={playerInfo}
				columns={columns}
				openInfo={openInfo}
				onClose={() => setOpenInfo(false)}
			/>

			{youtube && (
				<div className={styles.overlay} onClick={handleModal}>
					<iframe
						className={styles.youtubeIframe}
						src="https://www.youtube.com/embed/LB25cfAvpqw?si=aNFGvuBb_IzT3jWJ"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
				</div>
			)}
		</>
	);
};

const CardHeader = ({ title }) => (
	<>
		<div className={styles.cardTitle}>{title}</div>
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
						result_status={item.result_status}
						details={true}
						columns={columns}
						data={item}
						rowKey={(record) => record._id}
						onRowClick={handleRowClick}
						loading={loading}
						item_name={item.item_name}
						athlete={item.athlete}
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

const PlayerInfo = React.forwardRef(
	({ sportKey, playerInfo, openInfo, onClose, result_status, columns }, ref) =>
		openInfo && (
			<PlayerInfoModal
				record={playerInfo}
				result_status={result_status}
				modalRef={ref}
				visible={Boolean(openInfo)}
				sportKey={sportKey}
				item_name={playerInfo.item_name}
				onClose={onClose}
				columns={columns}
			/>
		)
);

export default DetailsCard;
