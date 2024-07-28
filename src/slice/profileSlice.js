import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../Config';

export const fetchProfileInfo = createAsyncThunk(
    'profile/fetchProfileInfo',
    async (staffNumber, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${CONFIG.URL}/profile/${staffNumber}`, {
                headers: {
                    'barrer ': `${token}`,
                },
            });
            console.log('fetchProfileInfo', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        staffNumber: '',
        staffName: '',
        role: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.staffNumber = action.payload.staffNumber;
                state.staffName = action.payload.staffName;
                state.role = action.payload.role;
                state.error = null;
            })
            .addCase(fetchProfileInfo.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;
