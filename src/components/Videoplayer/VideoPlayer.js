import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import styles from "./VideoPlayer.module.css";
import useSocketStore from "../../store/socketStore";
import Loading from "../../UI/Loader/Loading";

const VideoPlayer = ({ streamUrl, onVideoEnd, play, setPlay }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!play || !streamUrl) return;
    setIsLoading(true);

    const initializeHls = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      hlsRef.current = new Hls({
        enableWorker: true,
        startPosition: -1,
        maxBufferLength: 5,
        maxMaxBufferLength: 15,
        startLevel: -1,
        autoStartLoad: true,
        manifestLoadingTimeOut: 5000,
        manifestLoadingMaxRetry: 2,
        maxBufferSize: 5000000,
        maxBufferHole: 0.3,
        lowLatencyMode: true,
        backBufferLength: 15,
        debug: false,
      });

      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              initializeHls();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hlsRef.current.recoverMediaError();
              break;
            default:
              initializeHls();
              break;
          }
        }
      });

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) {
          tryPlayVideo();
          setIsLoading(false);
        }
      });

      hlsRef.current.loadSource(streamUrl);
      hlsRef.current.attachMedia(videoRef.current);
    };

    if (Hls.isSupported()) {
      initializeHls();
    } else if (
      videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = streamUrl;
      videoRef.current.load();
      tryPlayVideo();
      setIsLoading(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        setPlay(false);
      }
    };
  }, [play, setPlay, streamUrl]);

  const tryPlayVideo = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setPlay(true);
    } catch (error) {
      console.error("Playback failed:", error);
      setTimeout(tryPlayVideo, 1000);
    }
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      )}
      <video
        className={`${styles.video} ${isLoading ? styles.hidden : ""}`}
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onError={(e) => console.error("Video Error:", e)}
      />
    </>
  );
};

export default VideoPlayer;
