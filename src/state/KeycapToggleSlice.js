import { createSlice } from '@reduxjs/toolkit';

const KeycapToggleSlice = createSlice({
    name: 'keycap',
    initialState: { value: true },
    reducers: {
        toggleKeycap: (state) => { state.value = !state.value },
    },
});

export const { toggleKeycap } = KeycapToggleSlice.actions;
export default KeycapToggleSlice.reducer;