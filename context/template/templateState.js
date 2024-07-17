import React, { Children, useReducer, useState } from 'react';
import { Dimensions, ToastAndroid } from 'react-native';
import TemplateContext from './templateContext';
import TemplateReducer from './templateReducer';
import * as FileSystem from 'expo-file-system';


import {
    GET_COMPONENTS,
    GET_TEXTS,
    CHANGE_POSITION,
    CHANGE_POSITION_T,
    CHANGE_ROTATE,
    CHANGE_POSITION_A,
    SET_COMPONENTS,
    SET_TEXTS,
    GET_TEMPLATES,
    GET_TEMPLATE,
    POST_TEMPLATES,
    GET_TEMPLATE_ID,
    TEMPLATE_ACTUAL,
    FILTRAR_TEMPLATES,
    FILTRAR_COMPONENTES,
    CLOSE_TEMPLATE,
    FILTRAR_COMPONENTES_IEC,
    FILTRAR_COMPONENTES_ANSI,
    FILTRAR_COMPONENTES_UNIONES,
    FILTRAR_COMPONENTES_OTROS,
    POST_TEXT_TEMPLATES,
    SET_TRANSLATEX,
    GET_TRANSLATEX,
    SET_TRANSLATEY,
    GET_TRANSLATEY,
    SYNCRONIZE

} from '../../types/index'
import apiDiagrams from '../../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { all } from 'axios';
import { DB as DBData  } from "../../components/Sketch/imagesURI";

const { width, height } = Dimensions.get("window");
const widthSk = width > 800 ? (width - 800) + 800 : 800, heightSk = height > 800 ? (height - 800) + 800 : 800;

