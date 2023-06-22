'use client';

import { useEffect, useRef, useState } from 'react';
import { faq } from './Faq';
import Image from 'next/image';
import Link from 'next/link';
import { DownArrow, Globe } from '@/public/icons';

export default function AuthClient() {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 660 ? setActive(true) : setActive(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse the currently active accordion
    } else {
      setActiveIndex(index); // Expand the clicked accordion
    }
  };
  return (
    <div>
      <header className='sticky top-0 z-50 '>
        <nav
          className={`h-[70px] absolute w-full ${
            active
              ? 'bg-[#040714] transition duration-500'
              : 'bg-transparent transition duration-500'
          } `}
        >
          <ul className='w-full h-full flex items-center px-[38px] gap-[12px]'>
            <li className='max-h-[70px] px-[10px] h-auto flex flex-1'>
              <Image
                className={` ${
                  active
                    ? 'opacity-100 transition duration-500'
                    : 'opacity-0 transition duration-500 hidden'
                }  px-[10px]`}
                priority
                unoptimized
                alt='Disney+'
                width={100}
                height={100}
                src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
              />
            </li>
            <Link href='/sign-up'>
              <li
                className={`${
                  active
                    ? 'opacity-100 transition duration-500'
                    : 'opacity-0 transition duration-500 hidden'
                }  flex items-center h-12 uppercase text-lg bg-[#0063e5] rounded-[4px] tracking-wide py-3 px-4 text-[#f9f9f9] transition ease-out hover:bg-[#1a73e8] cursor-pointer`}
              >
                Sign up now
              </li>
            </Link>
            <Link href='/login'>
              <li
                className={`
            ${
              active
                ? 'opacity-100 transition duration-500'
                : 'opacity-[96] transition duration-500'
            } 
            flex items-center h-12 uppercase text-lg bg-black/80 border border-[#c0c0c0] rounded-[4px] tracking-wide py-3 px-4 text-[#f9f9f9] hover:bg-white hover:text-black transition ease-out cursor-pointer `}
              >
                Log in
              </li>
            </Link>
          </ul>
        </nav>
      </header>

      <main className='bg-[#040714]'>
        {/* Section-1 (HERO) */}
        <section className='relative min-h-screen flex items-center box-border justify-start p-[5.6vw]  '>
          <div className='absolute inset-0'>
            <Image
              priority
              unoptimized
              className='block w-full h-full object-cover bg-[50%] '
              width={1440}
              height={650}
              src='https://cnbl-cdn.bamgrid.com/assets/8339037abd4208fe6a6314871a81a23b7ce94ca788830be5e9ad20b60745ec3e/original'
              alt='hero-image'
            />
          </div>
          <div className='lg:max-w-[640px] z-10 w-1/2'>
            <picture className='lg:max-w-[180px] mb-[2vw] block w-full h-auto'>
              <Image
                priority
                unoptimized
                alt='Disney+'
                width={1045}
                height={569}
                src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
              />
            </picture>

            <h1 className=' font-bold lg:text-[44px] lg:leading-[54px] mb-[30px] tracking-normal text-[#f9f9f9]'>
              + More than you’d ever imagine
            </h1>
            <p className='text-[#c0c0c0] lg:text-[20px] lg:leading-[30px] mb-[20px]'>
              Enter your email to create or restart your subscription.
            </p>

            <form className='flex mb-[24px]'>
              <div className='flex-grow block'>
                <input
                  type='email'
                  id='email'
                  placeholder='Email'
                  className='bg-[#31343e] border border-[#31343e] block text-[#c0c0c0] w-full h-[50px] py-0 px-3 rounded-tl-[4px] rounded-bl-[4px]'
                />
              </div>
              <button className='px-[46px] h-[50px] bg-[#0063e5] text-[#f9f9f9] uppercase rounded-tr-[4px] rounded-br-[4px] tracking-wide  lg:text-[18px] lg:leading-[18px]'>
                Continue
              </button>
            </form>
            <p className='text-[#c0c0c0] lg:text-[20px] lg:leading-[30px] mb-[20px]'>
              Get 12 months for the price of 10 when you sign up for an annual
              Disney+ subscription, compared to paying monthly.
            </p>
          </div>

          <button className='absolute w-9 h-9 bottom-8 -ml-[7px] animate-[bouncy_1.75s_infinite] '>
            <div
              onClick={scrollToNextSection}
              className='fill-[#9a9a9a] hover:fill-[#f9f9f9] transition duration-100'
            >
              <DownArrow />
            </div>
          </button>
        </section>

        {/* Section-2 MANDALORIAN EXC. */}
        <section
          ref={nextSectionRef}
          className='relative flex items-center box-border p-0 '
        >
          <picture className='w-full h-auto'>
            <Image
              priority
              src='https://cnbl-cdn.bamgrid.com/assets/6ea6bf6f1340ab541f56b860c95a2d50d5040ecc7ee351c43465b2decca48cf0/original'
              alt='Mandalorian'
              width={1440}
              height={570}
              className='w-full h-auto'
            />
          </picture>
          <div className=' absolute flex flex-col justify-center bottom-0 left-0 top-0 w-[40%] pl-[5vw] '>
            <h1 className=' font-bold lg:text-[44px] lg:leading-[54px] mb-[30px] tracking-normal text-[#f9f9f9]'>
              Only on Disney+
            </h1>
            <p className='text-[#c0c0c0] lg:text-[20px] lg:leading-[30px] mb-[20px]'>
              Exclusive movies, series and originals you won’t find on any other
              streaming service{' '}
            </p>
            <div className='spacer mb-20'> </div>
            <div className='spacer mb-20'> </div>
          </div>
        </section>

        {/* Section-3  (Boston Strangler)*/}
        <section className='relative block items-center box-border  p-[5.6vw] text-center'>
          <h1 className=' font-bold lg:text-[44px] lg:leading-[54px] mb-[30px] tracking-normal text-[#f9f9f9]'>
            Watch the way you want
          </h1>
          <p className='text-[#c0c0c0] lg:text-[20px] lg:leading-[30px] mb-[20px]'>
            Enjoy the world’s greatest stories - anytime, anywhere.
          </p>
          <picture className='inline-block'>
            <Image
              priority
              src='https://cnbl-cdn.bamgrid.com/assets/9e91d094d6b8668655731846f2c2e6870e8607be8dd8dff3d05f0b9219e2e48c/original'
              alt='Boston Strangler'
              width={1440}
              height={570}
              className='w-full h-auto'
            />
          </picture>

          <ul className='flex justify-center flex-wrap gap-6 pl-0  my-5'>
            <li className='flex-grow-0 flex-shrink-0 grid-sc3 box-border flex flex-col items-center list-none '>
              <picture className='block'>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/f496c4734732c167a1643eaa214dbdd3a9124a04a66c4f78f83435fd80a13534/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                Endless entertainment
              </h3>
              <p className='text-[#c0c0c0] lg:text-[19px] lg:leading-[30px] mb-[20px]'>
                Explore thousands of hours of TV series, movies and originals.
              </p>
            </li>

            <li className='flex-grow-0 flex-shrink-0  grid-sc3 w-[calc(33.3%)] box-border flex flex-col items-center list-none '>
              <picture className='block'>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/bb4f144134120dc90d8a6023a34450e93d4877ea380bd5e8243f49affa022186/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                Available on your favourite devices
              </h3>
              <p className='text-[#c0c0c0] lg:text-[19px] lg:leading-[30px] mb-[20px]'>
                Stream on up to four screens at once on compatible devices.
              </p>
            </li>

            <li className='flex-grow-0 flex-shrink-0  grid-sc3 w-[calc(33.3%)] box-border flex flex-col items-center list-none '>
              <picture className='block'>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/6876a3855aaa6da0c58b19d95989cec2342f3fe6e079a583456d19539d74bbfb/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                Easy-to-use parental controls
              </h3>
              <p className='text-[#c0c0c0] lg:text-[19px] lg:leading-[30px] mb-[20px]'>
                Keep your family safe with our intuitive parental controls.
              </p>
            </li>
          </ul>
        </section>

        {/* Section-4 FAQ */}

        <section className='relative block box-border p-[5.6vw] text-center'>
          <h2 className='lg:text-[40px] lg:leading-[50px] mt-0 mb-6 text-[#f9f9f9] font-bold'>
            Frequently Asked Questions
          </h2>
          {faq.map((item, index) => (
            <div
              className='block bg-[#13151d] mt-4 w-full box-border text-left'
              key={item.question}
            >
              <button
                className='p-6 w-full cursor-pointer border-none'
                onClick={() => toggleAccordion(index)}
              >
                <span
                  className={`text-left w-full lg:text-[20px] lg:leading-[30px] font-normal inline-block m-0 pr-[26px] relative acc-btn ${
                    activeIndex === index ? 'expanded' : ''
                  }`}
                >
                  {item.question}
                </span>
              </button>
              {activeIndex === index && ( // Only render the details if activeIndex matches the current index
                <div
                  className={`max-h-[1500px] ${
                    item.lists ? 'pb-6' : 'pb-0'
                  } px-6 overflow-hidden first:mt-0 [&>*]:mb-0`}
                >
                  <span className='text-[#c0c0c0] lg:text-[19px] lg:leading-[30px]'>
                    {item.describe}
                  </span>
                  <br />
                  <br />

                  <ul className='pl-10 list-disc marker:text-[#c0c0c0] selection:bg-transparent'>
                    {item.lists?.map((listItem, listIndex) => (
                      <li
                        key={listIndex}
                        className={listIndex !== 0 ? 'mt-4' : ''}
                      >
                        <p>
                          <span className='text-[#c0c0c0] lg:text-[19px] lg:leading-[30px]'>
                            {listItem}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Section-5 Devices */}

        <section className='relative block box-border p-[5.6vw] text-center'>
          <h2 className='lg:text-[40px] lg:leading-[50px] mt-0 mb-6 text-[#f9f9f9] font-bold'>
            Available on your favourite devices
          </h2>

          <ul className='flex justify-center flex-wrap pl-0 gap-6 my-5'>
            <li className='flex-grow-0 flex-shrink-0 grid-sc5 box-border flex flex-col items-center list-none '>
              <picture>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/00fb59319fa715222100d8a84d11bc7e23a42970b4f413c9e85166d0cfba9346/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                TV
              </h3>
              <p className='text-[#c0c0c0] lg:text-[18px] lg:leading-[30px] mb-[20px]'>
                Amazon Fire TV
                <br />
                Android TV
                <br />
                Apple Tv
                <br />
                Arcelik*
                <br />
                Beko*
                <br />
                Chromecast
                <br />
                Hisense
                <br />
                Lg
                <br />
                Panasonic
                <br />
                Samsung
                <br />
                Vestel*
              </p>
            </li>
            <li className='flex-grow-0 flex-shrink-0 grid-sc5 box-border flex flex-col items-center list-none '>
              <picture>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/d73b7c534afd2af2a454dbd47bd6c766c70e334ce8137084e9cd25c2644dd267/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                Computer
              </h3>
              <p className='text-[#c0c0c0] lg:text-[18px] lg:leading-[30px] mb-[20px]'>
                Chrome OS
                <br />
                MacOs
                <br />
                Windows OS
              </p>
            </li>
            <li className='flex-grow-0 flex-shrink-0 grid-sc5 box-border flex flex-col items-center list-none '>
              <picture>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/66475056e769443ef9a491a48dfa44059c8964890ae9ef7c4f69f322693c59d8/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                Mobile & Tablet
              </h3>
              <p className='text-[#c0c0c0] lg:text-[18px] lg:leading-[30px] mb-[20px]'>
                Amazon Fire Tablets
                <br />
                Android Phones & Tablets
                <br />
                iPhone & iPad
              </p>
            </li>
            <li className='flex-grow-0 flex-shrink-0 grid-sc5 box-border flex flex-col items-center list-none '>
              <picture>
                <Image
                  priority
                  src='https://cnbl-cdn.bamgrid.com/assets/51b639d2ebe97ee175975c29d42a90b0e043713856db8e5d6d9fb87b2b3a48c0/original'
                  alt=''
                  width={1440}
                  height={570}
                  className='w-full h-auto'
                />
              </picture>
              <h3 className='mt-5 mb-6 text-[#f9f9f9] lg:text-[26px] lg:leading-[34px] font-bold'>
                Game Consoles
              </h3>
              <p className='text-[#c0c0c0] lg:text-[18px] lg:leading-[30px] mb-[20px]'>
                Ps4
                <br />
                Ps5
                <br />
                Xbox One
                <br />
                Xbox Series X
                <br />
                Xbox Series S
              </p>
            </li>
          </ul>
          <p className='lg:text-[16px] lg:leading-[26px] mb-5 text-[#c0c0c0]'>
            *Disney+ currently does not support Arcelik, Beko and Vestel smart
            TVs with Linux OS.
          </p>
        </section>

        <footer className='flex flex-col max-w-[1024px] py-[26px] px-[8px] box-border mx-auto'>
          <picture className=' block mb-[10px] w-[80px] mx-auto'>
            <Image
              priority
              unoptimized
              alt='Disney+'
              width={100}
              height={100}
              src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
            />
          </picture>
          <ul className='relative flex flex-wrap justify-center mt-0 mx-auto mb-[15px] text-[12px] leading-[22px]'>
            <li>
              <span className='mx-2 relative inline-block mb-0 py-2  whitespace-nowrap'>
                <select className='bg-transparent border-none text-[#c0c0c0] hover:underline hover:text-[#fff] hover:fill-[#f9f9f9] cursor-pointer inline-block mx-auto pl-[20px] pr-[5px] '>
                  <option className='text-[#040714]'>English</option>
                  <option className='text-[#040714]'>Turkish</option>
                </select>
                <div className='h-4 w-4 absolute top-[49%] translate-y-[-50%]  pointer-events-none z-0 fill-[#c0c0c0] hover:fill-[#fff]'>
                  <Globe />
                </div>
              </span>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/legal/subscriber-agreement'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Subscriber Agreement
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/legal/policy'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Privacy Policy
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/legal/emea-policy-rights'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  EMEA Privacy Rights
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/legal/cookies-policy'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Cookies Policy
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/legal/preferences-ads'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Interest-Based Ads
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/supported-devices'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Supported Devices
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/help-center'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Help Center
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/about-us'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  About Us
                </span>
              </a>
            </li>
            <li>
              <a
                className='inline-block mb-0 py-2 px-3 whitespace-nowrap'
                href='/manage-preferences'
              >
                <span className='text-[#c0c0c0] hover:text-[#fff]'>
                  Manage Preferences
                </span>
              </a>
            </li>
          </ul>
          <p className='text-[12px] leading-[22px] text-[#c0c0c0] mb-5 text-center'>
            © {new Date().getFullYear()} Disney and its related entities. All
            Rights Reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
