import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../Config';

export const fetchProfileInfo = createAsyncThunk(
    'profile/fetchProfileInfo',
    async (staffNumber, thunkAPI) => {
        try {
            const response = await axios.get(`${CONFIG.URL}/admins/viewStaff`, {
                params: { staffNumber}, 
                headers: {
                    'barrer ': `${localStorage.getItem('token')}`,
                },
            });
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
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
                const { staffNumber, staffName, role } = action.payload;
                state.staffNumber = staffNumber || '';
                state.staffName = staffName || '';
                state.role = role || '';
                state.error = null;
            })
            .addCase(fetchProfileInfo.rejected, (state, action) => {
                console.log('Profile Info Rejected:', action.payload);
                state.error = action.payload || 'Failed to fetch profile information.';
            });
    },
});

export default profileSlice.reducer;
