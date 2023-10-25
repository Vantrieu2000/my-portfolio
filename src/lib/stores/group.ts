import { create } from 'zustand';

type GroupState = {
    selectedGroups: string[];
    setSelectedGroups: (groups: string[]) => void;
};
export const groupStore = create<GroupState>((set) => ({
    selectedGroups: [],
    setSelectedGroups: (groups: string[]) => set({ selectedGroups: groups }),
}));
