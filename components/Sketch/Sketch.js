import React, { useState } from 'react'
import { View, Dimensions, Text } from 'react-native'
import ComponentSketch from './ComponentSketch';
import Grid from './Grid';

import ComponentDiagram from './ComponentDiagram';
import { useMoveComponent } from '../../hooks/useMoveComponent';
import { useMoveSketch } from '../../hooks/useMoveSketch';
import { useLineNode } from '../../hooks/useLineNode';
import { useTemplate } from '../../hooks/useTemplate';
import { useMoveText } from '../../hooks/useMoveText';

const { width, height } = Dimensions.get("window");
const widthSk = width > 800 ? (width - 800) + 800 : 800, heightSk = height > 800 ? (height - 800) + 800 : 800;
const sizeSquare = 30;

export default function Sketch({ lineaGuia, setLineaGuia, sizeT, showTB, setshowTB, scaleRatio, setscaleRatio, translateX, setTranslateX, translateY, statusLn, setStatusLn, setTranslateY, grid, setGrid, onAddText, editText, setEditText, guidesO, setGuidesO, guidesD, setGuidesD, ...props }) {
  const { coordXY, setcoordXY, coordXYT, setcoordXYT, coordLn, setCoordLn } = useTemplate();
  const [statusMove, setStatusMove] = useState(1);

  // const [guidesO, setGuidesO] = useState({
  //   status: false,
  //   point: [
  //     { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
  //   ],
  //   anchor: -1,
  //   idx: 0
  // });

  // const [guidesD, setGuidesD] = useState({
  //   status: false,
  //   point: [
  //     { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
  //   ],
  //   anchor: -1,
  //   idx: 0
  // });

  const { handleTouchDownElement, handleTouchMoveElement, handleTouchUpElement } = useMoveComponent(lineaGuia, setLineaGuia, statusLn, setStatusLn, scaleRatio, statusMove, setStatusMove, guidesO, setGuidesO, guidesD, setGuidesD);
  const { handleTouchDownSk, handleTouchMoveSk, handleTouchEndSk } = useMoveSketch(statusLn, setStatusLn, scaleRatio, translateX, translateY, setTranslateX, setTranslateY, setscaleRatio, statusMove, setStatusMove);
  const { handleTouchDownText, handleTouchMoveText, handleTouchUpText } = useMoveText(widthSk, heightSk, sizeSquare, scaleRatio, statusMove, setStatusMove);
  const { handleTouchDownLine } = useLineNode();
  // new States ----------------------------------------------//
  
  //------------------------------------------------------------//
  const nCuadradosH = (heightSk - (heightSk % sizeSquare)) / sizeSquare;
  const nCuadradosV = (widthSk - (widthSk % sizeSquare)) / sizeSquare;

  const coordsY = new Array(nCuadradosV).fill("");
  const coordsX = new Array(nCuadradosH).fill("");

  const setId = new Set();
  let duplicateCount = 0;

  let lol = ['1'];


  return (
    <View
      style={{
        position: "relative",
        width: width,
        height: height,
        backgroundColor: "#fff",
      }}
      onTouchStart={(e) => handleTouchDownSk(e)}
      onTouchMove={(e) => handleTouchMoveSk(e)}
      onTouchEnd={(e) => handleTouchEndSk(e)}
    >
      <Grid
        grid={grid}
        sizeSquare={sizeSquare}
        coordsX={coordsX}
        coordsY={coordsY}
      />

      {lineaGuia.status
        ? lol.map((item, idx) => {
          let comp_origin, comp_destiny;

          coordXY.map((item) => {
            if (item.id_u == lineaGuia.id_component_origin) {
              comp_origin = item;
            }
            if (item.id_u == lineaGuia.id_component_destiny) {
              comp_destiny = item;
            }
          })

          let x1 = parseInt(comp_origin.x)
          let y1 = parseInt(comp_origin.y)

          if (parseInt(lineaGuia.ancla1) == 0) { x1 += sizeSquare }
          else if (parseInt(lineaGuia.ancla1) == 1) { x1 += sizeSquare * 2; y1 += sizeSquare }
          else if (parseInt(lineaGuia.ancla1) == 2) { x1 += sizeSquare; y1 += sizeSquare * 2 }
          else if (parseInt(lineaGuia.ancla1) == 3) { y1 += sizeSquare }

          let x2 = parseInt(comp_destiny.x)
          let y2 = parseInt(comp_destiny.y)

          if (parseInt(lineaGuia.ancla2) == 0) { x2 += sizeSquare }
          else if (parseInt(lineaGuia.ancla2) == 1) { x2 += sizeSquare * 2; y2 += sizeSquare }
          else if (parseInt(lineaGuia.ancla2) == 2) { x2 += sizeSquare; y2 += sizeSquare * 2 }
          else if (parseInt(lineaGuia.ancla2) == 3) { y2 += sizeSquare }

          let distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          let angulo = Math.atan2(y2 - y1, x2 - x1);

          return (
            <View
              key={idx}
              style={{
                position: 'absolute',
                left: x1,
                top: y1,
                width: distancia,
                height: 2,
                backgroundColor: '#ff0000',
                transform: [
                  { translateX: (-distancia / 2) },
                  { rotate: `${angulo}rad` },
                  { translateX: (distancia / 2) },
                ],
                zIndex: 200
              }}>
            </View>
          )
        })
        : null}

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

          let x1 = parseInt(comp_origin?.x)
          let y1 = parseInt(comp_origin?.y)

          if (item.ancla1 == 0) { x1 += sizeSquare }
          else if (item.ancla1 == 1) { x1 += sizeSquare * 2; y1 += sizeSquare }
          else if (item.ancla1 == 2) { x1 += sizeSquare; y1 += sizeSquare * 2 }
          else if (item.ancla1 == 3) { y1 += sizeSquare }

          let y2 = parseInt(comp_destiny?.y)
          let x2 = parseInt(comp_destiny?.x)

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
              onTouchStart={(e) => handleTouchDownLine(e, idx)}
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


      {guidesO.status && statusLn != 0
        ? guidesO.point.map((item, idx) => {


          let colorG = "#7474746b"
          if (idx == guidesO.anchor) {
            colorG = "#ff00006b"
          }

          let guideAux = idx + 1
          guideAux += (guidesO.coord.rotate / 90)
          while (guideAux > 4) guideAux -= 4

          if ((guideAux == 1 && guidesO.coord.ancla1 == 1) ||
            (guideAux == 2 && guidesO.coord.ancla2 == 1) ||
            (guideAux == 3 && guidesO.coord.ancla3 == 1) ||
            (guideAux == 4 && guidesO.coord.ancla4 == 1)) {

            return (
              <View
                key={idx}
                style={{
                  position: 'absolute',
                  left: item.x - 8,
                  top: item.y - 8,
                  width: 15,
                  height: 15,
                  backgroundColor: colorG,
                  zIndex: 1000,
                  borderRadius: 7
                }}
                onTouchStart={(e) => {

                  if (lineaGuia.id_component_origin === guidesO.coord.id_u) {

                    setLineaGuia(prevState => ({
                      ...prevState,
                      ancla1: idx,
                    }))

                    setGuidesO(prevState => ({
                      ...prevState,
                      anchor: idx
                    }))

                  }
                  else if (lineaGuia.id_component_destiny === guidesO.coord.id_u) {
                    setLineaGuia(prevState => ({
                      ...prevState,
                      ancla2: idx,
                    }))
                  }

                }}
              >
              </View>
            )

          }
        })
        : null}

      {guidesD.status && statusLn != 0
        ? guidesD.point.map((item, idx) => {

          let colorG = "#7474746b"
          if (idx == guidesD.anchor) {
            colorG = "#ff00006b"
          }

          let guideAux = idx + 1
          guideAux += (guidesD.coord.rotate / 90)
          while (guideAux > 4) guideAux -= 4

          if ((guideAux == 1 && guidesD.coord.ancla1 == 1) ||
            (guideAux == 2 && guidesD.coord.ancla2 == 1) ||
            (guideAux == 3 && guidesD.coord.ancla3 == 1) ||
            (guideAux == 4 && guidesD.coord.ancla4 == 1)) {

            return (
              <View
                key={idx}
                style={{
                  position: 'absolute',
                  left: item.x - 8,
                  top: item.y - 8,
                  width: 15,
                  height: 15,
                  backgroundColor: colorG,
                  zIndex: 1000,
                  borderRadius: 7
                }}
                onTouchStart={(e) => {

                  if (lineaGuia.id_component_origin === guidesD.coord.id_u) {

                    setLineaGuia(prevState => ({
                      ...prevState,
                      ancla1: idx,
                    }))

                    setGuidesD(prevState => ({
                      ...prevState,
                      anchor: idx
                    }))
                  }
                  else if (lineaGuia.id_component_destiny === guidesD.coord.id_u) {
                    setLineaGuia(prevState => ({
                      ...prevState,
                      ancla2: idx,
                    }))

                    setLineaGuia(prevState => ({
                      ...prevState,
                      status: true
                    }))

                    setGuidesD(prevState => ({
                      ...prevState,
                      anchor: idx
                    }))
                  }

                }}
              >
              </View>
            )

          }
        })
        : null}


      {coordXY
        ? coordXY.map((item, idx) => {
          return (
            <ComponentSketch
              key={coordXY[idx].id_u}
              rotate={coordXY[idx]?.rotate}
              idx={idx}
              coordXY={coordXY}
              handleTouchDownElement={handleTouchDownElement}
              handleTouchMoveElement={handleTouchMoveElement}
              handleTouchUpElement={handleTouchUpElement}
              isSelected={coordXY[idx]?.isSelected}
              sizeSquare={sizeSquare}
              scaleX={coordXY[idx]?.scaleX}
              scaleY={coordXY[idx]?.scaleY}
            >
              <ComponentDiagram
                path={coordXY[idx]?.path}
                sizeSquare={sizeSquare}
                scaleX={coordXY[idx]?.scaleX}
                scaleY={coordXY[idx]?.scaleY}
              />
            </ComponentSketch>
          )
        }) : null}

      {coordXYT
        ? coordXYT.map((item, idx) => (
          <ComponentSketch
            key={idx}
            rotate={item?.rotate}
            type={item?.type}
            idx={idx}
            coordXY={coordXYT}
            handleTouchDownElement={handleTouchDownText}
            handleTouchMoveElement={handleTouchMoveText}
            handleTouchUpElement={handleTouchUpText}
            isSelected={item?.isSelected}
            sizeSquare={sizeSquare}
            scaleX={item?.scaleX}
            scaleY={item?.scaleY}
            textWidth={item?.nombre.length}
          >
            <Text
              style={{ width: "auto", fontSize: item?.size, backgroundColor: "transparent" }}
            >
              {coordXYT[idx].nombre}
            </Text>
          </ComponentSketch>
        ))
        : null}
    </View>
  );
};