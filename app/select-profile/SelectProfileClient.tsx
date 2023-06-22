'use client';

import React, { useState } from 'react';
import { Profile } from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import useProfiles from '../hooks/useProfile';
import { useRouter } from 'next/navigation';
import { Loader, ProfileAdd } from '@/public/icons';

const SelectProfileClient = () => {
  const { data, error, selectedProfile } = useProfiles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleProfileSelection = async (profileId: string) => {
    setIsLoading(true);
    selectedProfile({ id: profileId });

    // Simulate a delay of 4 seconds
    await new Promise((resolve) => setTimeout(resolve, 4000));
    router.push('/home');
  };

  if (!data) {
    return <Loader height={100} />;
  }

  if (error && error.response) {
    return (
      <div className='flex items-center justify-center h-screen text-[#f9f9f9] font-medium text-center'>
        We encountered an error. Please log in to your account again.Thank you
        for your understanding. <Link href='/login'>click here.</Link>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader height={100} />
      ) : (
        <main className='bg-[#1a1d29] h-screen fixed w-full top-0 min-h-[calc(100vh-250px)] overflow-y-auto '>
          <nav className='flex justify-between items-center z-10 md:h-[72px] px-[38px] '>
            <div>
              <Link href='/home'>
                <Image
                  className='w-auto h-[40px] inline-block '
                  priority
                  unoptimized
                  alt='Disney+'
                  width={100}
                  height={100}
                  src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
                />
              </Link>
            </div>
            <div>
              <Link href='/edit-profiles'>
                <button className='uppercase outline-none font-bold bg-[#40424a] hover:bg-[#474a53] transition-[background-color_.2s_ease-in-out] text-[#f9f9f9] text-[15px] leading-[1.6] tracking-[1px] px-6 py-0 cursor-pointer h-12 rounded'>
                  Edit Profiles
                </button>
              </Link>
            </div>
          </nav>

          <div className='flex justify-center items-center min-h-[800px]'>
            <section>
              <h2 className='text-[32px] leading-[1.2] tracking-[.11px]  pb-6 text-[#f9f9f9] font-bold text-center'>
                Who&apos;s Watching?
              </h2>
              <ul className='max-w-[880px] flex justify-center items-start flex-wrap my-[42px] mx-auto w-full'>
                {data.map(({ id, image, name }: Profile, index: number) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: [0, 0.4, 0.8, 1], y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div key={id}>
                      <div
                        className='m-[18px] flex items-center flex-col p-0 opacity-100'
                        onClick={() => handleProfileSelection(id)}
                      >
                        <div className='md:w-[140px] md:h-[140px] relative avatar-hov hover:scale-[1.05] hover:duration-[250ms] cursor-pointer'>
                          <Image
                            className='block m-auto cursor-pointer relative transition-all'
                            priority
                            unoptimized
                            alt='Disney+'
                            width={140}
                            height={140}
                            src={image as string}
                          />
                        </div>
                        <h3 className='text-[24px] leading-[1.2] font-semibold text-[#f9f9f9] mt-6'>
                          {name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {data.length === 7 ? (
                  ''
                ) : (
                  <div>
                    <div className='m-[18px] flex items-center flex-col p-0 opacity-100'>
                      <Link href='/select-avatar'>
                        <div className='flex items-center justify-center md:w-[140px] md:h-[140px] relative hover:bg-[rgba(249,249,249,0.4)] avatar-hov hover:scale-[1.05] hover:duration-[250ms] cursor-pointer bg-[rgba(249,249,249,0.1)] rounded-[50%]'>
                          <div className='cursor-pointer relative transition-all h-12 w-12 min-w-[48px] z-auto fill-[#f9f9f9]'>
                            <ProfileAdd />
                          </div>
                        </div>
                      </Link>
                      <h3 className='text-[24px] leading-[1.2] font-semibold text-[#f9f9f9] mt-6'>
                        Add Profile
                      </h3>
                    </div>
                  </div>
                )}
              </ul>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default SelectProfileClient;
