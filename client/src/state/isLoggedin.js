import { create } from 'zustand';
import {persist} from 'zustand/middleware'
export const useGenerationStore = create(persist((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}),
{
  name:'login'
}));
