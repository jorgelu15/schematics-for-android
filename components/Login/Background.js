import * as React from "react"
import { ImageBackground, View } from "react-native";
import Bg from '../../assets/background.jpeg';
export default function Background(props) {
  return (
    <View>
      <ImageBackground
        source={Bg}
        style={{ height: "100%", top: -180 }}
      />
      <View style={{position: "absolute"}}>
        {props.children}
      </View>
    </View>
  )
}