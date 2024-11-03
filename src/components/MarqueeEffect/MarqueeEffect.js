import React, { useEffect, useState } from "react";
import styles from "./MarqueeEffect.module.css";

const MarqueeEffect = ({ children, speed = 40, details }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Small delay to let the content render first
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{!details ? (
				<div className={styles.marqueeContainer}>
					<div
						className={`${styles.marqueeContent} ${
							isVisible ? styles.animate : ""
						}`}
						style={{ "--scroll-speed": `${speed}s` }}
					>
						{children}
						{children}
					</div>
				</div>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default MarqueeEffect;
