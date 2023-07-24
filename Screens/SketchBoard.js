import { AntDesign } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Sketch from '../components/Sketch/Sketch';
import TaskBarLeft from '../components/TaskBar/TaskBarLeft';

import TaskBarBottom from '../components/TaskBar/TaskBarbottom';

import authContext from '../context/auth/authContext';
import { Text } from 'react-native';
import Modal from '../components/utils/Modal';
import { useTemplate } from '../hooks/useTemplate';
import { useSaveFile } from '../hooks/useSaveFile';
import { useTextComponent } from '../hooks/useTextComponent';
import { useForm } from '../hooks/useForm';


const { width, height } = Dimensions.get("window");
export default function SketchBoard({ navigation, ...props }) {
  const [templateName, setTemplateName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorAlert, setErrorAlert] = useState('');
  const [showModalCloseTemplate, setshowModalCloseTemplate] = useState(false);
  const [grid, setGrid] = useState(false);
  const [sizeT, setSizeT] = useState(12);
  const sketchRef = React.useRef();

  const [lineaGuia, setLineaGuia] = useState({
    idServer: 0,
    id_component_origin: -1,
    id_component_destiny: -1,
    ancla1: -1,
    ancla2: -1,
    status: false
  })

  const [guidesO, setGuidesO] = useState({
    status: false,
    point: [
      { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
    ],
    anchor: -1,
    idx: 0
  });

  const [guidesD, setGuidesD] = useState({
    status: false,
    point: [
      { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
    ],
    anchor: -1,
    idx: 0
  });

  const { logOut } = useContext(authContext);
  const { onSaveImageAsync } = useSaveFile(sketchRef, setGrid);
  const { onAddText } = useTextComponent();
  const { coordXY, coordXYT, coordLn, setCoordLn, translateX, translateY, onSaveTemplates, onCloseTemplates, onUpdateTemplates, setcoordXYT, setTranslateX, setTranslateY, onSyncronizeTemplatesWithDB } = useTemplate(templateName, setTemplateName, setErrorAlert, setShowModal, setshowModalCloseTemplate);
  const { status } = useContext(authContext);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };


  const [scaleRatio, setscaleRatio] = React.useState(1); //Mejora si se usa como context
  // const [translateX, setTranslateX] = React.useState(0); //considerar meterlo en un custom hook
  // const [translateY, setTranslateY] = React.useState(0); //considerar meterlo en un custom hook
  const [showTB, setshowTB] = React.useState(false)


  const [textChange, setTextChange] = React.useState('');

  const [showAlert, setshowAlert] = React.useState(false);
  const [modalprint, setmodalprint] = React.useState(false);

  const [textModal, setextModal] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [editText, setEditText] = React.useState({ status: false, idx: null });
  const [statusLn, setStatusLn] = React.useState(0);


  const { username, password, onChange } = useForm({
    username: '',
    password: ''
  });

  const onLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      addError();
      return;
    }

    Keyboard.dismiss();
    signIn({ username, password });
  }

  const onUndo = () => {
  }

  const onRedo = () => {
  }

  const handleChange = e => {
    setTemplateName(e.nativeEvent.text);
  };

  const handleChangeText = e => {
    setTextChange(e.nativeEvent.text);
  };

  React.useEffect(() => {
  }, [scaleRatio, coordXYT])

  React.useEffect(() => {
  }, [translateX])

  React.useEffect(() => {
  }, [translateY])

  //---------------------------------------------------------------------------------------
  //guardar datos en local
  const handleSaveTemplate = () => {
    setTemplateName('');
    setShowModal(true)
  }

  const handleshowModalSaveTemplate = () => {
    setShowModal(false);
    setshowAlert(false);
    setErrorAlert('');
  }

  const onEditText = () => {
    setEditText({ ...editText, status: !editText.status });
  }

  const onChangeText = () => {
    const newCoordXYT = coordXYT.map((item, index) => index === editText.idx ? { ...item, nombre: textChange } : item);
    setcoordXYT(newCoordXYT);
    setTextChange('');
    setEditText({ ...editText, status: false });
  }

  //--------------------------------------------------------------------------------------
  //Borrar o cerrar el proyecto en el sketch
  const handleOpenModalCloseTemplate = () => {
    setshowModalCloseTemplate(!showModalCloseTemplate);
  }

  useEffect(() => {
  }, [coordXYT]);

  return (
    <View style={backgroundStyle}>
      <StatusBar hidden={true} backgroundColor="white" />
      <View style={{ display: "flex", position: "relative" }}>
        <View
          style={{
            display: "flex",
            backgroundColor: "white",
            width: width > 800 ? width - 800 + 800 : 800,
            height: height > 800 ? height - 800 + 800 : 800,
            position: "relative",
            transform: [
              { scale: scaleRatio },
              { translateX: translateX },
              { translateY: translateY },
            ],
          }}
          ref={sketchRef}
        >
          <Sketch
            lineaGuia={lineaGuia}
            setLineaGuia={setLineaGuia}
            coordLn={coordLn}
            setCoordLn={setCoordLn}
            showTB={showTB}
            setshowTB={setshowTB}
            scaleRatio={scaleRatio}
            setscaleRatio={setscaleRatio}
            translateX={translateX}
            setTranslateX={setTranslateX}
            translateY={translateY}
            setTranslateY={setTranslateY}
            grid={grid}
            setGrid={setGrid}
            statusLn={statusLn}
            setStatusLn={setStatusLn}
            sizeT={sizeT}
            guidesO={guidesO}
            setGuidesO={setGuidesO}
            guidesD={guidesD}
            setGuidesD={setGuidesD}
          />
        </View>
        {showModal ? (
          <Modal>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                justifyContent: "space-between",
                borderBottomColor: "#bebebe",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Guardar Plantilla
              </Text>
              <Pressable onPress={() => handleshowModalSaveTemplate()}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View>
              <Text style={{ marginVertical: 10 }}>Nombre de la plantilla</Text>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#bebebe",
                  padding: 10,
                  borderRadius: 5,
                }}
                onChange={handleChange}
                value={templateName}
                placeholder="Define un nombre para la plantilla"
                keyboardType="default"
              />
            </View>
            <View>
              <Pressable onPress={() => onSaveTemplates()}>
                <View
                  style={{
                    display: "flex",
                    marginVertical: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    padding: 10,
                    backgroundColor: "#7F6DF3",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    GUARDAR
                  </Text>
                </View>
              </Pressable>
              <Text style={{ color: "black" }}>{errorAlert}</Text>
            </View>
          </Modal>
        ) : null}
        {showModalCloseTemplate ? (
          <Modal>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                justifyContent: "space-between",
                borderBottomColor: "#bebebe",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Cerrar proyecto
              </Text>
              <Pressable onPress={() => handleOpenModalCloseTemplate(false)}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View>
              <Text style={{ marginVertical: 10 }}>
                Todos los cambios que no hayan sido guardados se perderan ¿desea
                continuar con esta acción?
              </Text>
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <TouchableOpacity
                onPress={() => onCloseTemplates()}
                style={{
                  backgroundColor: "#A0C645",
                  padding: 10,
                  borderRadius: 5,
                  width: width / 3,
                  alignItems: "center",
                }}
              >
                <Text>SI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOpenModalCloseTemplate(false)}
                style={{
                  backgroundColor: "#A0C645",
                  padding: 10,
                  borderRadius: 5,
                  width: width / 3,
                  alignItems: "center",
                }}
              >
                <Text>NO</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        ) : null}
        {grid && modalprint ?
          <Modal>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                justifyContent: "space-between",
                borderBottomColor: "#bebebe",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Generar imagen
              </Text>
              <Pressable onPress={() => { setGrid(!grid); setmodalprint(false) }}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View>
              <Text style={{ marginVertical: 10 }}>
                La siguiente imagen se generará en formato PNG,
                ¿Desea realizar esta accón?
              </Text>
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <TouchableOpacity
                onPress={() => onSaveImageAsync()}
                style={{
                  backgroundColor: "#A0C645",
                  padding: 10,
                  borderRadius: 5,
                  width: width / 3,
                  alignItems: "center",
                }}
              >
                <Text>SI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setGrid(false); setmodalprint(false) }}
                style={{
                  backgroundColor: "#A0C645",
                  padding: 10,
                  borderRadius: 5,
                  width: width / 3,
                  alignItems: "center",
                }}
              >
                <Text>NO</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          : null
        }
        {coordXY
          ? coordXY.map((_, idx) => (
            <TaskBarBottom
              key={idx}
              idx={idx}
              isSelected={coordXY[idx]?.isSelected}
              coordLn={coordLn}
              setCoordLn={setCoordLn}
              lineaGuia={lineaGuia}
              setLineaGuia={setLineaGuia}
              statusLn={statusLn}
              setStatusLn={setStatusLn}
              guidesO={guidesO}
              setGuidesO={setGuidesO}
              guidesD={guidesD}
              setGuidesD={setGuidesD}
            />
          ))
          : null}
        {coordXYT
          ? coordXYT.map((_, idx) => (
            <TaskBarBottom
              key={idx}
              idx={idx}
              isSelected={coordXYT[idx]?.isSelected}
              isText={coordXYT[idx]?.isSelected}
              textModal={textModal}
              editText={editText}
              setEditText={setEditText}
              setSizeT={setSizeT}
              lineaGuia={lineaGuia}
              setLineaGuia={setLineaGuia}
              statusLn={statusLn}
              setStatusLn={setStatusLn}
              guidesO={guidesO}
              setGuidesO={setGuidesO}
              guidesD={guidesD}
              setGuidesD={setGuidesD}
            />
          ))
          : null}
        {textModal &&
          <Modal>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                justifyContent: "space-between",
                borderBottomColor: "#bebebe",
                borderBottomWidth: 1,
                marginBottom: 10
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Añadir un texto
              </Text>
              <Pressable onPress={() => { setextModal(!textModal); setmodalprint(false) }}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: "#bebebe",
                padding: 10,
                borderRadius: 5,
              }}
              onChange={handleChangeText}
              value={textChange}
              placeholder="Escribe un texto"
              keyboardType="default"
            />
            <View>
              <Pressable onPress={() => onAddText(textChange, sizeT, setextModal)}>
                <View
                  style={{
                    display: "flex",
                    marginVertical: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    padding: 10,
                    backgroundColor: "#7F6DF3",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    AGREGAR
                  </Text>
                </View>
              </Pressable>
              <Text style={{ color: "black" }}>{errorAlert}</Text>
            </View>
          </Modal>
        }
        {
          editText.status &&
          <Modal>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                justifyContent: "space-between",
                borderBottomColor: "#bebebe",
                borderBottomWidth: 1,
                marginBottom: 10
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Editar texto
              </Text>
              <Pressable onPress={() => { setEditText({ ...editText, status: !editText.status }); setmodalprint(false) }}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: "#bebebe",
                padding: 10,
                borderRadius: 5,
              }}
              onChange={handleChangeText}
              value={textChange}
              placeholder="Escribe un texto"
              keyboardType="default"
            />
            <View>
              <Pressable onPress={onChangeText}>
                <View
                  style={{
                    display: "flex",
                    marginVertical: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    padding: 10,
                    backgroundColor: "#7F6DF3",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    ACTUALIZAR TEXTO
                  </Text>
                </View>
              </Pressable>
              <Text style={{ color: "black" }}>{errorAlert}</Text>
            </View>
          </Modal>
        }
        <TaskBarLeft
          logOut={logOut}
          onSaveTemplates={handleSaveTemplate}
          onSaveImageAsync={onSaveImageAsync}
          navigation={navigation}
          grid={grid}
          coordXY={coordXY}
          setGrid={setGrid}
          statusLn={statusLn}
          setStatusLn={setStatusLn}
          setmodalprint={setmodalprint}
          modalprint={modalprint}
          closeTemplate={onCloseTemplates}
          handleOpenModalCloseTemplate={handleOpenModalCloseTemplate}
          onUpdateTemplates={onUpdateTemplates}
          onUndo={onUndo}
          onRedo={onRedo}
          setextModal={setextModal}
          textModal={textModal}
          onSyncronizeTemplatesWithDB={onSyncronizeTemplatesWithDB}
        />
      </View>
    </View>
  );
}