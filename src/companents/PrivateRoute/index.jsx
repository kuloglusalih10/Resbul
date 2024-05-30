import React from 'react'
import { isLogin } from '../../stores/auth/hooks'
import { Navigate } from 'react-router-dom';

const index = ({children}) => isLogin() ? children : <Navigate to="/login"  replace/>;

export default index