import { createSlice } from '@reduxjs/toolkit';

const KeycapBgColorSlice = createSlice({
    name: 'bg',
    initialState: { value: '#FFFFFF' },
    reducers: {
        setKeycapBgColor: (state, action) => { state.value = action.payload },
    },
});

export const { setKeycapBgColor } = KeycapBgColorSlice.actions;
export default KeycapBgColorSlice.reducer;