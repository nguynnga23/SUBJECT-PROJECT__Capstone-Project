import { useEffect, useRef, useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { thumnailDefault } from "../../assets";
import { useNavigate } from "react-router-dom";
import { LuCalendarClock } from "react-icons/lu";

const BannerSlider = ({ list }) => {
  const ITEMS_PER_SLIDE = 2;
  const totalSlides = Math.ceil(list?.length / ITEMS_PER_SLIDE);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const resetInterval = () => {
    if (totalSlides <= 1) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 10000);
  };

  useEffect(() => {
    if (totalSlides <= 1) return;
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides]);

  const handleManualNav = (direction) => {
    direction === "next" ? nextSlide() : prevSlide();
    resetInterval();
  };

  const handleClick = (id) => {
    navigate(`/article/${id}`);
  };

  if (list.length === 0) return null;

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
              className="flex gap-4"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="relative w-1/2 h-[250px] cursor-pointer group"
                  onClick={() => handleClick(item.documentId)}
                >
                  <img
                    className="w-full h-full object-cover rounded-lg shadow"
                    src={item?.thumbnail}
                    alt={item?.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = thumnailDefault;
                    }}
                  />
                  <span className="absolute right-2 top-2 flex items-center gap-2 px-3 py-1 border rounded-full bg-white shadow-sm">
                    <LuCalendarClock size={18} className="text-[#F9B200]" />
                    <i className="text-[11px]">
                      {formatDate(item.externalPublishDate)}
                    </i>
                  </span>

                  <div className="absolute min-h-[50px] bottom-0 left-0 w-full p-1 bg-blue-300/50 text-gray-100 text-[12px] rounded-b-lg  transition">
                    {item?.title}
                  </div>
                </div>
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
