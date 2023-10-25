import { create } from 'zustand';

export type TestimonyMode = 'testimony' | 'rating';
type AuthState = {
    testimonyMode: TestimonyMode;
    setTestimonyMode: (mode: TestimonyMode) => void;
};
export const authStore = create<AuthState>((set) => ({
    testimonyMode: 'testimony',
    setTestimonyMode: (mode: TestimonyMode) => set({ testimonyMode: mode }),
}));
