import React from 'react'
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import TemplateContext from '../../context/template/templateContext';
import { useTextComponent } from '../../hooks/useTextComponent';

const TaskBarBottom = ({ isSelected, idx, isText, editText, setEditText, setSizeT, statusLn, setStatusLn, lineaGuia, setLineaGuia, guidesO, setGuidesO, guidesD, setGuidesD, ...props }) => {
  
  const { coordXY, coordXYT, coordLn, setcoordXY, setcoordXYT, handleSizeTDecrease, handleSizeTIncrease, setCoordLn } = useTextComponent();
  const calcRotate = (rotate) => {
    rotate = parseInt(rotate) + 90;
    if (rotate === 360) return rotate = 0;
    else return parseInt(rotate);
  }

  const handleRotate = () => {
    const updatedCoordXY = [...coordXY];

    let coordRot
    for (let i = 0; i < updatedCoordXY.length; i++) {
      if (updatedCoordXY[i].isSelected) {
        updatedCoordXY[i].rotate = calcRotate(updatedCoordXY[i].rotate);
        coordRot = updatedCoordXY[i];
      }
    }
    setcoordXY(updatedCoordXY);

    if (coordRot) {
      const updatedCoordLn = [...coordLn];

      for (let i = 0; i < updatedCoordLn.length; i++) {
        if (updatedCoordLn[i].id_component_origin == coordRot.id_u) {
          updatedCoordLn[i].ancla1 = updatedCoordLn[i].ancla1 + 1
          if (updatedCoordLn[i].ancla1 == 4) updatedCoordLn[i].ancla1 = 0
        }

        if (updatedCoordLn[i].id_component_destiny == coordRot.id_u) {
          updatedCoordLn[i].ancla2 = updatedCoordLn[i].ancla2 + 1
          if (updatedCoordLn[i].ancla2 == 4) updatedCoordLn[i].ancla2 = 0
        }
      }
      setCoordLn(updatedCoordLn);
    }
    

    const updatedCoordXYT = [...coordXYT];

    for (let i = 0; i < updatedCoordXYT.length; i++) {
      if (updatedCoordXYT[i].isSelected) {
        updatedCoordXYT[i].rotate = calcRotate(updatedCoordXYT[i].rotate);
      }
    }

    setcoordXYT(updatedCoordXYT);
  };

  const handleCompletedLn = () => {

    if(lineaGuia.id_component_origin === -1 || lineaGuia.id_component_destiny === -1 ||
      lineaGuia.ancla1 === -1 || lineaGuia.ancla2 === -1) return

    setCoordLn([...coordLn,
      {
          id_component_origin_db: 0,
          id_component_origin: lineaGuia.id_component_origin,
          id_component_destiny_db: 0,
          id_component_destiny: lineaGuia.id_component_destiny,
          ancla1: lineaGuia.ancla1,
          ancla2: lineaGuia.ancla2,
          isSelected: false
      }
      ])

      setStatusLn(0)

      setLineaGuia(prevState => ({
        ...prevState,
        id_component_origin: -1,
        id_component_destiny: -1,
        ancla1: -1,
        ancla2: -1,
        status: false
      }))

      setGuidesO(prevState => ({
        ...prevState,
        idx: 0,
        anchor: -1,
        status: false
      }))

      setGuidesD(prevState => ({
        ...prevState,
        idx: 0,
        anchor: -1,
        status: false
      }))

  };

  const handleCancelLn = () => {

      setStatusLn(0)

      setLineaGuia(prevState => ({
        ...prevState,
        id_component_origin: -1,
        id_component_destiny: -1,
        ancla1: -1,
        ancla2: -1,
        status: false
      }))

      setGuidesO(prevState => ({
        ...prevState,
        idx: 0,
        anchor: -1,
        status: false
      }))
      setGuidesD(prevState => ({
        ...prevState,
        idx: 0,
        anchor: -1,
        status: false
      }))

  };

  const onRemoveComponent = (idx) => {

    if (coordLn?.length > 0) {
      const newCoordLn = coordLn.filter(
        (cLn) =>
          cLn.id_component_origin !== coordXY[idx].id_u &&
          cLn.id_component_destiny !== coordXY[idx].id_u
      );
      setCoordLn(newCoordLn);
    }

    const newCoordXY = coordXY.filter((item, index) => !item.isSelected);
    setcoordXY(newCoordXY);

    const newCoordXYT = coordXYT.filter((item, index) => !item.isSelected);
    setcoordXYT(newCoordXYT);
  };

  const handleOnChangeText = (idx) => {
    setEditText({ ...editText, status: !editText.status, idx: idx });
  }
  
  return (
    <View
      style={{
        display: (isSelected || statusLn == 1) ? "flex" : "none",
        alignSelf: "center",
        position: "absolute",
        bottom: 100,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          backgroundColor: "#f1f1f1",
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        {isText &&
          <Pressable onPress={() => handleOnChangeText(idx)}>
            <Feather
              name="edit"
              size={24}
              style={{ padding: 10 }}
              color="black"
            />
          </Pressable>
        }
        {isText &&
          <Pressable onPress={() => handleSizeTIncrease(idx)}>
            <MaterialCommunityIcons
              name="format-font-size-increase"
              size={24} style={{ padding: 10 }}
              color="black"
            />
          </Pressable>
        }
        {isText &&
          <Pressable onPress={() => handleSizeTDecrease(idx)}>
            <MaterialCommunityIcons
              name="format-font-size-decrease"
              size={24} style={{ padding: 10 }}
              color="black"
            />
          </Pressable>
        }
        {statusLn == 1 &&
        <Pressable onPress={() => handleCompletedLn()}>
          <AntDesign name="checkcircleo" size={24} color="black" style={{ padding: 10 }} />
        </Pressable>
        }
        {statusLn == 1 &&
        <Pressable onPress={() => handleCancelLn()}>
          <MaterialCommunityIcons name="cancel" size={24} color="black" style={{ padding: 10 }} />
        </Pressable>
        }
        {statusLn != 1 &&
        <Pressable onPress={() => handleRotate()}>
          <MaterialIcons
            name="rotate-90-degrees-ccw"
            size={24}
            style={{ padding: 10 }}
            color="black"
          />
        </Pressable>
        }
        {statusLn != 1 &&
        <Pressable onPress={() => onRemoveComponent(idx)}>
          <Ionicons
            name="trash"
            size={24}
            style={{ padding: 10 }}
            color="black"
          />
        </Pressable>
        }
      </View>
    </View>
  );
}

export default TaskBarBottom;