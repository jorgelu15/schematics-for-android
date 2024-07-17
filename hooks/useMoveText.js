import { useContext, useState } from "react";
import templateContext from "../context/template/templateContext";

function useMoveText(widthSk, heightSk, sizeSquare, scaleRatio, statusMove, setStatusMove) {
    const { coordXY, coordXYT, coordLn, setcoordXY, setcoordXYT, setCoordLn } = useContext(templateContext);
    const [shiftXY, setShiftXY] = useState({ x: 0, y: 0 });

    const handleTouchDownText = (e, idx) => {
        const { pageX, pageY } = e.nativeEvent;

        const coordXYSelected = coordXY?.map((item) =>
            ({ ...item, isSelected: false })
        );
        setcoordXY(coordXYSelected);

        setShiftXY({
            ...setShiftXY,
            y: pageY,
            x: pageX,
        });

        setStatusMove(0); //estado del movimiento
    };

    const handleTouchMoveText = (e, idx) => {

        if (statusMove == 0) {

            //genera un movimiento lento, hace que el cuadro persiga al mouse
            let x_ = Math.round(e.nativeEvent.pageX) - Math.round(shiftXY.x),
                y_ = Math.round(e.nativeEvent.pageY) - Math.round(shiftXY.y); //posicion mouse actual - posicion mouse pasada

            //movimiento del mouse en (x,y) con respecto a la escala
            let mx = x_ / scaleRatio, my = y_ / scaleRatio;

            let updatedX = parseInt(coordXYT[idx].x) + mx;
            let updatedY = parseInt(coordXYT[idx].y) + my;

            // colision cuadro a paredes
            // si las coords en (x,y) son menores que 0 entonces el movimiento retorna (0,0) => (x,y)
            if (updatedX < 0 || updatedX + sizeSquare * 2 > widthSk) {
                updatedX = coordXYT[idx].x; // Mantener la misma posición en x si hay colisión con las paredes
            }

            if (updatedY < 0 || updatedY + sizeSquare * 2 > heightSk) {
                updatedY = coordXYT[idx].y; // Mantener la misma posición en y si hay colisión con las paredes
            }

            //optimizacion de el movimiento de los componentes en el sketch
            const updatedCoordXYT = [...coordXYT];
            updatedCoordXYT[idx] = { ...coordXYT[idx], x: updatedX, y: updatedY };
            setcoordXYT(updatedCoordXYT);

            //se setea la posicion actual y pasa a ser la pasada
            setShiftXY({
                ...setShiftXY,
                y: e.nativeEvent.pageY,
                x: e.nativeEvent.pageX,
            });
        }
    };

    const handleTouchUpText = (e, idx) => {

        const updatedCoordXYT = coordXYT.map((item, indx) =>
            idx === indx ? { ...item, isSelected: true } : item
        );
        setcoordXYT(updatedCoordXYT);

        const updatedCoordXY = coordXY.map((item, indx) =>
            true ? {...item, isSelected: false} : item
        );
        setcoordXY(updatedCoordXY);

        const updatedCoordLn = coordLn.map((item, indx) =>
            true ? {...item, isSelected: false} : item
        );
        setCoordLn(updatedCoordLn);
        //estado del movimiento
        setStatusMove(1);
    };

    return {
        handleTouchDownText,
        handleTouchMoveText,
        handleTouchUpText
    }
}

export { useMoveText };