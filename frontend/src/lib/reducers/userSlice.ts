import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        access: '',
        refresh: ''
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload.username;
        },
        setTokens: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        }
    },
});

export const { setUsername, setTokens } = userSlice.actions;
export default userSlice.reducer;