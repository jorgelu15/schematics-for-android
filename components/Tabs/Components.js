import React, { memo, useContext, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { FlatList, SafeAreaView } from "react-native";
import { SvgUri } from "react-native-svg";
import TemplateContext from "../../context/template/templateContext";
const MemoizedComponentItem = memo(({ item, handleAddComponent }) => {
    return (
        <Pressable
            style={{
                justifyContent: "center",
                display: "flex",
                flex: 1,
                marginVertical: 15,
                width: 128,
            }}
            onPress={() => handleAddComponent(item.id)}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "red",
                    margin: 5,
                    height: 80,
                    width: 128,
                    borderRadius: 10,
                }}
            >
                <SvgUri
                    height={80}
                    width={128}
                    uri={item.path}
                    style={{
                        backgroundColor: "#fff",
                    }}
                />
            </View>
            <Text style={{ fontSize: 12, width: 128, textAlign: "center" }}>{item.nombre}</Text>
        </Pressable>
    );
});

class ComponentList extends React.PureComponent {
    memoizedRenderItem = ({ item }) => (
        <MemoizedComponentItem item={item} handleAddComponent={this.props.handleAddComponent} />
    );

    render() {
        return (
            <FlatList
                data={this.props.componentsFound}
                keyExtractor={(item) => item.id}
                renderItem={this.memoizedRenderItem}
                numColumns={3}
            />
        );
    }
}

export default function Components({ navigation }) {

    const templateContext = useContext(TemplateContext);
    const { components, componentsFound, coordXY, setcoordXY, searchComponent } = templateContext;

    const [componentName, setComponentName] = useState('');

    const handleChange = e => {
        setComponentName(e.nativeEvent.text);
        searchComponent(e.nativeEvent.text);
    };

    const handleAddComponent = useMemo(
        () => (idx) => {
            setcoordXY([...coordXY, components[idx - 1]]);
            setComponentName('');
            navigation.navigate('SketchBoard');
        }, [components, navigation, setcoordXY]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}>
            <View style={{ marginVertical: 5, borderBottomColor: "#D7D7D9", borderBottomWidth: 1 }}>
                <TextInput
                    placeholder="Buscar..."
                    keyboardType="default"
                    onChange={handleChange}
                    value={componentName}
                    style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: "#F0F0F2",
                        borderRadius: 5,
                    }} />
            </View>
            <ComponentList componentsFound={componentsFound} handleAddComponent={handleAddComponent} />
        </SafeAreaView>
    );
}
