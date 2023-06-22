'use client';

import React, { useState } from 'react';
import useProfiles from '../../hooks/useProfile';
import { useRouter } from 'next/navigation';
import Loader from '@/public/icons/Loader';

type ModalProps = {
  name?: string;
  profileId?: string;
  onClose: () => void;
  primaryAction: string;
  secondaryAction: string;
};

const DeleteModal = ({
  name,
  profileId,
  onClose,
  primaryAction,
  secondaryAction,
}: ModalProps) => {
  const { deleteProfile, mutate } = useProfiles();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    <Loader height={100} />;
    try {
      await deleteProfile(profileId as string);
      mutate();
      onClose();
      router.push('/select-profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-[rgba(49,51,71,0.85)] fixed flex justify-center items-center top-0 left-0 h-screen w-screen m-0 z-10'>
      <div className='max-w-[560px] py-6 px-7 m-7 text-[#f9f9f9]  rounded-[4px] z-20 bg-[#1d202f]'>
        <h4 className='text-[20px] leading-[1.4] tracking-[.11px] font-semibold pb-2 select-none '>
          Delete {name}&apos;s profile?
        </h4>
        <p className='m-0 pb-8 text-[13.3px] leading-[1.6] tracking-[-.1px] text-[#cacaca] font-medium'>
          Profile history, watchlist and activity will be deleted. This will be
          permanent.
        </p>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='mt-0 w-auto ml-2 h-[40px] min-w-[112px] bg-white font-semibold text-[15px] text-black leading-[1.6] tracking-[.5px] rounded-sm hover:bg-[#e9eeee]'
          >
            {secondaryAction}
          </button>

          <button
            onClick={handleDelete}
            className='mt-0 w-auto ml-2 h-[40px] min-w-[112px] bg-[#0072d2] font-semibold text-[15px] leading-[1.6] tracking-[.5px] rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out]'
          >
            {primaryAction}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
