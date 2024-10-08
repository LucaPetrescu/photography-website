import React from "react";
import igImg1 from "../assets/instagram/photo_1.jpg";
import igImg2 from "../assets/instagram/photo_2.jpg";
import igImg3 from "../assets/instagram/photo_3.jpg";
import igImg4 from "../assets/instagram/photo_4.jpg";
import igImg5 from "../assets/instagram/photo_5.jpg";
import igImg6 from "../assets/instagram/photo_6.jpg";
import InstagramImg from "./InstagramImg";

const Instagram = () => {
  return (
    <div className="max-w-[1240px] mx-auto text-center py-24">
      <p className="text-2xl font-bold">Follow me on Instagram</p>
      <p className="pb-4">@lucahaznikon</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-4">
        <InstagramImg socialImg={igImg1} />
        <InstagramImg socialImg={igImg2} />
        <InstagramImg socialImg={igImg3} />
        <InstagramImg socialImg={igImg4} />
        <InstagramImg socialImg={igImg5} />
        <InstagramImg socialImg={igImg6} />
      </div>
    </div>
  );
};

export default Instagram;
