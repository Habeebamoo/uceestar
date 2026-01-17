"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"
import HeroCard from "./HeroCard";
import { ArrowRight } from "lucide-react";

const HeroDisplay = () => {
  return (
    <>
      {/* large screens */}
      <section className="max-lg:hidden grid grid-cols-7 gap-6 px-10 pt-22">
        <div className="col-span-4">
          <div className="h-[537px] rounded-xl overflow-hidden relative col-span-3">
            <img src="sneaker.jpeg" className="w-full h-full object-center object-cover" />

            <div className="gradient-overlay p-8">
              <div className="absolute bottom-[40px]">
                <h1 className="text-white font-outfit text-5xl">
                  Nike Sneakers
                </h1>

                <div className="text-white flex-start gap-4 mt-3">
                  <p className="font-jsans lg:text-xl">
                    &#x20A6; 44,900
                  </p>

                  <p className="text-gray-400  text-sm lg:text-md font-outfit line-through">
                    &#x20A6; 51,535
                  </p>
                </div>
{/* 
                <button className="btn-blue font-outfit py-3 px-4 rounded-xl flex-center gap-2">
                  <span>Shop Now</span>
                  <ArrowRight size={17} />
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-1 gap-4">
          <div className="h-[260px] rounded-xl overflow-hidden relative col-span-3">
            <img src="laptop.jpeg" className="w-full h-full object-center object-cover" />

            <div className="gradient-overlay p-6">
              <div className="absolute bottom-[20px]">
                <h1 className="text-white font-outfit text-4xl">
                  Apple Macbook Air
                </h1>

                <div className="text-white flex-start gap-4 mt-2">
                  <p className="font-jsans lg:text-xl">
                    &#x20A6; 599,900
                  </p>

                  <p className="text-gray-400  text-sm lg:text-md font-outfit line-through">
                    &#x20A6; 689,885
                  </p>
                </div>

                {/* <button className="btn-blue font-outfit py-3 px-4 rounded-xl flex-center gap-2">
                  <span>Shop Now</span>
                  <ArrowRight size={17} />
                </button> */}
              </div>
            </div>
          </div>

          <div className="h-[260px] rounded-xl overflow-hidden relative col-span-3">
            <img src="s-watch.jpeg" className="w-full h-full object-center object-cover" />

            <div className="gradient-overlay p-6">
              <div className="absolute bottom-[20px]">
                <h1 className="text-white font-outfit text-4xl">
                  Apple Watch Series 3
                </h1>

                <div className="text-white flex-start gap-4 mt-2">
                  <p className="font-jsans lg:text-xl">
                    &#x20A6; 99,400
                  </p>

                  <p className="text-gray-400  text-sm lg:text-md font-outfit line-through">
                    &#x20A6; 109,135
                  </p>
                </div>

                {/* <button className="btn-blue font-outfit py-3 px-4 rounded-xl flex-center gap-2">
                  <span>Shop Now</span>
                  <ArrowRight size={17} />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* small screens */}
      <section className="pt-16 sm:pt-16 md:pt-16 lg:hidden">
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
    </>
  )
}

export default HeroDisplay