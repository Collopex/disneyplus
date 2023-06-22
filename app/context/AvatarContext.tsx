'use client';

import React, { createContext, useEffect, useState } from 'react';

type AvatarContextProps = {
  avatarPreference: string;
  setAvatarPreference: (image: string) => void;
};

export const AvatarContext = createContext<AvatarContextProps>({
  avatarPreference: '',
  setAvatarPreference: () => {},
});

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [avatarPreference, setAvatarPreference] = useState('');

  useEffect(() => {
    // Retrieve the avatar preference from localStorage if there is one
    const storedPreference = localStorage.getItem('avatarPreference');
    if (storedPreference) {
      setAvatarPreference(storedPreference);
    }
  }, []);

  const updateAvatarPreference = (image: string) => {
    // Update the state and store the avatar preference in localStorage
    setAvatarPreference(image);
    localStorage.setItem('avatarPreference', image);
  };

  return (
    <AvatarContext.Provider
      value={{ avatarPreference, setAvatarPreference: updateAvatarPreference }}
    >
      {children}
    </AvatarContext.Provider>
  );
};
