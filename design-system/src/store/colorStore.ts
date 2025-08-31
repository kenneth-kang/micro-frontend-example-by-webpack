import { create } from 'zustand';

interface ColorState {
    color: string;
    setColor: (newColor: string) => void;
}

const useColorStore = create<ColorState>((set) => ({
    color: '#ffffff',
    setColor: (newColor: string) => set({ color: newColor }),
}));

export default useColorStore;
