'use client';

import React, { useEffect, useState } from 'react';
import useProfiles from '@/app/hooks/useProfile';
import useSelectProfile from '@/app/hooks/useSelectProfile';
import {
  Home,
  Loader,
  Movies,
  Originals,
  Search,
  Series,
  Watchlist,
} from '@/public/icons';
import { Profile } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data, error, selectedProfile } = useProfiles();
  const selectProfile = useSelectProfile();
  const router = useRouter();

  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);
  const [active, setActive] = useState(false);

  const [isDelayPassed, setIsDelayPassed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDelayPassed(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleProfileSelection = async (profileId: string) => {
    try {
      selectProfile.setLoading(true);
      await selectedProfile({ id: profileId });
    } catch (error) {
      throw new Error();
    } finally {
      selectProfile.setLoading(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 15 ? setActive(true) : setActive(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleContainerHover = () => {
    setShowProfileSettings(true);
    setTimeout(() => {
      setShowOverflow(true);
    }, 300);
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
    <header className='relative z-[100]'>
      <div>
        <nav
          className={`fixed home-nav-bg flex justify-between items-center md:h-[72px] px-[38px] w-full z-50 ${
            active
              ? 'bg-black transition duration-150'
              : 'bg-transparent transition duration-150'
          }`}
        >
          <div className='flex items-center m-0 p-0 h-full overflow-x-hidden'>
            <div className='pr-9'>
              <Image
                className='w-auto h-[40px] inline-block '
                unoptimized
                alt='Disney+'
                width={100}
                height={100}
                src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
              />
            </div>

            <span className='h-full w-auto flex justify-center cursor-pointer'>
              <div
                className='py-4 px-[18px] flex items-center'
                onClick={() => router.push('/home')}
              >
                <div className='w-5 h-5 -mt-[4px] mr-[2px] fill-[#f9f9f9]'>
                  <Home />
                </div>
                <p className='icon-dash uppercase inline-block select-none text-[13px] leading-[1.07] tracking-[1.2px] font-semibold ml-2 whitespace-nowrap py-[2px]'>
                  Home
                </p>
              </div>
            </span>

            <span className='h-full w-auto flex justify-center cursor-pointer'>
              <div className='py-4 px-[18px] flex items-center'>
                <div className='w-5 h-5 -mt-[4px] mr-[2px] fill-[#f9f9f9]'>
                  <Search />
                </div>
                <p className='icon-dash uppercase inline-block select-none text-[13px] leading-[1.07] tracking-[1.2px] font-semibold ml-2 whitespace-nowrap py-[2px]'>
                  Search
                </p>
              </div>
            </span>

            <span className='h-full w-auto flex justify-center cursor-pointer'>
              <div className='py-4 px-[18px] flex items-center'>
                <div className='w-3 h-3 -mt-[4px] mr-[2px]  fill-[#f9f9f9]'>
                  <Watchlist />
                </div>
                <p className='icon-dash uppercase inline-block select-none text-[13px] leading-[1.07] tracking-[1.2px] font-semibold ml-2 whitespace-nowrap py-[2px]'>
                  Watchlist
                </p>
              </div>
            </span>

            <span className='h-full w-auto flex justify-center cursor-pointer'>
              <div className='py-4 px-[18px] flex items-center'>
                <div className='w-5 h-5 -mt-[4px] mr-[2px]  fill-[#f9f9f9]'>
                  <Originals />
                </div>
                <p className='icon-dash uppercase inline-block select-none text-[13px] leading-[1.07] tracking-[1.2px] font-semibold ml-2 whitespace-nowrap py-[2px]'>
                  Originals
                </p>
              </div>
            </span>

            <span className='h-full w-auto flex justify-center cursor-pointer'>
              <div className='py-4 px-[18px] flex items-center'>
                <div className='w-5 h-5 -mt-[4px] mr-[2px]  fill-[#f9f9f9]'>
                  <Movies />
                </div>
                <p className='icon-dash uppercase inline-block select-none text-[13px] leading-[1.07] tracking-[1.2px] font-semibold ml-2 whitespace-nowrap py-[2px]'>
                  Movies
                </p>
              </div>
            </span>

            <span className='h-full w-auto flex justify-center cursor-pointer'>
              <div className='py-4 px-[18px] flex items-center'>
                <div className='w-5 h-5 -mt-[4px] mr-[2px]  fill-[#f9f9f9]'>
                  <Series />
                </div>
                <p className='icon-dash uppercase inline-block select-none text-[13px] leading-[1.07] tracking-[1.2px] font-semibold ml-2 whitespace-nowrap py-[2px]'>
                  Series
                </p>
              </div>
            </span>
          </div>
          <ul
            className={`profile-settings scrollbar-hide ${
              showOverflow ? 'show-overflow' : ''
            }`}
            onMouseEnter={handleContainerHover}
            onMouseLeave={() => setShowProfileSettings(false)}
          >
            <div className='z-50'>
              {data.map(
                ({ id, image, name, selected }: Profile, index: number) => (
                  <li key={id}>
                    {selected && (
                      <motion.div
                        initial={'hidden'}
                        animate={isDelayPassed ? 'visible' : 'hidden'}
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1 },
                        }}
                        className='flex items-center justify-end w-[240px] h-[72px] opacity-100 py-2 px-5 '
                      >
                        <p className='text-[#f9f9f9] mx-4 text-[15px] leading-[1.6] tracking-[-.1px] font-medium select-none cursor-pointer'>
                          {name}
                        </p>
                        <Image
                          className='w-12 h-12 inline-block cursor-pointer'
                          unoptimized
                          alt='Disney+'
                          width={48}
                          height={48}
                          src={image as string}
                        />
                      </motion.div>
                    )}
                  </li>
                )
              )}
              <div
                className={`${
                  showProfileSettings
                    ? 'opacity-100 visible transition-opacity duration-300 delay-[370ms]'
                    : 'opacity-0 invisible select-none'
                } border-b border-[rgba(249,249,249,0.1)] w-[200px] mx-auto`}
              />
              {data
                .filter((profile: Profile) => !profile.selected)
                .map(({ id, image, name }: Profile, index: number) => (
                  <li key={id}>
                    <div
                      onClick={() => handleProfileSelection(id)}
                      className={`group flex items-center justify-start cursor-pointer w-[240px] lg:pl-6 h-[72px] py-2 ${
                        showProfileSettings
                          ? 'opacity-100 visible transition-opacity duration-300 delay-[370ms]'
                          : 'opacity-0 invisible select-none'
                      } `}
                    >
                      <Image
                        className='w-12 h-12 inline-block'
                        unoptimized
                        alt='Disney+'
                        width={48}
                        height={48}
                        src={image as string}
                      />
                      <p className='text-[#cacaca] group-hover:text-[#f9f9f9] ml-4 text-[15px] leading-[1.6] tracking-[-.1px] font-medium select-none'>
                        {name}
                      </p>
                    </div>
                  </li>
                ))}
            </div>

            <div
              className={` w-full h-full flex flex-col justify-start gap-3 cursor-pointer mt-1 ${
                showProfileSettings
                  ? 'opacity-100 visible transition-opacity duration-300 delay-[370ms]'
                  : 'opacity-0 invisible select-none'
              } `}
            >
              <Link href='/edit-profiles'>
                <li className='text-[#cacaca] hover:text-[#f9f9f9]  text-[15px] leading-[1.6] tracking-[-.1px] font-medium '>
                  Edit Profiles
                </li>
              </Link>
              <Link href='/app-settings'>
                <li className='text-[#cacaca] hover:text-[#f9f9f9]  text-[15px] leading-[1.6] tracking-[-.1px] font-medium '>
                  App Settings
                </li>
              </Link>
              <Link href='/account'>
                <li className='text-[#cacaca] hover:text-[#f9f9f9]  text-[15px] leading-[1.6] tracking-[-.1px] font-medium '>
                  Account
                </li>
              </Link>
              <Link href='/help'>
                <li className='text-[#cacaca] hover:text-[#f9f9f9]  text-[15px] leading-[1.6] tracking-[-.1px] font-medium '>
                  Help
                </li>
              </Link>

              <li
                onClick={() => signOut()}
                className='text-[#cacaca] hover:text-[#f9f9f9]  text-[15px] leading-[1.6] tracking-[-.1px] font-medium '
              >
                Log Out
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
