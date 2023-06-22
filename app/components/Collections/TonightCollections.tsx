'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PreviousArrow } from '@/public/icons';
import { tonigth } from './Collections';

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
      } z-20 bg-transparent border-none cursor-pointer h-full flex items-center p-0 absolute top-0 -left-[58px] translate-x-[40%] w-[calc(3.5+24px)] opacity-0 hover:opacity-100 transition-all duration-200  `}
    >
      <div className='w-10 h-10 fill-white float-right'>
        <PreviousArrow />
      </div>
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({
  onClick,
  currentSlide = 12,
}) => {
  const isLastImage = currentSlide === 12;
  return (
    <button
      onClick={isLastImage ? undefined : onClick}
      disabled={isLastImage}
      className={`${
        isLastImage ? 'opacity-0 hidden' : 'opacity-0 visible hover:opacity-100'
      } z-20 bg-transparent border-none cursor-pointer h-full flex items-center p-0 absolute top-0 -right-[58px] translate-x-[-40%] w-[calc(3.5+24px)] opacity-0 hover:opacity-100 transition-all duration-200 `}
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
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const TonightCollections = () => {
  const router = useRouter();
  const sliderRef = useRef<Slider | null>(null);

  return (
    <section className='z-20 relative'>
      <h4 className='mb-[2px] select-none text-[18px] leading-[1.4] tracking-[.11px] text-[#f9f9f9] font-semibold px-[calc(3.5vw+24px)]'>
        What to Watch Tonight
      </h4>
      <div className='block relative mt-[10px] mb-8 w-screen '>
        <div
          className='h-0 w-full relative overflow-hidden '
          style={{
            borderRadius: '4px',
            paddingTop: '21.29%',
            background: 'linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42))',
          }}
        >
          <div>
            <Image
              className='block absolute inset-0 h-full w-full object-cover '
              alt='Disney+'
              width={1536}
              height={333}
              draggable={false}
              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/859CFDAB4033BC6DB5E630B3FF8BF56B0C28856A19788AFBA13DE2A571BD04C7/badging?aspectRatio=4.61&format=jpeg&label=461_scrim'
            />
          </div>
        </div>

        <div className='absolute w-screen h-[calc(21.692vw)] text-center pt-[0%] pb-0 pl-0 pr-0 leading-[1.53] text-[15px] top-0 bottom-0 left-0 xl:top-[24px] xl:left-[calc(3.5vw+24px)] xl:py-0 xl:px-12 xl:w-[calc(28.5vw-(3.5vw+24px))]'>
          <Image
            className='xl:mt-[11%] mr-0 mb-5 ml-0 p-0 w-full'
            src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/316E834D641656139075BA78F3D316AB4AC3A19442C53FDB9599828E077B7181/scale?width=600&aspectRatio=1.78&format=png'
            alt='Disney+'
            width={264}
            draggable={false}
            height={149}
          />
          <button
            onClick={() => router.push('/editorial/more-entertainment')}
            className='select-none uppercase xl:block xl:my-0 xl:mx-auto bg-[#40424a] text-[15px] font-semibold leading-[1.6] tracking-[1.1px] cursor-pointer text-[#f9f9f9] hover:bg-[#474a53] hover:transition-[background-color_.2s_ease-in-out] rounded w-auto h-12 border-0 py-0 px-6 flex justify-center items-center transition-[all_0.2s_ease-in-out_0s] opacity-100 m-0 active:bg-[#f9f9f933] active:transition-[background-color_.2s_ease-in-out]'
          >
            View More
          </button>
        </div>
        <div className=' absolute top-[4%] right-[calc(3.5vw+24px)]  h-full z-50'>
          <Slider ref={sliderRef} {...settings} className='w-[1015px]'>
            {tonigth.map((item, index) => (
              <div key={index} className='pt-2'>
                <div className='z-[100] block w-[183px] mx-auto h-full relative collection cursor-pointer overflow-x-hidden scale-100 hover:scale-[1.05] '>
                  <Image
                    className='rounded'
                    priority
                    draggable={false}
                    alt='Disney+'
                    width={192}
                    height={270.61}
                    src={item.tonigth}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TonightCollections;
