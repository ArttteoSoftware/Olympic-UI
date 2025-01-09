import React, { useEffect, useState } from "react";
import styles from "./MarqueeEffect.module.css";

const MarqueeEffect = ({ children, speed = 40, shouldAnimate = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldAnimate) {
    return children;
  }

  return (
    <div className={styles.marqueeContainer}>
      <div
        className={`${styles.marqueeContent} ${
          isVisible ? styles.animate : ""
        }`}
        style={{ "--scroll-speed": `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
};

export default MarqueeEffect;
