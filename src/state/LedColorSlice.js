import { createSlice } from '@reduxjs/toolkit';

const LedColorSlice = createSlice({
    name: 'rgb',
    initialState: { value: '#00FFFF' },
    reducers: {
        setLedColor: (state, action) => { state.value = action.payload },
    },
});

export const { setLedColor } = LedColorSlice.actions;
export default LedColorSlice.reducer;