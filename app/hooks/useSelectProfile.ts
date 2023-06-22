import { create } from 'zustand';

interface SelectProfileState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const useSelectProfile = create<SelectProfileState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useSelectProfile;
