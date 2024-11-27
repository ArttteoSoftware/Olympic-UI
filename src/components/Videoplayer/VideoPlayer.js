import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ onVideoEnd, shouldPlay = false }) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);

	useEffect(() => {
		if (Hls.isSupported()) {
			hlsRef.current = new Hls({
				enableWorker: true,
				startPosition: 0,
				maxBufferLength: 30,
				maxMaxBufferLength: 60,
				startLevel: -1,
				autoStartLoad: true,
				manifestLoadingTimeOut: 10000,
				manifestLoadingMaxRetry: 3,
			});

			hlsRef.current.loadSource(
				`${process.env.REACT_APP_API_URL}hls/stream.m3u8`
			);
			hlsRef.current.attachMedia(videoRef.current);

			hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
				if (videoRef.current) {
					tryPlayVideo();
				}
			});
		} else if (
			videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")
		) {
			videoRef.current.src = `${process.env.REACT_APP_API_URL}hls/stream.m3u8`;
			videoRef.current.load();
			tryPlayVideo();
		}

		const videoElement = videoRef.current;

		const handleVideoEnd = () => {
			if (typeof onVideoEnd === "function") {
				onVideoEnd();
			}
		};

		if (videoElement) {
			videoElement.addEventListener("ended", handleVideoEnd);
		}

		return () => {
			if (hlsRef.current) {
				hlsRef.current.destroy();
			}
			if (videoElement) {
				videoElement.removeEventListener("ended", handleVideoEnd);
			}
		};
	}, [onVideoEnd]);

	const tryPlayVideo = () => {
		if (document.visibilityState === "visible") {
			videoRef.current.play().catch((error) => {
				console.error("Error attempting to play:", error);
				// Optionally, prompt user interaction to play
			});
		}
	};

	return (
		<video
			className={styles.video}
			ref={videoRef}
			muted
			playsInline
			autoPlay
			preload="auto"
		/>
	);
};

export default VideoPlayer;
