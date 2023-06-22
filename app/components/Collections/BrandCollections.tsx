'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const BrandCollections = () => {
  const router = useRouter();
  return (
    <section className='block relative pb-[26px] pt-0 px-[calc(3.5vw+24px)] z-50'>
      <div className='flex justify-start content-center flex-wrap mt-0 mb-0 mr-0 -ml-5'>
        {/* Disney */}
        <div className='w-[calc(20%-20px)] flex-grow-0 flex-shrink-0 basis-auto mt-5 ml-5 mb-0 mr-0'>
          <div
            onClick={() => router.push('/brand/disney')}
            className='group cursor-pointer overflow-hidden block relative w-full h-full scale-100 hover:scale-[1.05] transition-all rounded-[10px] brand-collection brand-container'
          >
            <Image
              draggable={false}
              className='block  w-full h-full object-cover opacity-100 '
              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FFA0BEBAC1406D88929497501C84019EBBA1B018D3F7C4C3C829F1810A24AD6E/scale?width=400&aspectRatio=1.78&format=png'
              alt='Disney'
              width={320}
              height={240}
            />
            <video
              className='absolute top-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 z-[-10]'
              playsInline
              loop
              autoPlay
              muted
            >
              <source src='https://vod-bgc-eu-west-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/01/1564674844-disney.mp4' />
            </video>
          </div>
        </div>
        {/* Pixar */}
        <div className='w-[calc(20%-20px)] flex-grow-0 flex-shrink-0 basis-auto mt-5 ml-5 mb-0 mr-0'>
          <div
            onClick={() => router.push('/brand/pixar')}
            className='group cursor-pointer overflow-hidden block relative w-full h-full scale-100 hover:scale-[1.05] transition-all rounded-[10px] brand-collection brand-container'
          >
            <Image
              draggable={false}
              className='block  w-full h-full object-cover opacity-100 '
              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7F4E1A299763030A0A8527227AD2812C049CE3E02822F7EDEFCFA1CFB703DDA5/scale?width=400&aspectRatio=1.78&format=png'
              alt='Pixar'
              width={320}
              height={240}
            />
            <video
              className='absolute top-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 z-[-10]'
              playsInline
              loop
              autoPlay
              muted
            >
              <source src='https://vod-bgc-eu-west-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/01/1564676714-pixar.mp4' />
            </video>
          </div>
        </div>
        {/* Marvel */}
        <div className='w-[calc(20%-20px)] flex-grow-0 flex-shrink-0 basis-auto mt-5 ml-5 mb-0 mr-0'>
          <div
            onClick={() => router.push('/brand/marvel')}
            className='group cursor-pointer overflow-hidden block relative w-full h-full scale-100 hover:scale-[1.05] transition-all rounded-[10px] brand-collection brand-container'
          >
            <Image
              draggable={false}
              className='block  w-full h-full object-cover opacity-100 '
              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C90088DCAB7EA558159C0A79E4839D46B5302B5521BAB1F76D2E807D9E2C6D9A/scale?width=400&aspectRatio=1.78&format=png'
              alt='Marvel'
              width={320}
              height={240}
            />
            <video
              className='absolute top-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 z-[-10]'
              playsInline
              loop
              autoPlay
              muted
            >
              <source src='https://vod-bgc-eu-west-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/01/1564676115-marvel.mp4' />
            </video>
          </div>
        </div>
        {/* Star Wars */}
        <div className='w-[calc(20%-20px)] flex-grow-0 flex-shrink-0 basis-auto mt-5 ml-5 mb-0 mr-0'>
          <div
            onClick={() => router.push('/brand/star-wars')}
            className='group cursor-pointer overflow-hidden block relative w-full h-full scale-100 hover:scale-[1.05] transition-all rounded-[10px] brand-collection brand-container'
          >
            <Image
              draggable={false}
              className='block  w-full h-full object-cover opacity-100 '
              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5A9416D67DC9595496B2666087596EE64DE379272051BB854157C0D938BE2C26/scale?width=400&aspectRatio=1.78&format=png'
              alt='Star Wars'
              width={320}
              height={240}
            />
            <video
              className='absolute top-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 z-[-10]'
              playsInline
              loop
              autoPlay
              muted
            >
              <source src='https://vod-bgc-eu-west-1.media.dssott.com/bgui/ps01/disney/bgui/2020/12/17/1608229455-star-wars.mp4' />
            </video>
          </div>
        </div>
        {/* National Geographic */}
        <div className='w-[calc(20%-20px)] flex-grow-0 flex-shrink-0 basis-auto mt-5 ml-5 mb-0 mr-0'>
          <div
            onClick={() => router.push('/brand/national-geographic')}
            className='group cursor-pointer overflow-hidden block relative w-full h-full scale-100 hover:scale-[1.05] transition-all rounded-[10px] brand-collection brand-container'
          >
            <Image
              draggable={false}
              className='block w-full h-full object-cover opacity-100 '
              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/2EF24AA0A1E648E6D1A3B26491F516632137ED87AB22969D153316F8BD670FB5/scale?width=400&aspectRatio=1.78&format=png'
              alt='National Geographic'
              width={320}
              height={240}
            />
            <video
              className='absolute top-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 z-[-10]'
              playsInline
              loop
              autoPlay
              muted
            >
              <source src='https://vod-bgc-eu-west-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/01/1564676296-national-geographic.mp4' />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCollections;
