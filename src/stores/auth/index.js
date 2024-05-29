import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify"


const initialState = {
  user: false,
  isLogged : false,
  status: '',
  message: '',
  isRegister : false,
  isMailSend: false,
  mailStatus : '',
}


export const _login = createAsyncThunk(
    'auth/_login',
    async (_data,{rejectWithValue})=>{


        try{

            let data = JSON.stringify({
                "email": _data['email'],
                "password": _data['password'],
                "isAdmin": _data['isAdmin'],
                "isGoogle" : _data['isGoogle']
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

            return (response.data);

            
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const _register = createAsyncThunk(
    'auth/_register',
    async (_data,{rejectWithValue})=>{

        console.log(_data);


        try{

            let data = JSON.stringify({
                "name" : _data['name'],
                "surname" : _data['surname'],
                "email": _data['email'],
                "password": _data['password'],
                "isAdmin": _data['isAdmin'],
                "isGoogle" : _data['isGoogle']
            });

            let config = {
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/register.php`,
                headers:{
                    'Content-Type': 'application/json', 
                },
                data : data
            };
            
            
            const response  = await axios.request(config);

            console.log(data);
            return (response.data);

            
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const _reset_password = createAsyncThunk(
    'auth/_reset_password',
    async (_data,{rejectWithValue})=>{


        try{

            let data = JSON.stringify({
                "email": _data,
            });

            let config = {
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/send-reset-mail.php`,
                headers:{
                    'Content-Type': 'application/json', 
                },
                data : data
            };
            
            
            const response  = await axios.request(config);

            console.log(response.data);
            return (response.data);

            
        }
        catch(error){
            return rejectWithValue(error.message);
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

            if(action.payload.res){
                
                state.isLogged = true;
                state.user = action.payload;
                toast(action.payload.message, {type: 'success'});
                state.status = 'fulFilled';
                localStorage.setItem('İsLogged', true);

            }else{

                state.isLogged= false;
                state.status ='rejected'
                toast(action.payload.message, {type: 'error'});
            }
        }

    ),
    builder.addCase(
        _login.pending, (state,action)=>{
            state.status = 'pending';
        }
    ),

    builder.addCase(

        _login.rejected , (state , action) => {
            state.status = 'rejected';
            state.isLogged = false;
            toast(action.payload.message, {type: 'error'});
        }

    )

    builder.addCase(

        _register.fulfilled , (state , action) => {

            if(action.payload.res){
                
                state.isRegister = true;
                state.user = action.payload;
                state.status = 'fulFilled'
                toast(action.payload.message, {type: 'success'});

            }else{

                state.isRegister= false;
                state.status ='rejected'
                state.message = action.payload.message;
                toast(action.payload.message, {type: 'error'});
            }
        }

    ),

    builder.addCase(
        _register.pending, (state,action)=>{
            state.status = 'pending'
        }
    ),

    builder.addCase(

        _register.rejected , (state , action) => {
            state.status = 'rejected';
            state.isRegister = false;
            toast(action.payload.message, {type: 'error'});
        }

    ),

    builder.addCase(

        _reset_password.fulfilled , (state , action) => {

            if(action.payload.res){
                
                state.mailStatus = 'fulFilled'
                state.isMailSend = true;
                toast(action.payload.message, {type: 'success'});

            }else{

                state.mailStatus ='rejected'
                toast(action.payload.message, {type: 'error'});
            }
        }

    ),

    builder.addCase(
        _reset_password.pending, (state,action)=>{
            state.mailStatus = 'pending'
        }
    ),

    builder.addCase(

        _reset_password.rejected , (state , action) => {
            state.mailStatus = 'rejected';
            toast("Beklenmedik bir hata oluştu", {type: 'error'});
        }

    )



  }
})

export const { _removeUser, _setUser,_setIsLogged } = auth.actions
export default auth.reducer