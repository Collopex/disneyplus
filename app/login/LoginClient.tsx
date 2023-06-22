'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/public/icons';
import Footer from '../components/Footer/Footer';

const LoginClient = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.replace('/select-profile');
    }
  }, [session?.status, router]);

  const [isLoading, setIsloading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFormAnimation, setPasswordFormAnimation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handlePopstate = () => {
      // Check if the user is navigating back from the password input form
      if (showPasswordForm) {
        setShowPasswordForm(false);
        setPasswordFormAnimation('animate-slide-in');
      }
      // Check if the user is navigating forward from the email input form
      else {
        setShowPasswordForm(true);
        setPasswordFormAnimation('animate-slide-in');
      }
    };

    // Add the popstate event listener
    window.addEventListener('popstate', handlePopstate);

    return () => {
      // Remove the popstate event listener
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [showPasswordForm]);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasswordForm(true);
    setPasswordFormAnimation('animate-slide-in');

    // This allows the user to navigate back to the email input phase by clicking the browser's back button. vice versa for password
    window.history.pushState(null, '', '');
  };

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          setError(callback.error);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const handleErrorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clear the error state
  };

  return (
    <>
      <nav className='flex justify-between items-center z-10 md:h-[72px] px-[38px] bg-[#1a1d29] border-b border-b-[#31343e]'>
        <div>
          <Link href='/auth'>
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
      </nav>
      <main className='block min-h-[calc(100vh-180px)] px-[calc(3.5vw+24px)] overflow-x-auto  bg-[#1a1d29]'>
        <div className='text-[#fff] mx-auto my-8 max-w-[374px] overflow-visible w-full'>
          {!showPasswordForm && (
            <form className={'block'} onSubmit={handleSubmitEmail}>
              <h3 className='text-[24px] leading-[1.2] tracking-[.11px] pb-2 font-medium select-none'>
                Log in with your email
              </h3>
              <div className='pb-6'>
                <span>
                  <p className='text-left m-0 text-[14px] leading-[1.6] tracking-tight select-none'>
                    You will use this email and password to log into your
                    Disney+ account to watch your favourite shows and movies.
                  </p>
                </span>
              </div>
              <fieldset className='mb-6'>
                <input
                  type='email'
                  id='email'
                  {...register('email', { required: true })}
                  placeholder='Email address'
                  className='placeholder:text-sm text-sm font-medium backdrop-filter h-12 m-0 outline-none px-3 py-[9px] w-full rounded-[4px] bg-[#31343e]'
                />
              </fieldset>
              <div className='block'>
                <button
                  type='submit'
                  className='h-12 inline-flex items-center justify-center w-full bg-[#0072d2] text-[#f9f9f9] font-medium uppercase border-none rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out]'
                >
                  Continue
                </button>
              </div>

              <div className='mt-6'>
                <p className='text-[#cacaca] inline-block text-[14px] leading-[1.53] font-medium pr-1'>
                  New to Disney+?
                </p>
                <Link href='/sign-up' className='text-sm font-medium'>
                  Sign up
                </Link>
              </div>
            </form>
          )}
          {showPasswordForm && (
            <form
              className={`block relative  ${passwordFormAnimation}`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className='text-[24px] leading-[1.2] tracking-[.11px] pb-2 font-medium'>
                Enter your password
              </h3>
              <div className='pb-6'>
                <span>
                  <p className='text-left m-0 text-[14px] leading-[1.6] tracking-tight'>
                    You will use this email and password to log into your
                    Disney+ account to watch your favourite shows and movies.
                  </p>
                </span>
              </div>
              <fieldset className='mb-6'>
                <input
                  type='password'
                  id='password'
                  {...register('password', { required: true })}
                  placeholder='Password'
                  onChange={handleErrorInputChange}
                  className={`placeholder:text-sm text-sm font-medium backdrop-filter h-12 m-0 outline-none px-3 py-[9px] w-full rounded-[4px] bg-[#31343e] border border-transparent active:border-[#f9f9f94d] ${
                    error ? 'border-[#ff554c]' : ''
                  }`}
                />
                <p className='text-[10.8px] leading-[1.5] text-[#ff554c] mt-1 mx-1'>
                  {error}
                </p>
                <div className='pt-2 pl-1 text-[12px] leading-[1.5] text-[#cacaca]'>
                  (case sensitive)
                </div>
              </fieldset>
              <div className='block'>
                <button
                  type='submit'
                  className='h-12 inline-flex items-center justify-center w-full bg-[#0072d2] text-[#f9f9f9] font-medium uppercase border-none rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out]'
                >
                  {isLoading ? (
                    <div className='w-7 h-7'>
                      <Loader />
                    </div>
                  ) : (
                    'Log in'
                  )}
                </button>
              </div>

              <div className='mt-6'>
                <p className='text-[#cacaca] inline-block text-[14px] leading-[1.53] font-medium pr-1'>
                  Forgot password?
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginClient;
