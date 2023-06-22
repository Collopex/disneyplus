'use client';

import React, { useEffect, useState } from 'react';

import BrandCollections from '../components/Collections/BrandCollections';
import HeroCollections from '../components/Collections/HeroCollections';
import NewCollections from '../components/Collections/NewCollections';
import TonightCollections from '../components/Collections/TonightCollections';
import RecommendCollections from '../components/Collections/RecommendCollections';
import BingeableCollections from '../components/Collections/BingeableCollections';
import TrendingCollections from '../components/Collections/TrendingCollections';
import Navbar from '../components/Navbar/Navbar';
import { Loader } from '@/public/icons';
import useSelectProfile from '../hooks/useSelectProfile';
import Footer from '../components/Footer/Footer';

const HomeClient = () => {
  const { isLoading } = useSelectProfile();

  return (
    // CHECK FOR CUSTOM DOTS JUMP ERROR
    <>
      {isLoading ? (
        <Loader height={100} />
      ) : (
        <div>
          <Navbar />
          <div className='bg-[rgb(26,29,41)] z-[3] main-bg-pic'>
            <main className='relative block h-auto pb-8 overflow-x-hidden overflow-y-hidden '>
              <HeroCollections />
              <BrandCollections />
              <NewCollections />
              <TonightCollections />
              <RecommendCollections />
              <BingeableCollections />
              <TrendingCollections />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeClient;
