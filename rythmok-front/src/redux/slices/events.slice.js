import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEvents } from '../../api/events.api'

const initialState = {
    events: ''
}

export const getEventsAsync = createAsyncThunk(
   'events/getEvents',
   async() => {
       const response = await getEvents()
    //    console.log('from slice',response)
       return response
   }
)

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEventsAsync.fulfilled, (state, action) => {
                state.events = action.payload
                // console.log('from builder', state)
            })
    }

})
