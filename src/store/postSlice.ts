import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

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
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
    },
});

export const { setPosts, addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;