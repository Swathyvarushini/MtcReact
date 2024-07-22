import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import profileReducer from '../slice/profileSlice';

const store = configureStore({
    reducer: {
        userInfo: userReducer,
        profile: profileReducer,
    },
});

export default store;
