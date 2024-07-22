import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../Config';

export const fetchProfileInfo = createAsyncThunk(
    'profile/fetchProfileInfo',
    async (username, thunkAPI) => {
        try {
            const response = await axios.get(`${CONFIG.URL}/admins/viewStaff/${username}`, {
                headers: {
                    'barrer ' : `${localStorage.getItem('token')}`,
                },
            });
            console.log("ResponseData",response.data);
            return response.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        staffNo: '',
        username: '',
        designation: '',
        branch: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.staffNo = action.payload.staffNo;
                state.username = action.payload.username;
                state.designation = action.payload.designation;
                state.branch = action.payload.branch;
                state.error = null;
            })
            .addCase(fetchProfileInfo.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;
