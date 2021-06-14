import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, addFriend } from '../../api/users.api'

const initialState = {
    users: ''
}

export const getUsersAsync = createAsyncThunk(
   'users/getUsers',
   async() => {
       const response = await getUsers()
    //    console.log('from slice',response)
       return response
   }
)

export const addFriendAsync = createAsyncThunk(
   'users/addFriend',
   async(payload) => {
       return {
        response: await addFriend(payload.form),
        cb: payload.cb
    }
   }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(addFriendAsync.fulfilled, (state, action) => {
                const {response, cb} = action.payload;
                state.users = response;
                cb();
            })
    }

})