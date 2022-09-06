import React, { createContext, useReducer, useState } from 'react';


const initialState = {
    user: null
}

export const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { },
    gitToken: null,
    gitHubLogin: (token) => { }
});

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [gitToken, setGitToken] = useState('');

    const login = (userData) => {
        localStorage.setItem('jwtToken', userData.token);
        localStorage.setItem('username', userData.username);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    const gitHubLogin = (token) => {
        if (token) {
            localStorage.setItem('gitToken', token);
            setGitToken(token);
        }
    }

    const logout = () => {
        localStorage.clear();
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider
            value={{ user: state, login, logout, gitToken, gitHubLogin }}
            {...props}
        ></AuthContext.Provider>



    )
}
