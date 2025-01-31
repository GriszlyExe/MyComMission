import { Post } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
        removePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((post) => post.postId !== action.payload);
        },
    },
});

export const { addPost, removePost } = postSlice.actions;
export const postReducer = postSlice.reducer;
