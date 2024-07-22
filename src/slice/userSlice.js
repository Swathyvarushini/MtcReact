import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        removeUser: (state) => {
            state.user = false;
        },
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
