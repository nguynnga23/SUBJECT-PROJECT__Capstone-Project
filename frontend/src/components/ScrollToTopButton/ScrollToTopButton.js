import { useState, useEffect } from "react";
import { CiCircleChevUp } from "react-icons/ci";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-1 rounded-full hover:bg-blue-700 shadow-lg transition duration-300 z-50"
      >
        <CiCircleChevUp size={25} className="text-blue-600 hover:text-white " />
      </button>
    )
  );
}

export default ScrollToTopButton;
