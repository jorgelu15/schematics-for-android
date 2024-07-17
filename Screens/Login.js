import { StatusBar } from "expo-status-bar";
import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableHighlight } from "react-native";
import { Dimensions, View, Text, TextInput, Pressable } from "react-native";
import Logo from '../assets/logo.png';
import { Entypo } from '@expo/vector-icons';
import Background from "../components/Login/Background";
import { useForm } from "../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import authContext from "../context/auth/authContext";
import templateContext from "../context/template/templateContext";

const { width, height } = Dimensions.get('window');


const Login = () => {
  const { credentialsME, status, signIn, errorMessage, removeError, addError, checkToken, setCredentialsME, usuarioAutenticado } = useContext(authContext);
  const { getTemplates } = useContext(templateContext);

  const { username, password, onChange } = useForm({
    username: '',
    password: ''
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (errorMessage?.length === 0) return;
    setTimeout(() => {
      removeError();
    }, 5000)
  }, [errorMessage])

  useEffect(()=> {
    if(status === "not-authenticated") {
      usuarioAutenticado();
    }
    if(status === "authenticated") {
      navigate("Diagramas");
    }
  }, [status])

  const onLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      addError();
      return;
    }

    Keyboard.dismiss();
    signIn(credentialsME ? credentialsME : { username, password });
  }

  return (
    <KeyboardAvoidingView
      style={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Background>
        <StatusBar hidden={true} backgroundColor="white" style="auto" />
        <View
          style={{
            position: "relative",
            marginTop: 120,
            width: width,
            height: height - 120,
            backgroundColor: "white",
            borderTopLeftRadius: 100,
            alignItems: "center",
            backgroundColor: "#fff",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View style={{ width: width - 50 }}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={Logo}
                style={{
                  width: width - 100,
                  height: 100,
                  resizeMode: "contain",
                  marginVertical: 50,
                }}
              />
            </View>
            <View>
              <Text style={{ color: "#000000" }}>Nombre de usuario</Text>
              <TextInput
                placeholder="Nombre de Usuario"
                keyboardType="default"
                onChangeText={(value) => onChange(value, "username")}
                value={username}
                onSubmitEditing={onLogin}
                style={{
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: "#F0F0F2",
                  borderRadius: 3,
                }}
              />
            </View>
            <View>
              <Text style={{ color: "#000000" }}>Contraseña</Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  placeholder="Contraseña"
                  onChangeText={(value) => onChange(value, "password")}
                  value={password}
                  onSubmitEditing={onLogin}
                  secureTextEntry={show ? false : true}
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: "#F0F0F2",
                    borderRadius: 3,
                  }}
                />
                <Pressable onPress={() => setShow(!show)} style={{
                  position: "absolute",
                  top: 22,
                  right: 10
                }}>
                  <Entypo name={show ? "eye-with-line" : "eye"} size={24} color="black" />
                </Pressable>
              </View>
            </View>
            <View>
              <Pressable
                onPress={onLogin}
                style={{
                  backgroundColor: "#47b2e4",
                  borderRadius: 3,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "700", color: "#FFFFFF" }}>
                  INICIAR SESIÓN
                </Text>
              </Pressable>
            </View>
            {errorMessage !== "checking" ? (
              <View style={{ position: 'absolute', top: -50, right: 0 }}>
                <View
                  style={{
                    backgroundColor: "#e2790a",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>{errorMessage}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Background>
    </KeyboardAvoidingView>
  );
}

export default Login;