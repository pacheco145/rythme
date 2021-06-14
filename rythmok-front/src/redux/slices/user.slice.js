// import {} from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {login, logout, register, checkSession} from '../../api/auth.api'

const INITIAL_STATE = {
    user: null,
    error: ''
}

export const registerAsync = createAsyncThunk('auth/register', async (payload) => {
    // console.log(payload)
    return {
        response: await register(payload.form),
        // cb: payload.cb
    }
})

export const loginAsync = createAsyncThunk('auth/login', async (payload) => {
    return {
        response: await login(payload.form),
        // cb: payload.cb
    }
})

export const logoutAsync = createAsyncThunk('auth/logout', async (payload) => {
    return {
        response: await logout(),
        // cb: payload.cb
    }
})

export const checkSessionAsync = createAsyncThunk('auth/checkSession', async () => {
    return await checkSession()
})

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(registerAsync.fulfilled, (state, action) => {
                // console.log('action',action);
                
                const {response} = action.payload;
                if (response.message) state.error = response.message;
                else {
                    state.user = response;
                    state.error = '';
                    // cb();
                }
                // console.log('stateee',state)
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                const {response} = action.payload;
                if (response.message) state.error = response.message;
                else {
                    state.user = response;
                    state.error = '';
                    // cb();
                }
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                // console.log(action.payload)
                const {response} = action.payload;
                state.user = response;
                // cb()
            })
            .addCase(checkSessionAsync.fulfilled, (state, action) => {
                const {message} = action.payload;
                if (!message) state.user = action.payload;
                else state.user = false;
            })
    }
})