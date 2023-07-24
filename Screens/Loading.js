import { ActivityIndicator, View } from "react-native";

const Loading = () => {
    return ( 
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size={50} color="#375176" />
        </View>
     );
}
 
export default Loading;