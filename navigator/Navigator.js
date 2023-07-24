import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SketchBoard from '../Screens/SketchBoard';
import Diagrams from '../Screens/Diagrams';
import Login from '../Screens/Login';
import { useContext } from 'react';
import authContext from '../context/auth/authContext';
import Loading from '../Screens/Loading';
import Plantillas from '../Screens/Plantillas';


const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { status } = useContext(authContext);

  if (status === 'checking') return <Loading />

  return (
    <Stack.Navigator initialRouteName="Login">
      {/* {status !== "authenticated" ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      ) : ( */}
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
      {/* )} */}
    </Stack.Navigator>
  );
}