import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TemplateContext from "../context/template/templateContext";
import authContext from "../context/auth/authContext";

const { height } = Dimensions.get("screen");

const MemoizedTemplateItem = memo(({ item, handleTemplates }) => {
    return (
        <TouchableOpacity
            onPress={() => handleTemplates(item)}
            style={{
                display: "flex",
                backgroundColor: "#fff",
                borderBottomColor: "#F0F0F2",
                borderBottomWidth: 1,
                marginLeft: 20,
                paddingVertical: 15,
                alignItems: "flex-start",
                flexDirection: "row"
            }}
        >
            <Text style={{ fontSize: 15, textAlign: "center", marginHorizontal: 10 }}>{item.name}</Text>
        </TouchableOpacity>
    );
}, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

export default function Plantillas({ navigation }) {
    const templateContext = useContext(TemplateContext);
    const { templatesFound, setcoordXY, setcoordXYT, setCoordLn, setTemplateState, searchTemplate, closeTemplate, getTemplates } = templateContext;
    const { usuario } = useContext(authContext);

    useEffect(() => {
        getTemplates(usuario);
    }, []);

    const [templateName, setTemplateName] = useState('');
    const handleChange = e => {
        setTemplateName(e.nativeEvent.text);
        searchTemplate(e.nativeEvent.text);
    };

    const memoizedHandleTemplates = useCallback((templateActual) => {
        const { component, text_component, amarre_template } = templateActual;
        const newCoordXY = [...component];
        const newCoordXYT = [...text_component];
        const newCoordLn = [...amarre_template];

        closeTemplate();
        setcoordXY(newCoordXY || []);
        setcoordXYT(newCoordXYT || []);
        setCoordLn(newCoordLn || []);
        setTemplateState(templateActual);

        navigation.navigate('SketchBoard');
    }, [setcoordXY, setcoordXYT, setCoordLn, setTemplateState, closeTemplate, navigation]);

    const memoizedRenderItem = useMemo(() => {
        return ({ item }) => (
            <MemoizedTemplateItem item={item} handleTemplates={memoizedHandleTemplates} />
        );
    }, [memoizedHandleTemplates]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginVertical: 5, borderBottomColor: "#D7D7D9", borderBottomWidth: 1 }}>
                <TextInput
                    placeholder="Buscar..."
                    keyboardType="default"
                    onChange={handleChange}
                    value={templateName}
                    style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: "#F0F0F2",
                        borderRadius: 5,
                    }}
                />
            </View>
            <View>
                <Text
                    style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        fontWeight: 'bold',
                    }}
                >Almacenamiento local</Text>
                <FlatList
                    data={templatesFound}
                    keyExtractor={(item) => item.id_u.toString()}
                    renderItem={memoizedRenderItem}
                />
            </View>
        </SafeAreaView>
    );
}
