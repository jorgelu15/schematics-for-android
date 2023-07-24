import { memo, useCallback, useContext, useMemo, useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TemplateContext from "../../context/template/templateContext";

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

export default function Template({ navigation }) {
    const templateContext = useContext(TemplateContext);
    const { templatesFound, setcoordXY, setTemplateState, searchTemplate } = templateContext;

    const [templateName, setTemplateName] = useState('');

    const handleChange = e => {
        setTemplateName(e.nativeEvent.text);
        searchTemplate(e.nativeEvent.text);
    };

    const memoizedHandleTemplates = useCallback((templateActual) => {
        setcoordXY(templateActual?.component || []);
        setTemplateState(templateActual);
        navigation.navigate('SketchBoard');
    }, [setcoordXY, setTemplateState, navigation]);

    const memoizedRenderItem = useMemo(() => {
        return ({ item }) => (
            <MemoizedTemplateItem item={item} handleTemplates={memoizedHandleTemplates} />
        );
    }, [memoizedHandleTemplates]);
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}>
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
                    }} />
            </View>
            <FlatList
                data={templatesFound}
                keyExtractor={(item) => item.id}
                renderItem={memoizedRenderItem}
            />
        </SafeAreaView>
    );
}