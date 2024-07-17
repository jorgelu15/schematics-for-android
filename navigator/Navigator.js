import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SketchBoard from '../Screens/SketchBoard';
import Diagrams from '../Screens/Diagrams';
import Login from '../Screens/Login';
import { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
import Loading from '../Screens/Loading';
import Plantillas from '../Screens/Plantillas';


const Stack = createNativeStackNavigator();

export default function Navigator() {

  return (
    <Stack.Navigator initialRouteName="Login">

      <>
        <Stack.Screen
          name="SketchBoard"
          component={SketchBoard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Diagramas" component={Diagrams} />
        <Stack.Screen name="Plantillas" component={Plantillas} />
      </>
    </Stack.Navigator>
  );
}