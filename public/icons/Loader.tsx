import Image from 'next/image';
import React from 'react';

type LoaderProps = {
  height?: number;
};

const Loader = ({ height }: LoaderProps) => {
  return (
    <div
      className='flex items-center justify-center'
      style={{
        height: `${height}vh`,
      }}
    >
      <Image
        id='loading'
        priority
        unoptimized
        alt='Disney+'
        width={72}
        height={72}
        src='https://i.imgur.com/iiHsWax.png'
      />
    </div>
  );
};

export default Loader;
