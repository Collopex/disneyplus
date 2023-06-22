'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTransform, useScroll } from 'framer-motion';
import Navbar from '@/app/components/Navbar/Navbar';
import Image from 'next/image';
import NewCollections from '@/app/components/Collections/NewCollections';
import { Loader } from '@/public/icons';

const StarWarsClient = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    [
      0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
      750, 800,
    ],
    [
      '100',
      '.95',
      '.90',
      '.85',
      '.80',
      '.75',
      '.70',
      '.65',
      '.60',
      '.55',
      '.50',
      '.45',
      '.40',
      '.35',
      '.30',
      '.25',
      '.20',
    ]
  );

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  useEffect(() => {
    if (videoEnded) {
      setVideoEnded(true);
    }

    const delay = 450;

    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [videoEnded]);

  const brandSlide = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {loading ? (
        <Loader height={100} />
      ) : (
        <div>
          <Navbar />
          <div className='bg-[rgb(26,29,41)] z-[3px] main-bg-pic'>
            <main className='relative block h-auto py-0 overflow-x-hidden overflow-y-hidden '>
              <video
                className='fixed w-full top-0 left-0 right-0 -bottom-[1px] z-20'
                src='https://vod-bgc-eu-west-1.media.dssott.com/bgui/ps01/disney/bgui/2021/11/04/1636056809-star-wars.mp4'
                autoPlay
                playsInline
                muted
                onEnded={handleVideoEnded}
                style={{
                  opacity: videoEnded ? 0 : 1,
                }}
              />

              <motion.div
                className='fixed left-0 right-0 top-0 w-full z-10'
                style={{ opacity: opacity }}
              >
                <motion.img
                  initial='hidden'
                  animate={videoEnded ? 'visible' : 'hidden'}
                  variants={brandSlide}
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.9],
                    delay: 0.2,
                  }}
                  className='w-screen'
                  src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5A92131654C1E0B1A4C072A327E49FB30CA8BDED279852FB32CAD9B33B4AAAB1/scale?width=1440&aspectRatio=1.78&format=jpeg'
                  alt='Star-Wars'
                  width={1536}
                  height={864}
                />
                <div className='slide-linear' />
              </motion.div>

              <div
                style={{
                  opacity: videoEnded ? 0 : 1,
                  transition: 'opacity 200ms ease-out',
                }}
                className='w-full h-full  flex items-end justify-center my-0 mx-auto min-h-[535px] pb-6 transition-[opacity_200ms_ease_0s]'
              >
                <Image
                  unoptimized
                  className='w-[35vw] min-w-[200px] max-w-[600px]'
                  src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/2939F39F251515613B87DB083CC248B93D3FA40EA13B8399FC1F6F9B0A07CA31/scale?width=600&aspectRatio=2.00&format=png'
                  alt='Star-Wars'
                  width={538}
                  height={269}
                />
              </div>
              <div>
                <NewCollections />
                <NewCollections />
                <NewCollections />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default StarWarsClient;
