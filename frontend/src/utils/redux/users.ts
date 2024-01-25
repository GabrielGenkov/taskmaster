import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

export interface UsersSliceState {
    user: User | null;
    colorMode: "light" | "dark";
}

const initialState: UsersSliceState = {
    user: null,
    colorMode: "dark"
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setColorMode: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.colorMode = action.payload;
        },
    },
});

export const { setUser, setColorMode } = usersSlice.actions;
export default usersSlice.reducer;
