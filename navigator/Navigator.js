import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SketchBoard from '../Screens/SketchBoard';
import Diagrams from '../Screens/Diagrams';
import Login from '../Screens/Login';
import { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
import Loading from '../Screens/Loading';
import Plantillas from '../Screens/Plantillas';


const Stack = createNativeStackNavigator();

export default function Navigator({ data, setData }) {
  const { status, signIn, checkToken, isOnline, checkInternetConnection, } = useContext(authContext);

  if (status === 'checking') return <Loading />

  useEffect(() => {
    if (data && data.queryParams && data.queryParams.username && data.queryParams.password) {
      const username = data.queryParams.username;
      const password = data.queryParams.password;
      checkInternetConnection();
      if (isOnline) {
        signIn({ username: username, password: password }); //username & password
      }
    }
    checkToken();
  }, [data])

  return (
    <Stack.Navigator initialRouteName="Login">
      {status !== "authenticated" ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      ) : (
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
      )}
    </Stack.Navigator>
  );
}