import { Dimensions } from "react-native";
import { useContext, useEffect, useState } from "react";
import templateContext from "../context/template/templateContext";
const { width, height } = Dimensions.get("window");
const sizeSquare = 30;
const widthSk = width > 800 ? (width - 800) + 800 : 800, heightSk = height > 800 ? (height - 800) + 800 : 800;
function useMoveComponent(lineaGuia, setLineaGuia, statusLn,  setStatusLn, scaleRatio, statusMove, setStatusMove, guidesO, setGuidesO, guidesD, setGuidesD) {

    const { coordXY, setcoordXY, coordXYT, setcoordXYT, coordLn, setCoordLn } = useContext(templateContext);

    const [pointOrigin, setPointOrigin] = useState(-1);

    const [shiftXY, setShiftXY] = useState({ x: 0, y: 0 });

    const [oldCoords, setOldCoords] = useState({ x: 0, y: 0 });

    useEffect(() => { }, [coordXY]);
    useEffect(() => { }, [coordXYT]);
    useEffect(() => { }, [guidesO]);
    useEffect(() => { }, [guidesD]);
    useEffect(() => { }, [coordLn]);

    const handleTouchDownElement = (e, idx) => {
        const { pageX, pageY } = e.nativeEvent;
        

        if (statusLn === 1) {

            let xc = parseInt(coordXY[idx].x), yc = parseInt(coordXY[idx].y);

            if(lineaGuia.id_component_origin === -1 || lineaGuia.ancla1 === -1){
                setGuidesO(prevState => ({
                    ...prevState,
                    status: true,
                    point: [
                        { x: xc + (sizeSquare), y: yc },
                        { x: xc + (sizeSquare * 2), y: yc + (sizeSquare) },
                        { x: xc + (sizeSquare), y: yc + (sizeSquare * 2) },
                        { x: xc, y: yc + (sizeSquare) }
                    ],
                    coord: coordXY[idx]
                }))

                setLineaGuia(prevState => ({
                    ...prevState,
                    status: false,
                    id_component_origin: coordXY[idx].id_u,
                }))
            }
            else if(lineaGuia.ancla2 === -1 && lineaGuia.id_component_origin !== coordXY[idx].id_u){
                setGuidesD(prevState => ({
                    ...prevState,
                    status: true,
                    point: [
                        { x: xc + (sizeSquare), y: yc },
                        { x: xc + (sizeSquare * 2), y: yc + (sizeSquare) },
                        { x: xc + (sizeSquare), y: yc + (sizeSquare * 2) },
                        { x: xc, y: yc + (sizeSquare) }
                    ],
                    coord: coordXY[idx]
                }))

                setLineaGuia(prevState => ({
                    ...prevState,
                    status: false,
                    id_component_destiny: coordXY[idx].id_u,
                }))
            }
            else{
                console.log("paso")
            }
            
        }
        else {

            setOldCoords({
                x: parseInt(coordXY[idx].x),
                y: parseInt(coordXY[idx].y)
            })

        }

        //coord antes de la colisión
        setShiftXY(prevState => ({
            ...prevState,
            y: pageY,
            x: pageX,
        }));

        setStatusMove(0); // estado del movimiento
    };

    const handleTouchMoveElement = (e, idx) => {

        const { pageX, pageY } = e.nativeEvent;

        /*
        if (statusLn == 2) {

            let selectAnchor
            let xcal = shiftXY.x - pageX, ycal = shiftXY.y - pageY

            if (Math.abs(xcal) > Math.abs(ycal)) {
                selectAnchor = (xcal > 0 ? 3 : 1)
            }
            else {
                selectAnchor = (ycal > 0 ? 0 : 2)
            }

            let selectaux = selectAnchor + 1
            selectaux += (coordXY[idx].rotate/90)
            while(selectaux > 4) selectaux -= 4

            //console.log(selectaux,"linea 84")
            
            if((selectaux == 1 && coordXY[idx].ancla1 == 1)||
               (selectaux == 2 && coordXY[idx].ancla2 == 1)||
               (selectaux == 3 && coordXY[idx].ancla3 == 1)||
               (selectaux == 4 && coordXY[idx].ancla4 == 1)){

                if (pointOrigin !== -1) {

                    if (pointOrigin !== coordXY[idx].id_u) {
                        setLineaGuia(prevState => ({
                            ...prevState,
                            id_component_destiny: coordXY[idx].id_u,
                            ancla2: selectAnchor,
                            status: true
                        }))
                    }
    
                }
    
                setGuidesO(prevState => ({
                    ...prevState,
                    anchor: selectAnchor,
                    status: true,
                    idx: idx
                }));
            }

        }*/

        if (statusMove == 0 && statusLn != 1) {

            //genera un movimiento lento, hace que el cuadro persiga al mouse
            let x_ = Math.round(e.nativeEvent.pageX) - Math.round(shiftXY.x),
                y_ = Math.round(e.nativeEvent.pageY) - Math.round(shiftXY.y); //posicion mouse actual - posicion mouse pasada

            //movimiento del mouse en (x,y) con respecto a la escala
            let mx = x_ / scaleRatio, my = y_ / scaleRatio;

            let updatedX = parseInt(coordXY[idx].x) + mx;
            let updatedY = parseInt(coordXY[idx].y) + my;

            // colision cuadro a paredes
            // si las coords en (x,y) son menores que 0 entonces el movimiento retorna (0,0) => (x,y)
            if (updatedX < 0 || updatedX + sizeSquare * 2 > widthSk) {
                updatedX = coordXY[idx].x; // Mantener la misma posición en x si hay colisión con las paredes
            }

            if (updatedY < 0 || updatedY + sizeSquare * 2 > heightSk) {
                updatedY = coordXY[idx].y; // Mantener la misma posición en y si hay colisión con las paredes
            }

            //optimizacion de el movimiento de los componentes en el sketch
            const updatedCoordXY = [...coordXY];
            updatedCoordXY[idx] = { ...coordXY[idx], x: updatedX, y: updatedY };
            setcoordXY(updatedCoordXY);

            setShiftXY({
                //se setea la posicion actual y pasa a ser la pasada
                ...setShiftXY,
                y: e.nativeEvent.pageY,
                x: e.nativeEvent.pageX,
            });
        }
    };

    const handleTouchUpElement = (e, idx) => {

        const { pageX, pageY } = e.nativeEvent;

        /*
        if (statusLn == 2) {

            let selectAnchor
            let xcal = shiftXY.x - pageX, ycal = shiftXY.y - pageY

            if (Math.abs(xcal) > Math.abs(ycal)) {
                selectAnchor = (xcal > 0 ? 3 : 1)
            }
            else {
                selectAnchor = (ycal > 0 ? 0 : 2)
            }
            
            let selectaux = selectAnchor + 1
            selectaux += (coordXY[idx].rotate/90)
            while(selectaux > 4) selectaux -= 4

            //console.log(selectaux,"linea 84")
            
            if((selectaux == 1 && coordXY[idx].ancla1 == 1)||
               (selectaux == 2 && coordXY[idx].ancla2 == 1)||
               (selectaux == 3 && coordXY[idx].ancla3 == 1)||
               (selectaux == 4 && coordXY[idx].ancla4 == 1)){

                if (pointOrigin !== -1) {

                    if (pointOrigin !== coordXY[idx].id_u) {
                        setLineaGuia(prevState => ({
                            ...prevState,
                            id_component_destiny: coordXY[idx].id_u,
                            ancla2: selectAnchor
                        }))
                    }
                }

                setGuidesO(prevState => ({
                    ...prevState,
                    anchor: selectAnchor
                }));
            }

            // console.log("Pre validacion", guides.anchor)
            // if(pointOrigin !== -1 && guides.anchor == -1){
            //     console.log("validacion", guides.anchor)
            //     pointOrigin = -1;
            // }

            //console.log(guides, pointOrigin, "linea 204")

            if (pointOrigin === -1 || pointOrigin === coordXY[idx].id_u) {
                setPointOrigin(coordXY[idx].id_u)
                setStatusLn(1)
            }
            else if(pointOrigin !== -1 && guidesO.anchor == -1){
                setPointOrigin(-1)
                setStatusLn(1)
            }
            else {
                if (pointOrigin !== coordXY[idx].id_u) {
                    setCoordLn([...coordLn,
                    {
                        id_component_origin_db: 0,
                        id_component_origin: pointOrigin,
                        id_component_destiny_db: 0,
                        id_component_destiny: coordXY[idx].id_u,
                        ancla1: lineaGuia.ancla1,
                        ancla2: lineaGuia.ancla2,
                        isSelected: false
                    }
                    ])
                    setLineaGuia(prevState => ({
                        ...prevState,
                        status: false
                    }))
                    setGuidesO(prevState => ({
                        ...prevState,
                        status: false
                    }))

                    setPointOrigin(-1)
                    setStatusLn(0)
                }
            }

            setStatusMove(1);
            return
        }*/

        //se obtienen las posiciones (x,y) actuales
        const xPos = parseInt(coordXY[idx].x);
        const yPos = parseInt(coordXY[idx].y);

        let newX, newY;

        //se valida la posicion minima o maxima en (x,y) para que el componente encaje en un cuadro de lˆ2 y se almacena la posicion
        //nueva en las variables
        const roundXPos = Math.round(xPos);
        const roundYPos = Math.round(yPos);
        const roundedSizeSquare = Math.round(sizeSquare);

        const xRemainder = roundXPos % roundedSizeSquare;
        const yRemainder = roundYPos % roundedSizeSquare;

        newX = xRemainder < Math.round(roundedSizeSquare / 2)
            ? roundXPos - xRemainder
            : roundXPos + roundedSizeSquare - xRemainder;

        newY = yRemainder < Math.round(roundedSizeSquare / 2)
            ? roundYPos - yRemainder
            : roundYPos + roundedSizeSquare - yRemainder;

        //en caso de que exista una colision con otro componente se setean la posicion del componente con las anteriores coordenadas
        if (coordXY[idx].type != 3) {

            coordXY.map((item, ite) => {
                if (ite !== idx && item.type != 3) {
                    const xDiff = Math.abs(parseInt(item.x) - newX);
                    const yDiff = Math.abs(parseInt(item.y) - newY);
                    const collisionThreshold = sizeSquare;
                    if (xDiff <= collisionThreshold && yDiff <= collisionThreshold) {
                        newX = oldCoords.x;
                        newY = oldCoords.y;
                    }
                }
                return item;
            });
        }

        //en caso de esta todo ok, se setan con las nuevas coordenadas
        const updatedCoordXY = coordXY.map((item, indx) =>
            idx === indx ? { ...item, x: newX, y: newY, isSelected: true } : item
        );

        setcoordXY(updatedCoordXY);

        //estado del movimiento
        setStatusMove(1);
    };

    return {
        coordXY,
        setcoordXY,
        coordXYT,
        setcoordXYT,
        handleTouchDownElement,
        handleTouchMoveElement,
        handleTouchUpElement
    };
}
export { useMoveComponent };