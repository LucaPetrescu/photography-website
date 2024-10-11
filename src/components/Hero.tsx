"use client";
import React from "react";
import Typewriter from "typewriter-effect";

function Hero({
  heading,
  message,
  flag,
}: {
  heading: string;
  message: string;
  flag: boolean;
}) {
  return (
    <div
      className="flex items-center justify-center h-screen 
        mb-12 bg-fixed bg-center bg-cover custom-img"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-2 text-white z-[2] mt-[-10rem]">
        <h2 className="text-5xl font-bold">
          {flag ? (
            <Typewriter
              options={{
                strings: [heading],
                autoStart: true,
                loop: true,
              }}
            />
          ) : (
            heading
          )}
        </h2>
        <p className="py-5 text-xl">{message}</p>
        <button className="px-8 py-2 border">Book a Session</button>
      </div>
    </div>
  );
}

export default Hero;
