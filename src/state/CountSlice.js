import { createSlice } from '@reduxjs/toolkit';

const CountSlice = createSlice({
    name: 'count',
    initialState: { 
        value: 0,
     },
    reducers: {
        set: (state, action) => { state.value = Number(action.payload)||0 > state.value ? action.payload : state.value },
    },
});

export const { set } = CountSlice.actions;
export default CountSlice.reducer;