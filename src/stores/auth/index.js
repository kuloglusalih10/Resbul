import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token : localStorage.getItem('token') ||  false,
}


const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    _setToken : (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
    },
    _logout : (state)=>{
      localStorage.clear();
      state.token = false;
    }
  },

})

export const { _logout, _setToken } = auth.actions
export default auth.reducer