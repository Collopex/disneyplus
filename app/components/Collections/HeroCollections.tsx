'use client';

import { NextArrow, PreviousArrow } from '@/public/icons';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { heroCol } from './Collections';
import { motion } from 'framer-motion';

const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='z-50 bg-transparent border-none cursor-pointer h-full flex items-center flex-row-reverse p-0 absolute top-0 left-5 translate-x-[-40%] w-[calc(3.5vw)] opacity-0 hover:opacity-100 transition-all duration-200 '
    >
      <div className='w-10 h-10 fill-white '>
        <PreviousArrow />
      </div>
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='z-50 bg-transparent border-none cursor-pointer h-full flex items-center p-0 absolute top-0 -right-5 translate-x-[-34%] w-[calc(3.5vw)] opacity-0 hover:opacity-100 transition-all duration-200 '
    >
      <div className='w-10 h-10 fill-white '>
        <NextArrow />
      </div>
    </button>
  );
};

type CustomDotProps = {
  active: boolean;
  onClick: () => void;
};

const CustomDot: React.FC<CustomDotProps> = ({ active, onClick }) => {
  return (
    <div
      className={`${active ? 'custom-dot active' : 'custom-dot'}`}
      onClick={onClick}
    ></div>
  );
};

const HeroCollections = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDelayPassed, setIsDelayPassed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDelayPassed(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const goToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      setCurrentSlide(slideIndex);
      sliderRef.current.slickGoTo(slideIndex);
    }
  };

  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const settings = {
    dots: true,
    dotsClass: 'custom-dots',
    customPaging: (i: any) => (
      <CustomDot active={i === currentSlide} onClick={() => goToSlide(i)} />
    ),
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 450,
    className: 'center',
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const slideVariants = {
    hidden: { x: '30px', opacity: 0 },
    visible: { x: '0px', opacity: 1 },
  };
  const slideVariantsStreaming = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section>
      <motion.div
        initial={'hidden'}
        animate={isDelayPassed ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className='relative top-[72px] mt-7 mb-3 w-full h-full overflow-x-hidden min-h-[28.3vw] z-50'
      >
        <Slider ref={sliderRef} {...settings} beforeChange={handleBeforeChange}>
          {heroCol.map((item, index) => (
            <div key={index}>
              <div className='z-30 block w-[1384px] h-full relative hero-collection cursor-pointer mx-auto overflow-x-hidden '>
                <Image
                  className='rounded-[6px]'
                  priority
                  unoptimized
                  alt='Disney+'
                  width={1384}
                  height={369}
                  src={item.banner}
                  draggable={false}
                />
                <motion.img
                  className={`rounded-[6px] ${
                    item.bannerLogo.includes('width=1440&aspectRatio=3.91')
                      ? 'object-cover w-full h-full absolute inset-0'
                      : 'w-[27%] absolute top-[10%] right-auto bottom-auto left-[6.5%]'
                  }`}
                  src={item.bannerLogo}
                  alt='Disney+'
                  width={1384}
                  height={369}
                  initial='hidden'
                  animate={index === currentSlide ? 'visible' : 'hidden'}
                  variants={slideVariants}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.9],
                    delay: 0.15,
                  }}
                />

                <motion.h4
                  initial='hidden'
                  animate={index === currentSlide ? 'visible' : 'hidden'}
                  variants={slideVariantsStreaming}
                  transition={{
                    duration: 0.65,
                    ease: [0.25, 0.46, 0.45, 0.9],
                    delay: 0.9,
                  }}
                  className='absolute bottom-[10%] left-[6.5%] text-[19px] leading-[1.4] tracking-[.11px] text-[#f9f9f9] font-semibold'
                >
                  {item.streaming}
                </motion.h4>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default HeroCollections;
