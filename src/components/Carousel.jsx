import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Carousel = ({ children, rowID }) => {
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const updateButtonState = () => {
    let slider = document.getElementById("slider" + rowID);
    if (slider) {
      setIsLeftDisabled(slider.scrollLeft === 0);
      setIsRightDisabled(
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth
      );
    }
  };

  useEffect(() => {
    updateButtonState();
    window.addEventListener("resize", updateButtonState);
    return () => {
      window.removeEventListener("resize", updateButtonState);
    };
  }, [rowID, children]);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
    setTimeout(updateButtonState, 300);
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
    setTimeout(updateButtonState, 300);
  };

  return (
    <div className="relative flex items-center group">
      <MdChevronLeft
        onClick={slideLeft}
        className={`left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block ${
          isLeftDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-white"
        }`}
        size={40}
        disabled={isLeftDisabled}
      />
      <div
        id={"slider" + rowID}
        className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        onScroll={updateButtonState}
      >
        {children}
      </div>
      <MdChevronRight
        onClick={slideRight}
        className={`right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block ${
          isRightDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-white"
        }`}
        size={40}
        disabled={isRightDisabled}
      />
    </div>
  );
};

export default Carousel;
