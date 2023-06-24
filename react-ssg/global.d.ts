export {};

declare global {
    interface Window {
        __initialState?: {
            userName: string;
        };
    }
}
