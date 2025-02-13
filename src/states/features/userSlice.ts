import { User } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    user: User | null
};

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => initialState,
        toggle2Fa: (state) => {
            state.user!.enabled2FA = !(state.user!.enabled2FA);
        }
    },
});

export const { setUser, clearUser, toggle2Fa } = userSlice.actions;
export const userReducer = userSlice.reducer;
