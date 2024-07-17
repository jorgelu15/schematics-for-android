import React, { memo, useContext, useMemo, useState } from "react";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import { FlatList, SafeAreaView } from "react-native";
import { SvgUri } from "react-native-svg";
import TemplateContext from "../../context/template/templateContext";
import { imageURI } from "../Sketch/imagesURI";
import { Image } from "react-native";
const { width, height } = Dimensions.get("window");
const widthSk = width > 800 ? (width - 800) + 800 : 800, heightSk = height > 800 ? (height - 800) + 800 : 800;
const MemoizedComponentItem = memo(({ item, handleAddComponent }) => {
    const filename = imageURI.filter((image) => image.nombre === item.path.split("/")[7]);
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
                    backgroundColor: "white",
                    margin: 5,
                    height: "auto",
                    width: 128,
                    borderRadius: 10,
                }}
            >
                <Image
                    source={filename[0].path}
                    // height={80}s
                    // width={128}
                    // uri={item.path}
                    style={{
                        backgroundColor: "#fff",
                        width: (width / 3) - 15,
                        height: 100
                    }}
                />
            </View>
            <Text style={{ fontSize: 8, width: 128, textAlign: "center" }}>{item.nombre}</Text>
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
                data={this.props.ANSIcomponentsFounds}
                keyExtractor={(item) => item.id}
                renderItem={this.memoizedRenderItem}
                numColumns={3}
            />
        );
    }
}

export default function ANSI({ navigation }) {

    const templateContext = useContext(TemplateContext);
    const { components, ANSIcomponentsFounds, coordXY, setcoordXY, searchComponentANSI, translateX, translateY } = templateContext;

    const [componentName, setComponentName] = useState('');

    const handleChange = e => {
        const searchText = e.nativeEvent.text;
        setComponentName(searchText);

        if (searchText === '') {
            // Restablecer los componentes a la lista completa
            searchComponentANSI('');
        } else {
            // Realizar la búsqueda con el texto ingresado
            searchComponentANSI(searchText);
        }
    };

    const handleAddComponent = useMemo(
        () => (idx) => {
            let proxId = 0;
            coordXY.map((item) => {
                if (item.id_u > proxId) {
                    proxId = item.id_u
                }
            })
            proxId += 1;

            let selectedComponent = ANSIcomponentsFounds.filter((item) => item.id === idx);
            selectedComponent[0].id_u = proxId;
            selectedComponent[0].x = -translateX - 20 + width / 2;
            selectedComponent[0].y = -translateY + 100 + height / 2;

            setcoordXY([...coordXY, selectedComponent[0]]);
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
            <ComponentList ANSIcomponentsFounds={ANSIcomponentsFounds} handleAddComponent={handleAddComponent} />
        </SafeAreaView>
    );
}
