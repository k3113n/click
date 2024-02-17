import { createSlice } from '@reduxjs/toolkit';

const KeycapTxtColorSlice = createSlice({
    name: 'txt',
    initialState: { value: '#000000' },
    reducers: {
        setKeycapTxtColor: (state, action) => { state.value = action.payload },
    },
});

export const { setKeycapTxtColor } = KeycapTxtColorSlice.actions;
export default KeycapTxtColorSlice.reducer;