const TemplateState = props => {

    const initialState = {
        texts: [],
        coordXY: [],
        coordXYT: [],
        coordLn: [],
        templates: [],
        template: null,
        templatesFound: [],
        IECcomponents: [],
        IECcomponentsFounds: [],
        ANSIcomponents: [],
        ANSIcomponentsFounds: [],
        UNIONEScomponents: [],
        UNIONEScomponentsFounds: [],
        OTROScomponents: [],
        OTROScomponentsFounds: [],
        translateX: -((widthSk / 2) - (width / 2)),
        translateY: -((heightSk / 2) - (height / 2))
    }
    const [isOnline, setIsOnline] = useState(true);



    const [state, dispatch] = useReducer(TemplateReducer, initialState);

    const getComponents = async () => {
        try {
            await AsyncStorage.setItem("components", JSON.stringify(DBData.data));

            const componentes = JSON.parse(await AsyncStorage.getItem("components"));

            dispatch({
                type: GET_COMPONENTS,
                payload: componentes
            })
        } catch (error) {

        }
    }

    const getTexts = async () => {
        const res = await apiDiagrams.get('/texts');
        dispatch({
            type: GET_TEXTS,
            payload: res.data.data
        })
    }

    const setcoordXY = (data) => {
        dispatch({
            type: CHANGE_POSITION,
            payload: data
        })
    }

    const setcoordXYT = (data) => {
        dispatch({
            type: CHANGE_POSITION_T,
            payload: data
        })
    }

    const setTranslateX = (data) => {
        dispatch({
            type: SET_TRANSLATEX,
            payload: data
        })
    }

    const getTranslateX = (data) => {
        dispatch({
            type: SET_TRANSLATEX,
            payload: data
        })
    }

    const setTranslateY = (data) => {
        dispatch({
            type: SET_TRANSLATEY,
            payload: data
        })
    }

    const getTranslateY = (data) => {
        dispatch({
            type: GET_TRANSLATEY,
            payload: data
        })
    }

    const setCoordLn = (data) => {
        dispatch({
            type: CHANGE_POSITION_A,
            payload: data
        })
    }

    const closeTemplate = () => {
        dispatch({
            type: CLOSE_TEMPLATE
        })
    }

    const setcomponents = (data) => {
        dispatch({
            type: SET_COMPONENTS,
            payload: data
        })
    }

    const setTexts = (data) => {
        dispatch({
            type: SET_TEXTS,
            payload: data
        })
    }

    const checkInternetConnection = async () => {
        try {
            await axios.head('https://www.google.com');
            setIsOnline(true);
            ToastAndroid.show("Conexion establecida", ToastAndroid.BOTTOM)

        } catch (error) {
            setIsOnline(false);
            ToastAndroid.show("No hay conexion a internet", ToastAndroid.BOTTOM)
        }
    };

    const getTemplates = async () => {
        try {
            let templatesDB = [];
            let templatesJoin = [];
            let plantillas = JSON.parse(await AsyncStorage.getItem("templates"));
    
            if (!Array.isArray(plantillas) || (Array.isArray(plantillas) && plantillas.length === 0)) {
                // Si 'plantillas' no es un array válido o está vacío, inicializa 'templatesJoin' con 'templatesDB'
                templatesJoin = templatesDB;
            } else {
                // Si 'plantillas' es un array válido y no está vacío, úsalo como 'templatesJoin'
                templatesJoin = plantillas;
            }
    
            await AsyncStorage.setItem("templates", JSON.stringify(templatesJoin));
            
            dispatch({
                type: GET_TEMPLATES,
                payload: templatesJoin,
            });
        } catch (error) {
            console.log(error);
        }
    };
    

    const setTemplates = async (data) => {
        try {
            checkInternetConnection();

            let plantillas = [];

            plantillas = JSON.parse(await AsyncStorage.getItem("templates"));
            if (Array.isArray(plantillas)) {
                plantillas.push(data)
            }

            await AsyncStorage.setItem("templates", JSON.stringify(plantillas));
            console.log(plantillas, data)
            dispatch({
                type: POST_TEMPLATES,
                payload: plantillas
            })
        } catch (error) {
            console.error(error);
        }
    }

    const setTemplate = async (data, id) => {
        try {
            const plantillas = JSON.parse(await AsyncStorage.getItem("templates"));
            
            if (Array.isArray(plantillas)) {
                const findedIndex = plantillas.findIndex(item => item.id === id);

                if (findedIndex !== -1) {
                    plantillas[findedIndex] = data;
                }
            }

            await AsyncStorage.setItem("templates", JSON.stringify(plantillas));
            dispatch({
                type: TEMPLATE_ACTUAL,
                payload: data
            });
        } catch (error) {

        }
    }

    const setTemplateState = (data) => {
        dispatch({
            type: GET_TEMPLATE_ID,
            payload: data
        });
    }

    const searchTemplate = (data) => {
        dispatch({
            type: FILTRAR_TEMPLATES,
            payload: data
        })
    }

    const searchComponentIEC = (data) => {
        dispatch({
            type: FILTRAR_COMPONENTES_IEC,
            payload: data
        })
    }

    const searchComponentANSI = (data) => {
        dispatch({
            type: FILTRAR_COMPONENTES_ANSI,
            payload: data
        })
    }

    const searchComponentUNIONES = (data) => {
        dispatch({
            type: FILTRAR_COMPONENTES_UNIONES,
            payload: data
        })
    }

    const searchComponentOTROS = (data) => {
        dispatch({
            type: FILTRAR_COMPONENTES_OTROS,
            payload: data
        })
    }

    const syncronizedTemplates = async (data) => {
        try {
            const res = await apiDiagrams.post(`/templates`, data);
            if (Platform.OS === 'android') ToastAndroid.show('Se sincronizaron los datos con la nube', ToastAndroid.LONG);
            if (Platform.OS === 'ios') alert('Se sincronizaron los datos con la nube');
        } catch (error) {
            if (Platform.OS === 'android') ToastAndroid.show('Hubo un error al sincronizar los datos', ToastAndroid.LONG);
            if (Platform.OS === 'ios') alert('Hubo un error al sincronizar los datos');
            console.log(error)
        }
    }

    return (    
        <TemplateContext.Provider
            value={{
                texts: state.texts,
                coordXY: state.coordXY,
                coordXYT: state.coordXYT,
                coordLn: state.coordLn,
                templates: state.templates,
                template: state.template,
                templatesFound: state.templatesFound,
                IECcomponents: state.IECcomponents,
                IECcomponentsFounds: state.IECcomponentsFounds,
                ANSIcomponents: state.ANSIcomponents,
                ANSIcomponentsFounds: state.ANSIcomponentsFounds,
                UNIONEScomponents: state.UNIONEScomponents,
                UNIONEScomponentsFounds: state.UNIONEScomponentsFounds,
                OTROScomponents: state.OTROScomponents,
                OTROScomponentsFounds: state.OTROScomponentsFounds,
                translateX: state.translateX,
                translateY: state.translateY,
                setTranslateX,
                getTranslateX,
                setTranslateY,
                getTranslateY,
                setcomponents,
                getComponents,
                setTexts,
                getTexts,
                setcoordXY,
                setcoordXYT,
                setCoordLn,
                closeTemplate,
                getTemplates,
                setTemplate,
                setTemplateState,
                setTemplates,
                searchTemplate,
                searchComponentIEC,
                searchComponentANSI,
                searchComponentUNIONES,
                searchComponentOTROS,
                syncronizedTemplates
            }}
        >
            {props.children}
        </TemplateContext.Provider>
    );
}

export default TemplateState;