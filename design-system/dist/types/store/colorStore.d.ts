interface ColorState {
    color: string;
    setColor: (newColor: string) => void;
}
declare const useColorStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ColorState>>;
export default useColorStore;
