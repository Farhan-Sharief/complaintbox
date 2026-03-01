import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setDisplay(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      ₹{display.toLocaleString()}
    </motion.span>
  );
}