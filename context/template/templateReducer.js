import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GET_COMPONENTS,
    GET_TEXTS,
    CHANGE_POSITION,
    CHANGE_POSITION_T,
    CHANGE_POSITION_A,
    CHANGE_ROTATE,
    GET_TEMPLATES,
    GET_TEMPLATE,
    POST_TEMPLATES,
    GET_TEMPLATE_ID,
    TEMPLATE_ACTUAL,
    FILTRAR_TEMPLATES,
    CLOSE_TEMPLATE,
    FILTRAR_COMPONENTES,
    FILTRAR_COMPONENTES_IEC,
    FILTRAR_COMPONENTES_ANSI,
    FILTRAR_COMPONENTES_UNIONES,
    FILTRAR_COMPONENTES_OTROS,
    POST_TEXT_TEMPLATES,
    GET_TRANSLATEX,
    GET_TRANSLATEY,
    SET_TRANSLATEX,
    SET_TRANSLATEY,
    SYNCRONIZE
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case GET_COMPONENTS:
            return {
                ...state,
                IECcomponents: action.payload.filter((component) => component.id_type === 1),
                IECcomponentsFounds: action.payload.filter((component) => component.id_type === 1),
                ANSIcomponents: action.payload.filter((component) => component.id_type === 2),
                ANSIcomponentsFounds: action.payload.filter((component) => component.id_type === 2),
                UNIONEScomponents: action.payload.filter((component) => component.id_type === 3),
                UNIONEScomponentsFounds: action.payload.filter((component) => component.id_type === 3),
                OTROScomponents: action.payload.filter((component) => component.id_type !== 1 && component.id_type !== 2 && component.id_type !== 3),
                OTROScomponentsFounds: action.payload.filter((component) => component.id_type !== 1 && component.id_type !== 2 && component.id_type !== 3),
            };
        case GET_TEXTS:
            return {
                ...state,
                texts: action.payload
            };
        case SET_TRANSLATEX:
            return {
                ...state,
                translateX: action.payload
            };
        case SET_TRANSLATEY:
            return {
                ...state,
                translateY: action.payload
            };
        case CHANGE_POSITION:
            return {
                ...state,
                coordXY: action.payload
            };
        case CHANGE_POSITION_T:
            return {
                ...state,
                coordXYT: action.payload
            };
        case CHANGE_POSITION_A:
            return {
                ...state,
                coordLn: action.payload
            };
        case CHANGE_ROTATE:
            return {
                ...state,
                coordXY: action.payload
            };
        case GET_TEMPLATES:
            
            return {
                ...state,
                templates: action.payload,
                templatesFound: action.payload
            }
        case GET_TEMPLATE_ID:
            return {
                ...state,
                template: action.payload
            }
        case POST_TEMPLATES:
            return {
                ...state,
                templates: action.payload,
                templatesFound: action.payload
            }
        case POST_TEXT_TEMPLATES:
            return {
                ...state,
                coordXYT: [...state.templates, action.payload],
            }
        case SYNCRONIZE:
            return {
                ...state,
                templates: action.payload,
            }
        case TEMPLATE_ACTUAL: {
            return {
                ...state,
                template: action.payload,
                templates: state.templates.map((item) => item.id === action.payload.id ? action.payload : item),
                templatesFound: state.templates.map((item) => item.id === action.payload.id ? action.payload : item),
            }
        }
        case GET_TEMPLATE:
            return {
                ...state,
                template: action.payload
            }
        case FILTRAR_TEMPLATES:
            return {
                ...state,
                templatesFound: state.templates.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
        case FILTRAR_COMPONENTES_IEC:
            const searchIEC = action.payload.toLowerCase();
            let filteredIECComponents = state.IECcomponents.filter((component) => component.nombre.toLowerCase().includes(searchIEC));

            if (searchIEC === '') {
                filteredIECComponents = state.IECcomponents;
            }

            return {
                ...state,
                IECcomponentsFounds: filteredIECComponents,
            };
        case FILTRAR_COMPONENTES_ANSI:
            const searchANSI = action.payload.toLowerCase();
            let filteredANSIComponents = state.ANSIcomponents.filter((component) => component.nombre.toLowerCase().includes(searchANSI));

            if (searchANSI === '') {
                filteredANSIComponents = state.ANSIcomponents;
            }

            return {
                ...state,
                ANSIcomponentsFounds: filteredANSIComponents,
            };
        case FILTRAR_COMPONENTES_UNIONES:
            const searchUNIONES = action.payload.toLowerCase();
            let filteredUNIONESComponents = state.UNIONEScomponents.filter((component) => component.nombre.toLowerCase().includes(searchUNIONES));

            if (searchUNIONES === '') {
                filteredUNIONESComponents = state.UNIONEScomponents;
            }

            return {
                ...state,
                UNIONEScomponentsFounds: filteredUNIONESComponents,
            };
        case FILTRAR_COMPONENTES_OTROS:
            const searchOTROS = action.payload.toLowerCase();
            let filteredOTROSComponents = state.OTROScomponents.filter((component) => component.nombre.toLowerCase().includes(searchOTROS));

            if (searchOTROS === '') {
                filteredOTROSComponents = state.OTROScomponents;
            }

            return {
                ...state,
                OTROScomponentsFounds: filteredOTROSComponents,
            };
        case CLOSE_TEMPLATE:
            return {
                ...state,
                coordXY: [],
                coordXYT: [],
                coordLn: [],
                template: null
            }
        default:
            return state;
    }
};
