"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import photo1 from "../assets/miscelleanous/photo_1.jpg";

function AboutMeCard() {
  return (
    <div className="flex justify-center items-center p-8 max-w-[1240px] mx-auto">
      <motion.div
        className="bg-whiterounded-lg max-w-lg w-full p-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Who I Am?</h1>
        <p className="text-center pb-4 italic">
          "I am a young passionate photographer based in Bucharest, Romania,
          dedicated to capturing the essence of people, the beauty of fleeting
          moments, and the raw emotions that define our experiences. Book a
          session and see for yourself"
        </p>
        <Image src={photo1}></Image>
      </motion.div>
    </div>
  );
}

export default AboutMeCard;
