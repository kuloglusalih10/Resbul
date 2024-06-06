import React from 'react'
import { useToken } from '../../stores/auth/hooks'
import { Navigate } from 'react-router-dom';
import { isExpired } from 'react-jwt';




const index = ({children}) => isExpired(useToken()) ?   <Navigate to="/login"  replace/> : children;

export default index