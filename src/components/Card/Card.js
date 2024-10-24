import React, { useState, useCallback, useMemo } from "react";
import styles from "./Card.module.css";
import { motion, Reorder } from "framer-motion";
import axios from "axios";
import { Divider } from "../../UI/Icons";
import { useNavigate } from "react-router-dom";

function Card() {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [updatedData, setUpdatedData] = useState([]);
	const [isFlipped, setIsFlipped] = useState(false);

	const loadData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/players`
			);
			if (response.status === 200) {
				setData(response.data);
			}
		} catch (error) {
			console.error("Error loading initial data:", error);
		}
	}, []);

	const loadUpdatedData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/updatedPlayers`
			);
			if (response.status === 200) {
				setUpdatedData(response.data);
				setTimeout(() => {
					setData(response.data);
				}, 3000);
			}
		} catch (error) {
			console.error("Error loading updated data:", error);
		}
	}, []);

	// useEffect(() => {
	// 	loadData();
	// 	loadUpdatedData();

	// 	const intervalId = setInterval(loadUpdatedData, 3000); // Update every 30 seconds

	// 	return () => clearInterval(intervalId);
	// }, [loadData, loadUpdatedData]);

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

	const flickerAnimation = {
		flickering: {
			backgroundColor: ["#ffffff", "#8fd5a5", "#ffffff", "#8fd5a5"],
			transition: {
				duration: 1,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	};
	const playerList = useMemo(() => {
		return data.map((player, index) => {
			const updatedIndex = updatedData.findIndex((p) => p.id === player.id);
			const rankChange = updatedIndex !== -1 ? index - updatedIndex : 0;
			return { ...player, rankChange };
		});
	}, [data, updatedData]);

	return (
		<div onClick={() => navigate("/sports")} className={styles.mainContainer}>
			<Reorder.Group
				style={commonStyles}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6 }}
				values={playerList}
				onReorder={setData}
				className={styles.container}
			>
				<div className={styles.title}>ALPINE SKIING</div>
				<div className={styles.tableContainer}>
					<Divider />
					<div className={styles.innerContainer}>
						<div className={styles.table}>
							<div className={styles.subtitleContainer}>
								<div className={styles.subtitleInnerContainer}>
									<div className={styles.dashedLine}></div>
									<div className={styles.subtitle}>
										10 km Individual start free (boys)
									</div>
									<div className={styles.dashedLine}></div>
								</div>
							</div>

							{/* {hockey ? (
								<div className={styles.list_girl}>
									{playerList.map((match, matchIndex) => {
										return (
											<div className={styles.innerHockayContainer}>
												{match.map((country, countryIndex) => {
													return (
														<motion.div
															key={`${matchIndex}-${countryIndex}`}
															className={styles.countryInfo}
															variants={flickerAnimation}
															layout
															initial={{ backgroundColor: "#ffffff" }}
															// animate={
															// 	matchIndex === matchRandomIndexGirls &&
															// 	countryRandomIndexGirls === countryIndex
															// 		? "flickering"
															// 		: "initial"
															// }
														>
															<div className={styles.innerCountryInfo}>
																<div>{country.flag}</div>
																<div>{country.country}</div>
															</div>
															<div className={styles.score}>
																{country.scores.map((score, index) => {
																	const firstPositiveIndex =
																		country.scores.findIndex(
																			(score) => score > 0
																		);
																	return (
																		<div
																			key={index}
																			className={
																				index === firstPositiveIndex
																					? styles.boldedScore
																					: ""
																			}
																		>
																			{score}
																		</div>
																	);
																})}
															</div>
														</motion.div>
													);
												})}
											</div>
										);
									})}
								</div>
							) : (
								<div className={styles.list}>
									{playerList.map((player, index) => (
										<PlayerRow key={player.id} player={player} index={index} />
									))}
								</div>
							)} */}
						</div>
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
