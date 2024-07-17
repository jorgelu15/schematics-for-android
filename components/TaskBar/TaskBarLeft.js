import React, { useContext } from 'react'
import { View, Pressable } from 'react-native'
import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import authContext from '../../context/auth/authContext';
const TaskBarLeft = ({ coordXYT, setcoordxyprev, setcoordxytprev, logOut, handleOpenModalCloseTemplate, onSyncronizeTemplatesWithDB, onUpdateTemplates, onSaveImageAsync, onSaveTemplates, styles, navigation: { navigate }, grid, setGrid, coordXY, modalprint, setmodalprint, onUndo, onRedo, setextModal, textModal, statusLn, setStatusLn, ...props }) => {
  const { status } = useContext(authContext);
  const [taskbarleft, settaskbarleft] = React.useState({
    state: false,
    left: -45,
  });

  const handletaskbarleft = () => {
    if (taskbarleft.state) {
      settaskbarleft({ ...taskbarleft, left: -45, state: false })
    } else {
      settaskbarleft({ ...taskbarleft, left: 0, state: true })
    }
  }

  const handleGrid = () => {
    setGrid(!grid);
    setmodalprint(false)
  }

  const handleText = () => {
    setextModal(!textModal)
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "#f1f1f1",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        left: taskbarleft.left,
        top: 100,
      }}
    >
      <View style={{ position: "relative" }}>
        <Pressable
          onPress={() => navigate("Diagramas")}
          style={{ padding: 10 }}
        >
          <Ionicons name="add" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => navigate("Plantillas")}
          style={{ padding: 10 }}
        >
          <MaterialIcons name="list-alt" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => {
          coordXY.length > 1 ? setStatusLn(1) : setStatusLn(0)
        }} style={{ padding: 10 }}>
          <MaterialCommunityIcons
            name="resistor-nodes"
            size={24}
            color="black"
            style={{
              backgroundColor: statusLn ? "#bebebe" : "#f1f1f1"
            }}
          />
        </Pressable>
        <Pressable onPress={() => handleText()} style={{ padding: 10 }}>
          <Ionicons name="text" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => handletaskbarleft()}
          style={{
            padding: 10,
            backgroundColor: "#A0C645",
            position: "absolute",
            top: 0,
            left: 45,
          }}
        >
          <Entypo
            name={taskbarleft.state ? "chevron-left" : "chevron-right"}
            size={24}
            color="black"
          />
        </Pressable>
        <Pressable onPress={() => onSaveTemplates()} style={{ padding: 10 }}>
          <Entypo name="save" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => onUpdateTemplates()} style={{ padding: 10 }}>
          <MaterialIcons name="update" size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleGrid} style={{ padding: 10 }}>
          <MaterialCommunityIcons
            name={grid ? "grid-off" : "grid"}
            size={24}
            color="black"
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setGrid(true);
            setmodalprint(true);
            setcoordxyprev(coordXY);
            setcoordxytprev(coordXYT);
          }}
          style={{ padding: 10 }}
        >
          <Entypo name="print" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => handleOpenModalCloseTemplate(true)}
          style={{ padding: 10 }}
        >
          <MaterialCommunityIcons
            name="folder-remove"
            size={24}
            color="black"
          />
        </Pressable>

      </View>
    </View>
  );
}


export default TaskBarLeft;