'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { NextArrow, PreviousArrow } from '@/public/icons';
import Image from 'next/image';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { featuredDisney } from '@/app/components/Collections/Collections';

const CustomPrevArrow: React.FC<CustomArrowProps> = ({
  currentSlide,
  onClick,
}) => {
  const isFirstSlide = currentSlide === 0;
  return (
    <button
      onClick={isFirstSlide ? undefined : onClick}
      disabled={isFirstSlide}
      className={`${
        isFirstSlide
          ? 'opacity-0 hidden'
          : 'opacity-0 visible hover:opacity-100'
      } z-20 bg-transparent border-none cursor-pointer h-full flex items-center p-0 absolute top-0 left-1 translate-x-[40%] w-[calc(3.5+24px)] opacity-0 hover:opacity-100 transition-all duration-200  `}
    >
      <div className='w-10 h-10 fill-white float-right'>
        <PreviousArrow />
      </div>
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({
  onClick,
  currentSlide = 5,
}) => {
  const isLastImage = currentSlide === 5;
  return (
    <button
      onClick={isLastImage ? undefined : onClick}
      disabled={isLastImage}
      className={`${
        isLastImage ? 'opacity-0 hidden' : 'opacity-0 visible hover:opacity-100'
      } z-20 bg-transparent border-none cursor-pointer h-full flex items-center p-0 absolute top-0 right-0 translate-x-[-40%] w-[calc(3.5+24px)] opacity-0 hover:opacity-100 transition-all duration-200 `}
    >
      <div className='w-10 h-10 fill-white '>
        <NextArrow />
      </div>
    </button>
  );
};

const settings = {
  infinite: false,
  draggable: false,
  speed: 450,
  slidesToShow: 5.5,
  slidesToScroll: 5,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const FeaturedDisneyCollections = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [isDelayPassed, setIsDelayPassed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDelayPassed(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.section
      initial={'hidden'}
      animate={isDelayPassed ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className='z-50 relative mb-4'
    >
      <h4 className='mb-[2px] select-none text-[18px] leading-[1.4] tracking-[.11px] text-[#f9f9f9] font-semibold px-[calc(3.5vw+24px)]'>
        Featured
      </h4>
      <div>
        <Slider ref={sliderRef} {...settings}>
          {featuredDisney.map((item, index) => (
            <div key={index} className='px-[calc(3.5vw+24px)] pt-2 '>
              <div className='z-[100] block w-[257px] h-full relative collection cursor-pointer overflow-x-hidden scale-100 hover:scale-[1.05] '>
                <Image
                  className='rounded-[4px]'
                  priority
                  unoptimized
                  alt='Disney+'
                  draggable={false}
                  width={257}
                  height={144}
                  src={item.featuredDisneyImg}
                />
              </div>
            </div>
          ))}
          <div />
          <div />
          <div />
          <div />
          <div />
        </Slider>
      </div>
    </motion.section>
  );
};

export default FeaturedDisneyCollections;
