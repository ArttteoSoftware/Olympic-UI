import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ onVideoEnd }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		let hls;
		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(`${process.env.REACT_APP_API_URL}hls/stream.m3u8`);
			hls.attachMedia(videoRef.current);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoRef.current.play();
			});
		} else if (
			videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")
		) {
			videoRef.current.src = `${process.env.REACT_APP_API_URL}hls/stream.m3u8`;
			videoRef.current.addEventListener("loadedmetadata", () => {
				videoRef.current.play();
			});
		}

		// Cleanup function to destroy HLS instance
		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, []);

	useEffect(() => {
		const videoElement = videoRef?.current;

		const handleVideoError = () => {
			console.error("Video playback error occurred.");
			// Handle error (e.g., show a message to the user)
		};

		videoElement.addEventListener("error", handleVideoError);

		const handleVideoEnd = () => {
			onVideoEnd();
		};

		videoElement.addEventListener("ended", handleVideoEnd);

		return () => {
			videoElement.removeEventListener("error", handleVideoError);
			videoElement.removeEventListener("ended", handleVideoEnd);
		};
	}, []);

	return <video className={styles.video} ref={videoRef} muted />;
};

export default VideoPlayer;
