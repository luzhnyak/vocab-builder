import { useEffect, useState } from "react";
import css from "./ScrollUp.module.css";
import { FaAngleUp } from "react-icons/fa";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <div className={css.scrollUp} onClick={scrollToTop}>
          <FaAngleUp />
        </div>
      )}
    </div>
  );
};

export default ScrollUp;
