import { persist } from 'zustand/middleware';
import { create } from 'zustand'
import { User } from '../models/User'


interface AuthState {
    user: null | User;
    setUser: (user: User) => void;
    removeUser: () => void;

    accessToken: null | string;
    setAccessToken: (token: string) => void;
    removeAccessToken: () => void;

    logout: () => void;
}

// const useAuthStore = create<AuthState>((set) => ({
//     user: null,
//     setUser: (user: User) => set((state) => ({ user: user })),
//     removeUser: () => set({ user: null }),
//     accessToken: null,
//     setAccessToken: (token: string) => set((state) => ({ accessToken: token })),
//     removeAccessToken: () => set({ accessToken: null }),

//     logout: () => set({ accessToken: null, user: null }),
// }))

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setUser: (user) => set(() => ({ user })),
            removeUser: () => set(() => ({ user: null })),
            setAccessToken: (token) => set(() => ({ accessToken: token })),
            removeAccessToken: () => set(() => ({ accessToken: null })),
            logout: () => set(() => ({ accessToken: null, user: null })),
        }),
        {
            name: 'auth-storage', // Name of the item in local storage
            getStorage: () => localStorage, // Specify that we are using local storage
        }
    )
);

export default useAuthStore;
