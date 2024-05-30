import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  isLogged : false,

}


const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    _setUser: (state, action) => {
        state.user = action.payload
    },
    _removeUser: state => {
        state.user = false
    },
    _setIsLogged : state => {
        state.isLogged = !state.isLogged;
    }
  },

})

export const { _removeUser, _setUser,_setIsLogged } = auth.actions
export default auth.reducer