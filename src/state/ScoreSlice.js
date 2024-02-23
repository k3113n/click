import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            console.log(state.clicks.length +" "+state.count);
        },
        flush: ( state ) => {
            AsyncStorage.setItem('score', JSON.stringify(state))
            .then(() => {
                state.clicks = [];
            })
            .catch(error => {console.log("clogged data: "+error);});
        }
    }
});

export const { log, flush } = ScoreSlice.actions;
export default ScoreSlice.reducer;