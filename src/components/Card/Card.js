import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./Card.module.css";
import { motion, Reorder } from "framer-motion";
import axios from "axios";
import { Divider } from "../../UI/Icons";
import { useNavigate } from "react-router-dom";
import { convertSportTitle } from "../../enum/Sport";
import { BiathlonCol } from "../../UI/columns/Columns";
import useSocketStore from "../../store/socketStore";

import Grid from "../Grid/Grid";
function Card({ title, units }) {
	const [data, setData] = useState([]);
	const [isFlipped, setIsFlipped] = useState(false);
	const { dataState } = useSocketStore();

	useEffect(() => {
		if (dataState?.current?.length > 0) {
			setData(dataState.current);
		} else {
			setData(units);
		}
	}, [dataState]);

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

	return (
		<div className={styles.mainContainer}>
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
					<div className={styles.innerContainer}>
						{data.map((unit) => {
							return (
								<div>
									<div className={styles.subtitleContainer}>
										<div className={styles.subtitleInnerContainer}>
											<div className={styles.dashedLine}></div>
											<div className={styles.subtitle}>{unit.unit_code}</div>
											<div className={styles.dashedLine}></div>
										</div>
									</div>

									<Grid
										details={false}
										columns={BiathlonCol}
										data={unit.start_list}
										className={styles.cardGrid}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</Reorder.Group>

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
		</div>
	);
}

export default Card;
