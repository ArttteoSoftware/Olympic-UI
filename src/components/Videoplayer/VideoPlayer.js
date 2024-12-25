import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import styles from "./VideoPlayer.module.css";
import useSocketStore from "../../store/socketStore";

const VideoPlayer = ({ streamUrl, onVideoEnd, play, setPlay }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    if (!play) return;

    if (Hls.isSupported()) {
      hlsRef.current = new Hls({
        enableWorker: true,
        startPosition: 0,
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
        startLevel: 0,
        autoStartLoad: true,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 3,
        maxBufferSize: 15000000,
        maxBufferHole: 0.5,
        lowLatencyMode: true,
        backBufferLength: 30,
      });

      hlsRef.current.loadSource(streamUrl);
      hlsRef.current.attachMedia(videoRef.current);

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) {
          tryPlayVideo();
        }
      });
    } else if (
      videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = streamUrl;
      videoRef.current.load();
      tryPlayVideo();
    }

    const videoElement = videoRef.current;

    // Add resize event listener

    if (videoElement) {
      ["play", "pause", "timeupdate", "seeking", "seeked", "ended"].forEach(
        (eventName) => {
          videoElement.addEventListener(eventName, () => {
            console.log(`Video event triggered: ${eventName}`, {
              currentTime: videoElement.currentTime,
              duration: videoElement.duration,
            });
          });
        }
      );
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        setPlay(false);
      }
    };
  }, [onVideoEnd, play, setPlay, streamUrl]);

  const tryPlayVideo = () => {
    if (document.visibilityState === "visible" && videoRef.current) {
      videoRef.current.preload = "auto";
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play:", error);
        setTimeout(() => {
          videoRef.current?.play().catch(console.error);
        }, 1000);
      });
    }
  };

  return (
    <video
      className={styles.video}
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      onPlay={() => setPlay(true)}
    />
  );
};

export default VideoPlayer;
