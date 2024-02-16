import { createSlice } from '@reduxjs/toolkit';

const LedToggleSlice = createSlice({
    name: 'led',
    initialState: { value: false },
    reducers: {
        toggleLed: (state) => { state.value = !state.value },
    },
});

export const { toggleLed } = LedToggleSlice.actions;
export default LedToggleSlice.reducer;