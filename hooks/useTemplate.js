import { useContext, useEffect } from "react";
import templateContext from "../context/template/templateContext";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authContext from "../context/auth/authContext";

function useTemplate(templateName, setTemplateName, setErrorAlert, setShowModal, setshowModalCloseTemplate) {
    const { coordXY,
        coordXYT,
        coordLn,
        components,
        templates,
        template,
        translateX,
        translateY,
        setTemplates,
        setTemplate,
        setTranslateX,
        setTranslateY,
        closeTemplate,
        getComponents,
        getTemplates,
        setcoordXYT,
        setcoordXY,
        setCoordLn,
        syncronizedTemplates,
    } = useContext(templateContext);
    const { usuario } = useContext(authContext);

    useEffect(() => {
        getComponents();
    }, []);

    useEffect(() => {
        getTemplates(usuario);
    }, []);

    const onSaveTemplates = () => {
        //validar que la plantilla tenga nombre
        if (templateName === '') {
            setErrorAlert('La plantilla debe incluir un nombre');
            return;
        }

        let proxId = 0;
        templates[1].map((item) => {
            if (item.id > proxId) {
                proxId = item.id
            }

        })
        proxId += 1;
        //validar que se guarde
        
        setTemplates({
            amarre_template: coordLn,
            text_component: coordXYT,
            component: coordXY,
            id: proxId,
            idServer: proxId,   
            name: templateName,
            img: "",
            usuario_created: usuario.id_nivel === 1 ? "SIPREM" : usuario?.usuario
        });
        setTemplateName('');
        setShowModal(false)
    }

    const onCloseTemplates = () => {
        closeTemplate();
        setCoordLn([]);
        setshowModalCloseTemplate(false);
    }

    const onUpdateTemplates = () => {
        if (
            ((JSON.stringify(template?.component) !== JSON.stringify(coordXY)) ||
                (JSON.stringify(template?.text_component) !== JSON.stringify(coordXYT)) ||
                (JSON.stringify(template?.amarre_template) !== JSON.stringify(coordLn)))
            && template?.id) {
            setTemplate(
                {
                    amarre_template: coordLn,
                    // text_components: coordXYT,
                    // components: coordXY,
                    text_component: coordXYT,
                    component: coordXY,
                    id: template?.id,
                    idServer: template?.idServer,
                    name: template?.name,
                    img: template?.img,
                    userCreated: usuario?.usuario,
                    // userCreated: "",
                },
                template.id
            );
            if (Platform.OS === 'android') ToastAndroid.show('Se guardaron los cambios', ToastAndroid.LONG);
            if (Platform.OS === 'ios') alert('Se guardaron los cambios')
        } else {
            if (Platform.OS === 'android') ToastAndroid.show('No se detectaron cambios en el sketch', ToastAndroid.LONG);
            if (Platform.OS === "ios") alert("No se detectaron cambios en el sketch");
        }
    }

    const onSyncronizeTemplatesWithDB = () => {
        if (templates) {
            syncronizedTemplates(templates[1]);
        }
    }

    return {
        coordXY,
        coordXYT,
        coordLn,
        components,
        translateX,
        translateY,
        setcoordXYT,
        setcoordXY,
        setTranslateX,
        setTranslateY,
        onSaveTemplates,
        onCloseTemplates,
        onUpdateTemplates,
        onSyncronizeTemplatesWithDB
    }
}

export { useTemplate };