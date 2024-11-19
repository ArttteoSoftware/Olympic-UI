import React, { useState, useMemo, useEffect } from "react";
import styles from "./Card.module.css";
import { motion, Reorder } from "framer-motion";
import { Divider } from "../../UI/Icons";
import { convertSportTitle } from "../../enum/Sport";
import useSocketStore from "../../store/socketStore";
import Grid from "../Grid/Grid";
import { returnSportColumn } from "../../UI/columns/Columns";
import MarqueeEffect from "../MarqueeEffect/MarqueeEffect";
import VideoPlayer from "../Videoplayer/VideoPlayer";

const Card = ({ title, units, divider }) => {
	const [data, setData] = useState([]);
	const [isFlipped, setIsFlipped] = useState(false);
	const { dataState } = useSocketStore();

	useEffect(() => {
		setData(units);
	}, [units]);

	console.log("DDDD", data);

	const commonStyles = useMemo(
		() => ({
			padding: "0px",
			position: "absolute",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backfaceVisibility: "hidden",
		}),
		[]
	);
	const getListData = (unit) => {
		if (unit.item_name === dataState.item_name) {
			const updatedData = data.map((item) =>
				item.item_name === dataState.item_name
					? { ...item, start_list: unit.start_list }
					: item
			);

			return updatedData[0];
		} else {
			return unit.start_list;
		}
	};

	const renderUnit = (unit) => {
		const listData = getListData(unit);
		if (unit.item_name === dataState.item_name) {
			return (
				<>
					{/* <MarqueeEffect> */}
					<div key={unit.unit_code}>
						<UnitHeader item={unit} />
						<Grid
							result_status={unit.result_status}
							details={false}
							columns={returnSportColumn(title)}
							data={listData}
							className={styles.cardGrid}
							item_name={unit.item_name}
						/>
					</div>
					{/* </MarqueeEffect> */}
				</>
			);
		} else {
			return (
				<div key={unit.unit_code}>
					<UnitHeader item={unit} />
					<Grid
						result_status={unit.result_status}
						details={false}
						columns={returnSportColumn(title)}
						data={listData}
						className={styles.cardGrid}
						item_name={unit.item_name}
					/>
				</div>
			);
		}
	};

	return (
		<div className={styles.mainContainer}>
			<FrontCard
				commonStyles={commonStyles}
				isFlipped={isFlipped}
				title={title}
				data={data}
				setData={setData}
				renderUnit={renderUnit}
				setIsFlipped={setIsFlipped}
				divider={divider}
			/>
			<BackCard
				commonStyles={commonStyles}
				isFlipped={isFlipped}
				setIsFlipped={setIsFlipped}
			/>
		</div>
	);
};

const UnitHeader = ({ item }) => {
	if (item?.item_name) {
		return (
			<div className={styles.subtitleContainer}>
				<div className={styles.subtitleInnerContainer}>
					<div className={styles.dashedLine} />
					<div className={styles.subtitle}>{item.item_name}</div>
					<div className={styles.dashedLine} />
				</div>
			</div>
		);
	}
};

const FrontCard = ({
	commonStyles,
	isFlipped,
	title,
	data,
	setData,
	renderUnit,
	setIsFlipped,
	divider,
}) => (
	console.log("*****", data),
	(
		<Reorder.Group
			style={commonStyles}
			animate={{ rotateY: isFlipped ? 180 : 0 }}
			transition={{ duration: 0.6 }}
			values={data}
			onReorder={setData}
			onClick={() => setIsFlipped(true)}
			className={styles.container}
		>
			<div className={styles.title}>{convertSportTitle(title)}</div>
			<div className={styles.tableContainer}>
				{/* <Divider color={color} /> */}
				{divider}
				<div className={styles.innerContainer}>{data.map(renderUnit)}</div>
			</div>
		</Reorder.Group>
	)
);

const BackCard = ({ commonStyles, isFlipped, setIsFlipped }) => (
	<motion.div
		style={commonStyles}
		initial={{ rotateY: 180 }}
		animate={{ rotateY: isFlipped ? 0 : 180 }}
		transition={{ duration: 0.6 }}
	>
		<VideoPlayer
			onVideoEnd={() => {
				setIsFlipped(false);
			}}
		/>
	</motion.div>
);

export default Card;
