import { createSlice } from '@reduxjs/toolkit';

const customVoiceSlice = createSlice({
  name: "customvoice",
  initialState: "677c62064f64db5caf4189c4",
  reducers: {
    setCustomVoice(state, action){
      return action.payload;
    },
  }
})

export const {setCustomVoice} = customVoiceSlice.actions;

export default customVoiceSlice.reducer;