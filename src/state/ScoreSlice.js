import { createSlice } from '@reduxjs/toolkit';

const ScoreSlice = createSlice({
    name: 'score',
    initialState: { 
        count: 0,
        clicks: []
    },
    reducers: {
        log: ( state ) => { 
            state.count += 1;
            state.clicks.push(Date.now());
        },
        flush: ( state ) => {
            state.clicks = []
        }
    }
});

export const { log, flush } = ScoreSlice.actions;
export default ScoreSlice.reducer;