import React, { useState, useMemo, useEffect } from "react";
import styles from "./Card.module.css";
import { motion, Reorder } from "framer-motion";
import { Divider } from "../../UI/Icons";
import { convertSportTitle } from "../../enum/Sport";
import useSocketStore from "../../store/socketStore";
import Grid from "../Grid/Grid";
import { returnSportColumn } from "../../UI/columns/Columns";

const Card = ({ title, units }) => {
	const [data, setData] = useState([]);
	const [isFlipped] = useState(false);
	const { dataState } = useSocketStore();

	useEffect(() => {
		setData(units);
	}, [units]);

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

			return updatedData[0]; // **** CHECK FOR TWO SPORTS
			// setData(updatedData);
		} else {
			return unit.start_list;
		}
	};

	const renderUnit = (unit) => {
		const listData = getListData(unit);
		return (
			// <MarqueeEffect>
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
			// </MarqueeEffect>
		);
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
			/>
			<BackCard commonStyles={commonStyles} isFlipped={isFlipped} />
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
}) => (
	<Reorder.Group
		style={commonStyles}
		animate={{ rotateY: isFlipped ? 180 : 0 }}
		transition={{ duration: 0.6 }}
		values={data}
		onReorder={setData}
		className={styles.container}
	>
		<div className={styles.title}>{convertSportTitle(title)}</div>
		<div className={styles.tableContainer}>
			<Divider />
			<div className={styles.innerContainer}>{data.map(renderUnit)}</div>
		</div>
	</Reorder.Group>
);

const BackCard = ({ commonStyles, isFlipped }) => (
	<motion.div
		style={commonStyles}
		initial={{ rotateY: 180 }}
		animate={{ rotateY: isFlipped ? 0 : 180 }}
		transition={{ duration: 0.6 }}
	>
		<video autoPlay loop muted playsInline className={styles.video}>
			<source src="/assets/video.mp4" type="video/mp4" />
		</video>
	</motion.div>
);

export default Card;
