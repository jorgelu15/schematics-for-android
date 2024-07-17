import { Dimensions, View } from "react-native";
const { width, height } = Dimensions.get('window');
const Modal = ({ children, ...props }) => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1000,
        padding: 20,
        alignSelf: "center",
        top: height / 4,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        width: width - 50
      }}
    >
      {children}
    </View>
  );
}

export default Modal;