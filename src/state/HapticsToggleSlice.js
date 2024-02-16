import { createSlice } from '@reduxjs/toolkit';

const HapticsToggleSlice = createSlice({
    name: 'haptics',
    initialState: { value: true },
    reducers: {
        toggleHaptics: (state) => { state.value = !state.value },
    },
});

export const { toggleHaptics } = HapticsToggleSlice.actions;
export default HapticsToggleSlice.reducer;