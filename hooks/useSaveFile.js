import { ToastAndroid } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useEffect } from "react";

function useSaveFile(sketchRef, setGrid) {
    const [status, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        if (status === null) {
            requestPermission();
        }
    }, [status]);
    
    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(sketchRef, {
                height: 440,
                quality: 1,
            });
            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                setGrid(false)
                if (Platform.OS == 'android') {
                    ToastAndroid.show("Se ha guardado exitosamente", ToastAndroid.LONG)
                }
                if (Platform.OS == 'ios') {
                    alert("Se ha guardado exitosamente");
                }

            }
        } catch (e) {
            console.log(e);
        }
    };
    return {
        onSaveImageAsync
    }
}

export { useSaveFile };