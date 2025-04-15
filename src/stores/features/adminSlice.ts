import { Admin } from '@/common/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    admin: Admin | null
}

const initialState: AdminState = {
    admin: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<any>) => {
            state.admin = action.payload;
        },
        clearAdmin: (state) => {
            state.admin = null;
        },
    },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;