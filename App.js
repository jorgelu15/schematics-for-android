import { Text, AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { useEffect, useState } from 'react';
import { Link, NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import TemplateState from './context/template/templateState';
import AuthState from './context/auth/authState';
import Navigator from './navigator/Navigator';

const prefix = Linking.createURL('/Login')

function AppState({ children, ...props }) {
  return (
    <AuthState>
      <TemplateState>
        {children}
      </TemplateState>
    </AuthState>
  );
}

export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Login: "Login",
        SketchBoard: "SketchBoard",
        Diagramas: "Diagramas",
        Plantillas: "Plantillas"
      }
    },
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getInitialURL() {
      try {
        const initialURL = await Linking.getInitialURL();
        if (initialURL) {
          setData(Linking.parse(initialURL));
        }
      } catch (error) {
        console.error("Error getting initial URL:", error);  //{queryParams: {username: "1217.1217"}}
      }
    }

    if (!data) {
      getInitialURL();
    }

  }, [data])
  console.log(data)
  return (
    <NavigationContainer linking={linking} fallback={<Text>Cargando...</Text>}>
      <AppState>
        <Navigator data={data} setData={setData} />
      </AppState>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('app', () => App);
// registerRootComponent(App);