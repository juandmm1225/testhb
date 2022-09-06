import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authentication'

export const PrivateRoute = ({ children }) => {
    const context = useContext(AuthContext);
    return localStorage.getItem('username') 
     ? children
     : <Navigate to='/' />
}