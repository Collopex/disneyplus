'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { AvatarContext } from '../context/AvatarContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Loader } from '@/public/icons';

const AddProfileClient = () => {
  const { avatarPreference } = useContext(AvatarContext);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      image: avatarPreference,
      ageRestriction: false,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setLoadingForm(true);
    axios
      .post('/api/profiles', data)
      .then(() => {
        router.push('/select-profile');
        reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loader height={100} />
      ) : (
        <main className='bg-[#1a1d29] h-screen fixed w-full top-0 min-h-[calc(100vh-250px)] overflow-y-auto '>
          <nav className='flex justify-between items-center z-10 md:h-[72px] px-[38px] '>
            <div>
              <Link href='/home'>
                <Image
                  className=' w-auto h-[40px] inline-block'
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
              <button className='uppercase outline-none font-bold bg-[#40424a] hover:bg-[#474a53] transition-[background-color_.2s_ease-in-out] text-[#f9f9f9] text-[15px] leading-[1.6] tracking-[1px] px-6 py-0 cursor-pointer h-12 rounded'>
                Cancel
              </button>
            </div>
          </nav>
          <section>
            <form className='max-w-[800px] mx-auto'>
              <div className='flex justify-center min-h-[615px] pt-[calc(55px)]'>
                <div className='flex flex-row-reverse'>
                  <div className='max-w-[288px] '>
                    <div className='ml-[75px] -mt-4'>
                      <div className='block relative '>
                        <div className='m-[18px] flex items-center flex-col p-0 opacity-100'>
                          <Link href='/select-avatar'>
                            <div className='md:w-[214px] md:h-[214px] relative avatar-hov hover:scale-[1.05] hover:duration-[250ms] cursor-pointer'>
                              <Image
                                className='block m-auto cursor-pointer relative transition-all'
                                priority
                                unoptimized
                                alt='Disney+'
                                width={213}
                                height={213}
                                src={avatarPreference}
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
                      <h2 className='text-[32px] leading-[1.2] tracking-[.11px] text-[#f9f9f9] font-semibold select-none'>
                        Add Profile
                      </h2>
                    </div>
                    <fieldset className='mb-6'>
                      <input
                        type='text'
                        id='name'
                        placeholder='Profile Name'
                        {...register('name', { required: true })}
                        className='placeholder:text-sm text-sm font-medium backdrop-filter h-[54px] m-0 outline-none px-3 py-[9px] w-full rounded-[4px] bg-[#31343e]'
                      />
                    </fieldset>
                    <div className='border-t border-t-[rgba(255,255,255,0.25)] text-[10.5px] font-medium text-[#cacaca] mt-6 pb-6'>
                      <label className='w-full flex flex-nowrap items-center justify-between mt-6 mb-3 p-0 cursor-pointer'>
                        <p className='m-0 text-[#f9f9f9]  text-[14px] leading-[1.5] select-none'>
                          Kid&apos;s profile
                        </p>
                        <div>
                          <input
                            type='checkbox'
                            id='settings-toggle'
                            className='hidden invisible overflow-visible p-0'
                            {...register('ageRestriction')}
                          />
                          <span className='settings-toggle'></span>
                        </div>
                      </label>
                      A profile with curated content and features, and a
                      simplified user interface.
                    </div>
                    <button
                      type='submit'
                      onClick={handleSubmit(onSubmit)}
                      className='h-12 inline-flex items-center justify-center w-full bg-[#0072d2] text-[#f9f9f9] font-bold tracking-wider uppercase border-none rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out] mt-6'
                    >
                      {loadingForm ? (
                        <div className='w-7 h-7'>
                          <Loader />
                        </div>
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </main>
      )}
    </>
  );
};

export default AddProfileClient;
