import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem('user') || false,
  isLogged : localStorage.getItem('isLogged') ? true : false,
}


const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    _setUser: (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload))
    },
    _removeUser: state => {
        state.user = false
    },
    _setIsLogged : (state, action) => {
        state.isLogged = action.payload;
        localStorage.setItem('isLogged', JSON.stringify(action.payload))
    },
    _logout : (state)=>{
      state.isLogged = false;
      localStorage.clear();
    }
  },

})

export const { _removeUser, _setUser,_setIsLogged, _logout } = auth.actions
export default auth.reducer