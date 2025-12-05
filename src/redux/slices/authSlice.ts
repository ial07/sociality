import { AuthState } from "@/types/Auth.type";
import { Author } from "@/types/Profile.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Helper untuk mengambil token (sudah ada)
const getInitialToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("authToken");
    }
    return null;
};

// Helper BARU untuk mengambil object user dan mem-parsing-nya
const getInitialUser = (): Author | null => {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (error) {
                console.error("Error parsing user data from local storage", error);
                return null;
            }
        }
    }
    return null;
};

const initialState: AuthState = {
    token: getInitialToken(),
    user: getInitialUser(), // <--- Ubah dari null menjadi fungsi ini
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: Author }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user)); 
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user"); // Hapus user juga saat logout
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

// Selector helper (opsional, tapi mempermudah)
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;