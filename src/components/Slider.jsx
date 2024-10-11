"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function Slider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div id="gallery" className="max-w-[1240px] mx-auto">
      <h1 className="text-2xl font-bold text-center p-4">Gallery</h1>
      <div className="relative flex justify-center p-4">
        {SliderData.map((slide, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? "opacity-100 transition-opacity ease-in duration-1000"
                  : "opacity-0"
              }
            >
              {index === current && (
                <div className="relative w-full max-w-[800px] h-auto flex justify-center items-center">
                  {/* Left Arrow */}
                  <FaArrowAltCircleLeft
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 cursor-pointer select-none z-[2]"
                    size={50}
                  />

                  {/* Image */}
                  <Image
                    src={slide.image}
                    alt="/"
                    className="w-full h-auto object-contain"
                  />

                  {/* Right Arrow */}
                  <FaArrowAltCircleRight
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 cursor-pointer select-none z-[2]"
                    size={50}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
