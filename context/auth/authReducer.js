import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    AUTH_USER,
    ERROR_REMOVE,
    ADD_ERROR,
    NOT_AUTHENTICATED,
    LOGOUT_USER,
    CRENDIALS_ME,
    USUARIO_AUTENTICADO
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return {
                ...state,
                usuario: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload.errorMessage,
            }
        case ERROR_REMOVE:
            return {
                ...state,
                errorMessage: 'checking'
            }
        case CRENDIALS_ME:
            return {
                ...state,
                credentialsME: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload._token,
                usuario: action.payload.data
            };
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload._token,
            };
        case NOT_AUTHENTICATED:
        case LOGOUT_USER:
            return {
                ...state,
                errorMessage: '',
                status: "not-authenticated",
                token: null,
                usuario: null

            }
        default:
            return state;
    }
};