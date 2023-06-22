'use client';

import Image from 'next/image';
import React, { useContext, useRef } from 'react';

import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { avatar } from './Collection';
import { useRouter } from 'next/navigation';
import { AvatarContext } from '../context/AvatarContext';
import { NextArrow, PreviousArrow } from '@/public/icons';

const CustomPrevArrow: React.FC<CustomArrowProps> = ({
  currentSlide,
  onClick,
}) => {
  const isFirstSlide = currentSlide === 0;
  const buttonClassName = `h-full w-[calc(24px+3.5vw)] absolute top-0 p-0 prev-arrow-transform transition-all duration-200 ${
    isFirstSlide ? 'opacity-0 hidden' : 'opacity-0 visible hover:opacity-100'
  }`;
  return (
    <button
      className={buttonClassName}
      onClick={isFirstSlide ? undefined : onClick}
      disabled={isFirstSlide}
    >
      <div className='w-10 h-10 fill-white float-right'>
        <PreviousArrow />
      </div>
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({
  onClick,
  currentSlide = 24,
}) => {
  const isLastImage = currentSlide === 24;

  const buttonClassName = `h-full w-[calc(24px+3.5vw)] absolute right-0 top-0 p-0 next-arrow-transform transition-all duration-200 ${
    isLastImage ? 'opacity-0 hidden' : 'opacity-0 visible hover:opacity-100'
  }`;

  return (
    <button
      className={buttonClassName}
      onClick={isLastImage ? undefined : onClick}
      disabled={isLastImage}
    >
      <div className='w-10 h-10 fill-white '>
        <NextArrow />
      </div>
    </button>
  );
};

const settings = {
  infinite: true,
  speed: 400,
  slidesToShow: 6,
  slidesToScroll: 6,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const SelectAvatarClient = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { setAvatarPreference } = useContext(AvatarContext);
  const router = useRouter();

  const handleAvatarClick = (image: string) => {
    setAvatarPreference(image);
    router.push('/add-profile');
  };
  return (
    <>
      <div className='main-bg-disney main-bg-pic z-[-3]'>
        <main className='h-screen fixed w-full top-0 min-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden z-50'>
          <nav className='flex justify-between items-center md:h-[72px] px-[38px] fixed z-50 w-full'>
            <div className='flex-1'>
              <Image
                className='w-auto h-[40px] inline-block'
                unoptimized
                priority
                alt='Disney+'
                width={100}
                height={100}
                src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
              />
            </div>
            <div>
              <button className='uppercase outline-none font-bold bg-[#40424a] hover:bg-[#474a53] transition-[background-color_.2s_ease-in-out] text-[#f9f9f9] text-[15px] leading-[1.6] tracking-[1px] px-6 py-0 cursor-pointer h-12 rounded'>
                Skip
              </button>
            </div>
          </nav>
          <header className='pt-[10.5%] pl-[calc(24px+3.5vw)] text-[#f9f9f9]'>
            <h2 className='text-[32px] leading-[1.2] tracking-[-0.020em] font-bold select-none'>
              Choose Avatar
            </h2>
          </header>
          <div className='flex-grow p-[calc(24px+3.5vw)]'>
            {avatar.map((item, index) => (
              <div key={index}>
                <div>
                  <h4 className='text-[20px] leading-[1.2] tracking-[-0.025em] font-bold select-none'>
                    {item.title}
                  </h4>
                  <div className='mb-[10px] -mx-[10px]'>
                    <Slider ref={sliderRef} {...settings}>
                      {item.avatars.map((image, index) => (
                        <div
                          key={index}
                          onClick={() => handleAvatarClick(image)}
                        >
                          <div className='m-[18px] flex items-center flex-col p-0 opacity-100'>
                            <div className='md:w-[214px] md:h-[214px] relative avatar-hov hover:scale-[1.05] hover:duration-[250ms] cursor-pointer'>
                              <Image
                                className='block m-auto cursor-pointer relative transition-all'
                                priority
                                unoptimized
                                alt='Disney+'
                                width={214}
                                height={214}
                                src={image}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default SelectAvatarClient;
