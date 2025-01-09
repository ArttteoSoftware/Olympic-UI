import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalCarousel.module.css";
import { getDividerColor } from "../../enum/Divider";
import Card from "../Card/Card";
import Loading from "../../UI/Loader/Loading";

const VerticalCarousel = ({ items, loader }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const distance = touchStartY.current - touchEndY.current;
    if (distance > 50) {
      // Swipe up
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else if (distance < -50) {
      // Swipe down
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    }
  };

  return (
    <div
      className={styles.carouselContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ justifyContent: loader && "center" }}
    >
      {loader ? (
        <Loading />
      ) : (
        <motion.div
          className={styles.carouselContent}
          key={currentIndex}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0px" }}
        >
          <Card
            divider={getDividerColor(items[currentIndex]?._id)}
            title={items[currentIndex]?._id}
            units={items[currentIndex]?.units}
          />
          <Card
            className={"blurredCard"}
            divider={getDividerColor(
              items[(currentIndex + 1) % items.length]?._id
            )}
            title={items[(currentIndex + 1) % items.length]?._id}
            units={items[(currentIndex + 1) % items.length]?.units}
          />
        </motion.div>
      )}
    </div>
  );
};

export default VerticalCarousel;
