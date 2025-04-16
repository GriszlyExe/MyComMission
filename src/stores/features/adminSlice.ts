import { Admin, Report, User } from '@/common/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    admin: Admin | null;
    totalReportsPage: number;
    totalUsersPage: number;
    paginatedReports: Report[];
    paginatedUsers: User[];
}

const initialState: AdminState = {
    admin: null,
    totalReportsPage: 0,
    totalUsersPage: 0,
    paginatedReports: [],
    paginatedUsers: [],
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
        updateTotalReportsPage: (state, action: PayloadAction<number>) => {
            state.totalReportsPage = action.payload;
        },
        updateTotalUsersPage: (state, action: PayloadAction<number>) => {
            state.totalUsersPage = action.payload;
        },
        setPaginatedReports: (state, action: PayloadAction<Report[]>) => {
            state.paginatedReports = action.payload;
        },
        setPaginatedUsers: (state, action: PayloadAction<User[]>) => {
            state.paginatedUsers = action.payload;
        },
        updateBanFlag: (state, action: PayloadAction<{ userId: string; banFlag: boolean }>) => {
            const { userId, banFlag } = action.payload;
            const userIndex = state.paginatedUsers.findIndex(user => user.userId === userId);
            if (userIndex !== -1) {
                state.paginatedUsers[userIndex].banFlag = banFlag;
            }
        },
    },
});

export const { 
    setAdmin,
    clearAdmin,
    updateTotalReportsPage,
    updateTotalUsersPage,
    setPaginatedReports,
    setPaginatedUsers,
    updateBanFlag,
} = adminSlice.actions;
export const adminReducer = adminSlice.reducer;