import Loader from '@/public/icons/Loader';
import React from 'react';

const loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Loader />
    </div>
  );
};

export default loading;
