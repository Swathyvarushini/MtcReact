import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../Config';

export const fetchProfileInfo = createAsyncThunk(
    'profile/fetchProfileInfo',
    async (staffNumber, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${CONFIG.URL}/admins/viewStaffById/${staffNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('profileSlice', response.data);
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
        designation: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.staffNumber = action.payload.staffNumberPojo;
                state.staffName = action.payload.staffNamePojo;
                state.designation = action.payload.staffDesignationPojo;
                state.error = null;
            })
            .addCase(fetchProfileInfo.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;
