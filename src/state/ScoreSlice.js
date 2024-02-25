import { createSlice } from '@reduxjs/toolkit';

const ScoreSlice = createSlice({
    name: 'score',
    initialState: { 
        count: 0
    },
    reducers: {
        log: ( state ) => { 
            state.count += 1;
            console.log(state.count);
        },
    }
});

export const { log } = ScoreSlice.actions;
export default ScoreSlice.reducer;