'use client';

import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import useProfiles from '@/app/hooks/useProfile';
import { Profile } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import DeleteModal from '@/app/components/Modal/DeleteModal';
import useDeleteModal from '@/app/hooks/useDeleteModal';
import { Info, Loader, RightChevron } from '@/public/icons';

const EditProfileDynClient = () => {
  const pathname = useParams();
  const profileId = pathname.profileId;
  const router = useRouter();

  const { data, error, mutate, updateProfile } = useProfiles();
  const deleteModal = useDeleteModal();
  const [updatedName, setUpdatedName] = useState('');

  const { handleSubmit, reset } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    router.push('/edit-profiles');
    try {
      const nameToUpdate = updatedName || data.name;
      const savedName = nameToUpdate;
      await updateProfile(profileId, { name: savedName });
      mutate();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      deleteModal.onOpen();
    },
    [deleteModal]
  );
  const handleDoneClick = () => {
    handleSubmit(onSubmit)();
  };

  if (!data) {
    return <Loader height={100} />;
  }

  if (error && error.response) {
    return (
      <div className='flex items-center justify-center h-screen text-[#f9f9f9] font-medium text-center'>
        We encountered an error while communicating with database. Please try
        again later thank you for your understanding.{' '}
        <Link href='/login'>click here.</Link>
      </div>
    );
  }

  return (
    <>
      <main className='bg-[#1a1d29] h-screen fixed w-full top-0 min-h-[calc(100vh-250px)] overflow-y-auto '>
        <nav className='flex justify-between items-center z-10 md:h-[72px] px-[38px]'>
          <div>
            <Link href='/home'>
              <Image
                className='w-auto h-[40px] inline-block'
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
            <button
              type='button'
              onClick={handleDoneClick}
              className='uppercase outline-none font-bold bg-[#40424a] hover:bg-[#474a53] transition-[background-color_.2s_ease-in-out] text-[#f9f9f9] text-[15px] leading-[1.6] tracking-[1px] px-6 py-0 cursor-pointer h-12 rounded'
            >
              Done
            </button>
          </div>
        </nav>
        <section className='max-w-[800px] mt-[102px] mx-auto mb-[100px]'>
          {data.map(({ id, image, name }: Profile, index: number) => (
            <div key={id}>
              {profileId === id ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id='editProfile'
                  className='max-w-[800px] mx-auto'
                >
                  <div className='flex justify-center '>
                    <div className='flex flex-row-reverse'>
                      <div className='max-w-[288px] '>
                        <div className='ml-[75px] mt-[120px]'>
                          <div className='block relative '>
                            <div className='m-[18px] flex items-center flex-col p-0 opacity-100'>
                              <Link href='/select-avatar'>
                                <div className='md:w-[214px] md:h-[214px] relative avatar-hov hover:scale-[1.05] hover:duration-[250ms] cursor-pointer'>
                                  <Image
                                    className='block m-auto cursor-pointer relative transition-all '
                                    priority
                                    unoptimized
                                    alt='Disney+'
                                    width={213}
                                    height={213}
                                    src={image as string}
                                  />
                                  <Image
                                    className='block absolute -bottom-[4px] -right-[4px] '
                                    priority
                                    unoptimized
                                    alt='Disney+'
                                    width={64}
                                    height={64}
                                    src='https://static-assets.bamgrid.com/product/disneyplus/images/edit.0a8445c2cff0e80361b2e66906aaeca0.svg'
                                  />
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='max-w-[450px]'>
                        <div className='w-[400px] text-left mb-6'>
                          <h2 className='text-[32px] leading-[1.2] tracking-[.11px] text-[#f9f9f9] font-semibold select-none mb-3'>
                            Edit Profile
                          </h2>

                          {index === 0 && (
                            <p className='text-[#cacaca] text-[15px] leading-[1.6] tracking-[-.1px] font-medium select-none'>
                              This is your primary profile. It cannot be deleted
                              or set to a Kids profile.
                            </p>
                          )}
                        </div>
                        <fieldset className='mb-6 max-w-[400px]'>
                          <input
                            type='text'
                            id='name'
                            autoComplete={name as string}
                            defaultValue={name as string}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className='inline-block placeholder:text-[#f9f9f9] placeholder:text-sm text-sm font-medium backdrop-filter h-[54px] m-0 outline-none px-3 py-[9px] w-full rounded-[4px] bg-[#31343e]'
                          />
                        </fieldset>

                        {/* Playback and Language settings */}
                        <div className='border rounded-[4px] border-[rgb(49,52,62)] flex flex-nowrap flex-col mb-8 max-w-[400px]'>
                          <div className='bg-[#31343e] py-1 px-4 block'>
                            <p className='overflow-hidden whitespace-nowrap m-0 text-[#a8a9ad] text-[14px] leading-[1.6] font-medium select-none'>
                              Playback and language settings
                            </p>
                          </div>
                          <div className='border-b border-[rgb(49,52,62)] bg-transparent min-h-[56px] block py-4 px-3'>
                            <label className='w-full flex flex-nowrap items-center justify-between mb-2 p-0 cursor-pointer'>
                              <p className='m-0 text-[#f9f9f9] font-medium text-[14px] leading-[1.5] select-none'>
                                Autoplay
                              </p>
                              <div>
                                <input
                                  id='autoplay'
                                  type='checkbox'
                                  className='hidden invisible overflow-visible p-0'
                                />
                                <span className='settings-toggle'></span>
                              </div>
                            </label>
                            <div className='text-[11px] font-medium leading-[1.5] text-left text-[#cacaca] select-none'>
                              Enabling Autoplay means the next video in a series
                              will play automatically.
                            </div>
                          </div>
                          <div className='border-b border-[rgb(49,52,62)] max-w-[400px] bg-transparent min-h-[56px] block py-4 px-3'>
                            <label className='w-full flex flex-nowrap items-center justify-between mb-2 p-0 cursor-pointer'>
                              <p className='m-0 text-[#f9f9f9] font-medium text-[14px] leading-[1.5] select-none'>
                                Background video
                              </p>
                              <div>
                                <input
                                  id='background-video'
                                  type='checkbox'
                                  className='hidden invisible overflow-visible p-0'
                                />
                                <span className='settings-toggle'></span>
                              </div>
                            </label>
                            <div className='text-[11px] font-medium leading-[1.5] text-left text-[#cacaca] select-none'>
                              Enabling background videos means videos will play
                              in the background of landing pages throughout the
                              app.
                            </div>
                          </div>
                          <div className='border-b border-[rgb(49,52,62)] bg-transparent min-h-[56px] block py-4 px-3'>
                            <label className='w-full flex flex-nowrap items-center justify-between mb-2 p-0 '>
                              <p className='m-0 text-[#f9f9f9] font-medium text-[14px] leading-[1.5] select-none'>
                                App Language
                              </p>
                              <div className='text-[rgb(202,202,202)] text-[14px] leading-[1.53] font-medium'>
                                English (US)
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Feature settings */}
                        <div className='border rounded-[4px] border-[rgb(49,52,62)] max-w-[400px] flex flex-nowrap flex-col mb-8'>
                          <div className='bg-[#31343e] py-1 px-4 block'>
                            <p className='overflow-hidden whitespace-nowrap m-0 text-[#a8a9ad] text-[14px] leading-[1.6] font-medium select-none'>
                              Feature settings
                            </p>
                          </div>
                          <div className='border-b border-[rgb(49,52,62)] bg-transparent min-h-[56px] block py-4 px-3'>
                            <label className='w-full flex flex-nowrap items-center justify-between mb-2 p-0 cursor-pointer'>
                              <p className='m-0 text-[#f9f9f9] font-medium text-[14px] leading-[1.5] select-none'>
                                GroupWatch
                              </p>
                              <div>
                                <input
                                  type='checkbox'
                                  id='groupWatch'
                                  className='hidden invisible overflow-visible p-0'
                                />
                                <span className='settings-toggle'></span>
                              </div>
                            </label>
                            <div className='text-[11px] font-medium leading-[1.5] text-left text-[#cacaca] select-none'>
                              Watch with family and personal friends who are in
                              different places.
                            </div>

                            <Link href='https://help.disneyplus.com/csp'>
                              <div className='flex items-center justify-center w-6 h-6 border-2 border-[#f9f9f9] rounded-full scale-75 hover:scale-[.90] transition-all cursor-pointer'>
                                <div className='w-3 h-3'>
                                  <Info />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Parental settings */}
                        <div className='border rounded-[4px] border-[rgb(49,52,62)] flex flex-nowrap flex-col mb-8'>
                          <div className='bg-[#31343e] py-1 px-4 block'>
                            <p className='overflow-hidden whitespace-nowrap m-0 text-[#a8a9ad] text-[14px] leading-[1.6] font-medium select-none'>
                              Parental Controls
                            </p>
                          </div>
                          <div className='border-b border-[rgb(49,52,62)] bg-transparent min-h-[56px] block py-4 px-3 group'>
                            <label className='w-full flex flex-nowrap items-center justify-between mb-2 p-0 cursor-pointer'>
                              <p className='m-0 text-[#f9f9f9] font-medium text-[14px] leading-[1.5] select-none'>
                                Content Rating
                              </p>
                              <div className='h-6 w-6 fill-white opacity-60 transition-opacity  group-hover:opacity-100'>
                                <RightChevron />
                              </div>
                            </label>
                            <div className='text-[11px] font-medium leading-[1.5] text-left text-[#cacaca] select-none'>
                              Titles rated 18+ and below are available to watch.
                            </div>
                          </div>
                          <div className='border-b border-[rgb(49,52,62)] bg-transparent min-h-[56px] block py-4 px-3 group'>
                            <label className='w-full flex flex-nowrap items-center justify-between mb-2 p-0 cursor-pointer'>
                              <p className='m-0 text-[#f9f9f9] font-medium text-[14px] leading-[1.5] select-none'>
                                Profile PIN
                              </p>
                              <div className='flex items-center justify-center gap-3'>
                                <div className='m-0 text-[#cacaca] font-medium text-[15px] leading-[1.6] tracking-[-.1px]'>
                                  Off
                                </div>
                                <div className='h-6 w-6 fill-white opacity-60 transition-opacity group-hover:opacity-100'>
                                  <RightChevron />
                                </div>
                              </div>
                            </label>
                            <div className='text-[11px] font-medium leading-[1.5] text-left text-[#cacaca] select-none'>
                              Limit access to your profile with a 4-digit PIN.
                            </div>
                          </div>
                        </div>
                        {index === 0 ? (
                          ''
                        ) : (
                          <button
                            onClick={toggle}
                            id='delete-profile'
                            className='text-[#67bdff] text-center mt-9 w-full text-[15px] font-medium leading-[1.6] tracking-[-0.1px]'
                          >
                            Delete Profile
                          </button>
                        )}
                      </div>
                      {deleteModal.isOpen ? (
                        <DeleteModal
                          profileId={profileId}
                          onClose={deleteModal.onClose}
                          name={name as string}
                          primaryAction='DELETE'
                          secondaryAction='CANCEL'
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </form>
              ) : (
                ''
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default EditProfileDynClient;
