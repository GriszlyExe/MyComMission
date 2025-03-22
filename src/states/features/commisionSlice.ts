import { Message, ChatRoom, User, Commission } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommissionState = {
    latestComission: Commission | null;
}

const initialState: CommissionState = {
    latestComission: null,
}

const commissionSlice = createSlice({
    name: "commission",
    initialState,
    reducers: {
        setLatestCommission(state, action: PayloadAction<Commission>) {
            state.latestComission = action.payload;
        },
        setState(state, action: PayloadAction<"BRIEF" | "BRIEF_REJECTED" | "PROPOSAL" | "PROPOSAL_REJECTED" | "WORKING" | "FINISHED" | "CANCELLED">) {
            state.latestComission!.state = action.payload;
        },
    },
});

export const {
    setLatestCommission,
    setState,
} = commissionSlice.actions;

export const commissionReducer = commissionSlice.reducer;