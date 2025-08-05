import { useEffect, useRef, useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const BannerSlider = ({ list }) => {
  const ITEMS_PER_SLIDE = 2;
  const totalSlides = Math.ceil(list.length / ITEMS_PER_SLIDE);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 10000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleManualNav = (direction) => {
    direction === "next" ? nextSlide() : prevSlide();
    resetInterval(); // reset timer sau khi bấm
  };

  return (
    <div className="relative overflow-hidden w-full ">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${100 * totalSlides}%`,
          transform: `translateX(-${(100 / totalSlides) * currentSlide}%)`,
        }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
          const start = slideIndex * ITEMS_PER_SLIDE;
          const items = list.slice(start, start + ITEMS_PER_SLIDE);

          return (
            <div
              key={slideIndex}
              className="flex gap-4 "
              style={{ width: `${100 / totalSlides}%` }}
            >
              {items.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Slide ${start + idx}`}
                  className="w-1/2 h-[250px] object-cover rounded-lg shadow"
                />
              ))}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleManualNav("prev")}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-lg p-1 shadow z-10"
      >
        <MdOutlineChevronLeft color="gray" />
      </button>
      <button
        onClick={() => handleManualNav("next")}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-lg p-1 shadow z-10"
      >
        <MdOutlineChevronRight color="gray" />
      </button>
    </div>
  );
};

export default BannerSlider;
