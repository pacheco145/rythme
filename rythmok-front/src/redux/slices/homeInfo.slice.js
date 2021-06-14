import {artistsFunction, stylesFunction, hallsFunction} from '../../api/home.api'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    artists: '',
    styles: '',
    halls: '',
}

export const getHomeInfo = createAsyncThunk('home', async () => {
    return {
        artists: await artistsFunction(),
        styles: await stylesFunction(),
        halls: await hallsFunction(),
    }
})

export const homeInfoSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomeInfo.fulfilled, (state, action) => {
                // console.log(action)
                const {artists, styles, halls} = action.payload
                state.artists = artists;
                state.halls = halls;
                state.styles = styles;
            })
    }
})

