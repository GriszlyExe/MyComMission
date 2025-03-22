import { Post } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
    posts: Post[];
    pagePosts: Post[];
}

const initialState: PostState = {
    posts: [],
    pagePosts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setLoggedInUserPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
            state.pagePosts.push(action.payload);
        },
        editUserPost: (state, action: PayloadAction<Post>) => {
            state.posts = state.posts.map((post, idx) => {
                if (post.postId === action.payload.postId) {
                    return action.payload;
                }
                return post;
            })
        },
        editPagePost: (state, action: PayloadAction<Post>) => {
            state.pagePosts = state.pagePosts.map((post, idx) => {
                if (post.postId === action.payload.postId) {
                    return action.payload;
                }
                return post;
            })
        },
        removePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((post) => post.postId !== action.payload);
        },
        setPagePosts: (state, action: PayloadAction<Post[]>) => {
            state.pagePosts = action.payload;
        },
        clearPagePosts: (state, action) => {
            state.pagePosts = [];
        }
    },
});

export const { addPost, removePost, setLoggedInUserPosts, setPagePosts, editUserPost, clearPagePosts, editPagePost } = postSlice.actions;
export const postReducer = postSlice.reducer;
