import React, { Children, useEffect, useReducer, useState } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    AUTH_USER,
    ERROR_REMOVE,
    ADD_ERROR,
    NOT_AUTHENTICATED,
    LOGOUT_USER,
    CRENDIALS_ME,
    USUARIO_AUTENTICADO
} from '../../types/index'
import apiDiagrams from '../../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

const AuthState = props => {

    const initialState = {
        usuario: null,
        errorMessage: "checking",
        token: null,
        status: 'not-authenticated',
        credentialsME: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const [isOnline, setIsOnline] = useState(true);

    const checkInternetConnection = async () => {
        try {
            await axios.head('https://www.google.com');
            setIsOnline(true);
            ToastAndroid.show("Conexion establecida", ToastAndroid.BOTTOM)

        } catch (error) {
            setIsOnline(false);
            ToastAndroid.show("No hay conexion a internet", ToastAndroid.BOTTOM);
        }
    };

    const setCredentialsME = (data) => {
        signIn({ data });
        dispatch({
            type: CRENDIALS_ME,
            payload: data
        })
    }




    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        await checkInternetConnection();

        if (!token) return dispatch({ type: NOT_AUTHENTICATED });

        if (isOnline) {
            const res = await apiDiagrams.get('/auth/validateToken');
            if (res.status !== 200) return dispatch({ type: NOT_AUTHENTICATED })
            dispatch({
                type: AUTH_USER,
                payload: res.data
            });
            await AsyncStorage.setItem('token', res.data._token);
        } else {
            dispatch({
                type: "AUTH_USER",
                payload: {
                    _token: token,
                    data: {
                        usuario: "offline"
                    }
                }
            })
        }


    }

    const signIn = async (data) => {
        try {
            checkInternetConnection();
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
            const token = await AsyncStorage.getItem('token');
            if (isOnline && !token) {
                dispatch({
                    type: ADD_ERROR,
                    payload: {
                        errorMessage: 'La informacion escrita es incorrecta'
                    }
                })
            } else {
                dispatch({
                    type: "AUTH_USER",
                    payload: {
                        _token: token,
                        data: {
                            usuario: "offline"
                        }
                    }
                })
            }
        }
    }

    const usuarioAutenticado = async () => {
        const token = await AsyncStorage.getItem('token');

        if (token !== null) {
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: {
                    _token: token,
                }
            })
        }
    }

    const logOut = () => {
        AsyncStorage.removeItem("token")
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
                credentialsME: state.credentialsME,
                signIn,
                logOut,
                addError,
                removeError,
                checkToken,
                setCredentialsME,
                checkInternetConnection,
                isOnline,
                usuarioAutenticado
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;