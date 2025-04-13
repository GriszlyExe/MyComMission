import { Review } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReviewState {
    reviews: Review[];
    pageReviews: Review[];
}

const initialState: ReviewState = {
    reviews: [],
    pageReviews: [],
}

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        setLoggedInUserReviews: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload
        },
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.push(action.payload);
            state.pageReviews.push(action.payload);
        },
        setPageReviews: (state, action: PayloadAction<Review[]>) => {
            state.pageReviews = action.payload;
        },
        clearPageReviews: (state, action) => {
            state.pageReviews = [];
        }
    }
})

export const { addReview, setLoggedInUserReviews, setPageReviews, clearPageReviews } = reviewSlice.actions
export const reviewReducer = reviewSlice.reducer