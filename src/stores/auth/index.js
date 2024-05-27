import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: false,
  isLogged : false,
  status: 'pending'
}

export const _login = createAsyncThunk(
    'auth/_login',
    async (_data,{rejectWithValue})=>{

        console.log('okey func');

        try{

            let data = JSON.stringify({
                "email": _data['email'],
                "password": _data['password'],
                "table": _data['table']
            });

            let config = {
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/login.php`,
                headers:{
                    'Content-Type': 'application/json', 
                },
                data : data
            };
            
            
            const response  = await axios.request(config);

            console.log('asyncthunk : ',response.data);


            if(response.data){

                
                return (response.data);

            }
            else{

                return rejectWithValue('reject hata');
            } 
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)

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
  extraReducers : (builder)=> {

    builder.addCase(

        _login.fulfilled , (state , action) => {

            state.isLogged = true;
            state.user = action.payload;
            state.status = 'fulFilled'
        }

    ),
    builder.addCase(
        _login.pending, (state,action)=>{
            state.status = 'pending'
        }
    ),

    builder.addCase(

        _login.rejected , (state , action) => {
            state.status = 'rejected';
            state.isLogged = false;
        }

    )

  }
})

export const { _removeUser, _setUser,_setIsLogged } = auth.actions
export default auth.reducer