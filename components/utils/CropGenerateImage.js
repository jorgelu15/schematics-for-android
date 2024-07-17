import { View } from "react-native";
import ComponentSketch from "../Sketch/ComponentSketch";
import ComponentDiagram from "../Sketch/ComponentDiagram";
import { Text } from "react-native";
import ComponentSketchPrint from "../Sketch/ComponentSketchPrint";
const sizeSquare = 30;
const CropGenerateImage = ({ sketchRef, coordXY, coordXYT, coordLn, ...props }) => {

    let maxW = 0, minW = 9999;
    let maxH = 0, minH = 9999;
    coordXY?.map((item, idx) => {
        if (item.x > maxW) {
            maxW = item.x;
        }

        if (item.y > maxH) {
            maxH = item.y;
        }

        if (item.x < minW) {
            minW = item.x;
        }

        if (item.y < minH) {
            minH = item.y;
        }
    })

    // console.log(minW)

    coordXYT?.map((item, idx) => {
        if (item.x > maxW) {
            maxW = item.x;
        }

        if (item.y > maxH) {
            maxH = item.y;
        }

        if (item.x < minW) {
            minW = item.x;
        }

        if (item.y < minH) {
            minH = item.y;
        }
    })

    // coordXY?.map(item => {
    //     // console.log(item.x, "antes", minW)
    //     item.x = item.x - minW;
    //     item.y = item.y - minH;
    //     // console.log(item.x, "despues")
    // })

    // coordXYT?.map(item => {
    //     item.x = item.x - minW;
    //     item.y = item.y - minH;
    // })

    return (
        <View
            ref={sketchRef}
            style={{
                backgroundColor: "white",
                width: maxW - minW + (sizeSquare * 2),
                height: maxH - minH + (sizeSquare * 2)
            }}
        >
            {coordLn
                ? coordLn.map((item, idx) => {
                    let comp_origin, comp_destiny

                    coordXY.map((itemc) => {
                        if (itemc.id_u === item.id_component_origin) {
                            comp_origin = itemc
                        }
                        if (itemc.id_u === item.id_component_destiny) {
                            comp_destiny = itemc
                        }
                    })

                    let x1 = parseInt(comp_origin?.x) - minW;
                    let y1 = parseInt(comp_origin?.y) - minH;

                    if (item.ancla1 == 0) { x1 += sizeSquare }
                    else if (item.ancla1 == 1) { x1 += sizeSquare * 2; y1 += sizeSquare }
                    else if (item.ancla1 == 2) { x1 += sizeSquare; y1 += sizeSquare * 2 }
                    else if (item.ancla1 == 3) { y1 += sizeSquare }

                    let y2 = parseInt(comp_destiny?.y) - minH;
                    let x2 = parseInt(comp_destiny?.x) - minW;

                    if (item.ancla2 == 0) { x2 += sizeSquare }
                    else if (item.ancla2 == 1) { x2 += sizeSquare * 2; y2 += sizeSquare }
                    else if (item.ancla2 == 2) { x2 += sizeSquare; y2 += sizeSquare * 2 }
                    else if (item.ancla2 == 3) { y2 += sizeSquare }

                    let distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    let angulo = Math.atan2(y2 - y1, x2 - x1);

                    const keyAmarre = item?.ancla1.toString() + item?.ancla2.toString() + item?.id_component_origin.toString() + item?.id_component_destiny.toString();
                    return (
                        <View
                            key={keyAmarre}
                            style={{
                                position: 'absolute',
                                left: x1,
                                top: y1,
                                width: distancia,
                                height: 2,
                                backgroundColor: '#ffd2aa',
                                transform: [
                                    { translateX: (-distancia / 2) },
                                    { rotate: `${angulo}rad` },
                                    { translateX: (distancia / 2) },
                                ],
                                zIndex: 200
                            }}
                        >
                            <View style={{
                                width: distancia,
                                height: 10,
                                backgroundColor: 'transparent',
                                zIndex: 1
                            }}>
                            </View>
                        </View>
                    )
                })
                : null}

            {coordXY
                ? coordXY.map((item, idx) => {
                    return (
                        <ComponentSketchPrint
                            key={coordXY[idx].id_u}
                            item={{ ...item, x: item.x - minW, y: item.y - minH }}
                            sizeSquare={sizeSquare}
                        >
                            <ComponentDiagram
                                path={coordXY[idx]?.path}
                                sizeSquare={sizeSquare}
                                scaleX={coordXY[idx]?.scaleX}
                                scaleY={coordXY[idx]?.scaleY}
                            />
                        </ComponentSketchPrint>
                    )
                }) : null}

            {coordXYT
                ? coordXYT.map((item, idx) => (
                    <ComponentSketchPrint
                        key={idx}
                        item={{ ...item, x: item.x - minW, y: item.y - minH }}
                        rotate={item?.rotate}
                        sizeSquare={sizeSquare}
                        textWidth={item?.nombre.length}
                    >
                        <Text
                            style={{ width: "auto", fontSize: item?.size, backgroundColor: "transparent" }}
                        >
                            {coordXYT[idx].nombre}
                        </Text>
                    </ComponentSketchPrint>
                ))
                : null}
        </View>
    );
}

export default CropGenerateImage;