import {configureStore} from '@reduxjs/toolkit';
import {homeInfoSlice} from './slices/homeInfo.slice';
import {eventsSlice} from './slices/events.slice';
import { userSlice } from './slices/user.slice';
import { usersSlice } from './slices/users.slice';

export const store = configureStore({
    reducer:{
        data: homeInfoSlice.reducer,
        events: eventsSlice.reducer,
        user: userSlice.reducer,
        users: usersSlice.reducer
    }
})