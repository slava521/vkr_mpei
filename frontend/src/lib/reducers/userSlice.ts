import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        access: '',
        refresh: ''
    },
    reducers: {
        setTokens: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },
        setAccessToken: (state, action) => {
            state.access = action.payload.access;
        }
    },
});

export const {setTokens, setAccessToken} = userSlice.actions;
export default userSlice.reducer;
