import { Link, NavigationContainer } from '@react-navigation/native';

import TemplateState from './context/template/templateState';
import AuthState from './context/auth/authState';
import Navigator from './navigator/Navigator';

import * as Linking from 'expo-linking';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

const prefix = Linking.createURL('/')

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

  function handleDeepLink(event) {
    let data = Linking.parse(event.url)
    setData(data);
  }

  useEffect(() => {

    Linking.addEventListener("url", handleDeepLink);

    return () => {
      Linking.removeEventListener("url");
    }
  }, [])

  return (
    <NavigationContainer linking={linking} fallback={<Text>Cargando...</Text>}>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}