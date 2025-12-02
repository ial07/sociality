import { AuthState } from "@/types/Auth.type";
import { User } from "@/types/Profile.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const getInitialToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("authToken");
    }
    return null;
};

const initialState: AuthState = {
    token: getInitialToken(), 
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: User }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("authToken", action.payload.token); 
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem("authToken");
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer; 