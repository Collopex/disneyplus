'use client';

import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className='mt-0 relative z-20 bg-[#0e0b14] w-full h-full'>
      <div className='pt-[19px] w-[94px] mx-auto my-0'>
        <Image
          className='w-[80%]'
          priority
          unoptimized
          alt='Disney+'
          width={100}
          height={100}
          src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
        />
      </div>
      <div className='my-0 mx-auto justify-center flex mt-1'>
        <ul className='text-[11px] leading-[22px] flex flex-wrap  gap-5 py-2 '>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/legal/policy'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                Privacy Policy
              </span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/legal/cookies-policy'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                Cookies Policy
              </span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/legal/emea-policy-rights'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                EMEA Privacy Rights
              </span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/legal/subscriber-agreement'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                Subscriber Agreement
              </span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/help-center'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>Help</span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/supported-devices'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                Supported Devices
              </span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/about-us'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>About Us</span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/legal/preferences-ads'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                Interest-Based Ads
              </span>
            </a>
          </li>
          <li>
            <a
              className='inline-block mb-0  whitespace-nowrap'
              href='/manage-preferences'
            >
              <span className='text-[#f9f9f9] hover:text-[#fff]'>
                Manage Preferences
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className='text-[11px] leading-[22px] text-[#cacaca] pt-1 pb-6 text-center'>
        © Disney. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
