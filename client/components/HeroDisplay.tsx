"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"
import HeroCard from "./HeroCard";

const HeroDisplay = () => {
  return (
    <section className="mt-19 p-3 md:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        loop
        speed={700}
      >

        <SwiperSlide>
          <HeroCard img="sneaker.jpeg" name="Nike Sneakers" price={44900} />
        </SwiperSlide>

        <SwiperSlide>
          <HeroCard img="laptop.jpeg" name="Apple MacBook Air" price={599900} />
        </SwiperSlide>

        <SwiperSlide>
          <HeroCard img="s-watch.jpeg" name="Apple Watch Series 3" price={94900} />
        </SwiperSlide>
        
      </Swiper>
    </section>
  )
}

export default HeroDisplay