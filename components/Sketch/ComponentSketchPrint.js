import { View } from "react-native";

export default function ComponentSketchPrint({ item, sizeSquare, textWidth, children, ...props }) {
    return (
        <View
            style={{
                position: "absolute",
                zIndex: 20,
                backgroundColor: "transparent",
                width: textWidth ? "auto" : (sizeSquare * 2) || 0,
                height: textWidth ? "auto" : (sizeSquare * 2) || 0,
                top: parseFloat(item?.y) || 0,
                left: parseFloat(item?.x) || 0,
                transform: [{ rotate: `${parseInt(item?.rotate)}deg` }],
                zIndex: item?.type === 3 ? 10000 : 10
            }}
        >
            {children}
        </View>
    );
}