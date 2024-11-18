import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ onVideoEnd }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource("http://localhost:5000/hls/stream.m3u8");
			hls.attachMedia(videoRef.current);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoRef?.current?.play();
			});
		} else if (
			videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")
		) {
			videoRef.current.src = "http://localhost:5000/hls/stream.m3u8";
			videoRef.current.addEventListener("loadedmetadata", () => {
				videoRef.current.play();
			});
		}
	}, []);

	useEffect(() => {
		const videoElement = videoRef?.current;

		const handleVideoEnd = () => {
			if (onVideoEnd) {
				onVideoEnd();
			}
		};

		videoElement.addEventListener("ended", handleVideoEnd);

		return () => {
			videoElement.removeEventListener("ended", handleVideoEnd);
		};
	}, [onVideoEnd]);

	return <video className={styles.video} ref={videoRef} muted />;
};

export default VideoPlayer;
