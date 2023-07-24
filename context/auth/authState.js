import React, { Children, useEffect, useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    AUTH_USER,
    ERROR_REMOVE,
    ADD_ERROR,
    NOT_AUTHENTICATED,
    LOGOUT_USER
} from '../../types/index'
import apiDiagrams from '../../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthState = props => {

    const initialState = {
        usuario: null,
        errorMessage: "checking",
        token: null,
        status: 'not-authenticated'
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    useEffect(() => {
        checkToken();
    }, [])


    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return dispatch({ type: NOT_AUTHENTICATED });

        const res = await apiDiagrams.get('/auth/validateToken');

        if (res !== 200) return dispatch({ type: NOT_AUTHENTICATED })

        await AsyncStorage.setItem('token', res.data._token);

        dispatch({
            type: "AUTH_USER",
            payload: res.data
        })
    }

    const signIn = async (data) => {
        try {
            const credentials = {
                username: data.username,
                password: data.password
            }
            const res = await apiDiagrams.post("/auth/login", credentials);

            dispatch({
                type: AUTH_USER,
                payload: res.data
            });
            await AsyncStorage.setItem('token', res.data._token);
        } catch (error) {
            dispatch({
                type: ADD_ERROR,
                payload: {
                    errorMessage: 'La informacion escrita es incorrecta'
                }
            })
        }
    }

    const logOut = () => {
        dispatch({
            type: LOGOUT_USER
        })
    }

    const addError = () => {
        dispatch({
            type: ADD_ERROR,
            payload: {
                errorMessage: 'Faltó por llenar algún campo'
            }
        })
    }

    const removeError = () => {
        dispatch({
            type: ERROR_REMOVE
        })
    }

    return (
        <AuthContext.Provider
            value={{
                usuario: state.usuario,
                errorMessage: state.errorMessage,
                token: state.token,
                status: state.status,
                signIn,
                logOut,
                addError,
                removeError,
                checkToken
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;