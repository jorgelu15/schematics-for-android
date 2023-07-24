import { useContext, useEffect, useState } from "react";
import templateContext from "../context/template/templateContext";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const sizeSquare = 30;
const widthSk = width > 800 ? (width - 800) + 800 : 800, heightSk = height > 800 ? (height - 800) + 800 : 800;
function useMoveSketch(statusLn, setStatusLn, scaleRatio, translateX, translateY, setTranslateX, setTranslateY, setscaleRatio, statusMove, setStatusMove) {

    const { coordXY, setcoordXY, coordXYT, setcoordXYT } = useContext(templateContext);
    const [shiftTrXY, setShiftTrXY] = useState({ x: 0, y: 0 });

    const [lastTap, setLastTap] = useState(null);

    const [lastTXY, setLastTXY] = useState({ x: 0, y: 0 });

    useEffect(() => { }, [translateX]);
    useEffect(() => { }, [translateY]);

    const handleTouchDownSk = (e) => {

        const coordXYSelected = coordXY?.map((item) =>
            ({ ...item, isSelected: false })
        );
        setcoordXY(coordXYSelected);

        const coordXYTSelected = coordXYT?.map((item) =>
            ({ ...item, isSelected: false })
        );
        setcoordXYT(coordXYTSelected);

        setShiftTrXY({
            ...setShiftTrXY,
            y: e.nativeEvent.pageY,
            x: e.nativeEvent.pageX,
        });

    };

    const handleTouchMoveSk = (e) => {

        if (statusMove == 1 && statusLn != 2) {

            let x_ = e.nativeEvent.pageX - shiftTrXY.x, y_ = e.nativeEvent.pageY - shiftTrXY.y
            let mx = x_ / scaleRatio, my = y_ / scaleRatio

            let LL = (widthSk - (widthSk / scaleRatio)) / 2, LR = -(widthSk - width)
            let LT = (heightSk - (heightSk / scaleRatio)) / 2, LB = -(heightSk - LT - (height / scaleRatio))


            if ((translateX + mx) > LL)
                setTranslateX(LL)
            else if (((translateX + mx) < LR))
                setTranslateX(LR)
            else
                setTranslateX(translateX + mx)

            if ((translateY + my) > LT)
                setTranslateY(LT)
            else if ((translateY + my) < LB)
                setTranslateY(LB)
            else
                setTranslateY(translateY + my)


            setShiftTrXY({
                ...setShiftTrXY,
                y: e.nativeEvent.pageY,
                x: e.nativeEvent.pageX,
            });
        }

    };

    const handleTouchEndSk = (e) => {

        const actualTap = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap && (actualTap - lastTap) < DOUBLE_PRESS_DELAY) {

            let xt = e.nativeEvent.pageX, yt = e.nativeEvent.pageY, range = 20

            if (((lastTXY.x - range) <= xt && xt <= (lastTXY.x + range)) &&
                ((lastTXY.y - range) <= yt && yt <= (lastTXY.y + range))) {

                let scalaTem = (scaleRatio == 1) ? 3 : 1
                setscaleRatio(scalaTem)

                //se calculan lo limites del sketch con respecto a las pantalla
                let LL = (widthSk - (widthSk / scalaTem)) / 2;
                let LR = -(widthSk - width);
                let LT = (heightSk - (heightSk / scalaTem)) / 2;
                let LB = -(heightSk - LT - (height / scalaTem));

                // calculo del translate respecto a la posicion del doble click / no se ha contemplado el tamaño del sketch
                let zx = -(translateX - (width - width / scalaTem)) + xt / scalaTem;
                let zy = -(translateY - (height - height / scalaTem)) + yt / scalaTem;

                let tzoomX = -zx + width / 2 + (width - width / scalaTem) / 2;
                let tzoomY = -zy + height / 2 + (height - height / scalaTem) / 2;


                // corregir si translate sale de los limites
                if (tzoomX > LL) {
                    tzoomX = LL;
                } else if (tzoomX < LR) {
                    tzoomX = LR;
                }

                if (tzoomY > LT) {
                    tzoomY = LT;
                } else if (tzoomY < LB) {
                    tzoomY = LB;
                }

                setTranslateX(tzoomX)
                setTranslateY(tzoomY)
            }

        } else {
            setLastTap(actualTap);
            setLastTXY({
                y: e.nativeEvent.pageY,
                x: e.nativeEvent.pageX,
            });
        }
    }
    return {
        handleTouchDownSk,
        handleTouchMoveSk,
        handleTouchEndSk
    }
}

export { useMoveSketch };