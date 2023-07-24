import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");
export default function Grid({ grid, sizeSquare, coordsX, coordsY, ...props }) {
    return(
        <>
            {coordsX.map((_, idx) => (
                <View
                    key={idx}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        borderWidth: 1,
                        borderColor: grid ? "#FFF" : "#CFEBFA",
                        padding: 0,
                        margin: 0,
                        width: width > 800 ? (width-800)+800 : 800,
                        height: sizeSquare * (idx + 1),
                    }}
                ></View>
            ))}
            {coordsY.map((_, idx) => (
                <View
                    key={idx}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        borderWidth: 1,
                        borderColor: grid ? "#FFF" : "#CFEBFA",
                        padding: 0,
                        margin: 0,
                        width: sizeSquare * (idx + 1),
                        height: height > 800 ? (height-800)+800 : 800,
                    }}
                ></View>
            ))}
        </>
    );
}