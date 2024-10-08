import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import Slider from "@/components/Slider.jsx";
import { SliderData } from "@/components/SliderData";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-raleway)]">
      <Hero
        heading="Hi, I am Luca"
        message="Let me help you capture your moments"
      />
      <Slider slides={SliderData}></Slider>
      <Instagram></Instagram>
    </div>
  );
}
