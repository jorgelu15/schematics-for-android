import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Animated } from "react-native";
import IEC from '../components/Tabs/IEC';
import ANSI from '../components/Tabs/ANSI';
import UNIONES from '../components/Tabs/UNIONES';
import OTROS from '../components/Tabs/otros';

const Tab = createMaterialTopTabNavigator();


export default function Diagrams() {
    const av = new Animated.Value(0);
    av.addListener(() => { return });
    return (
        <Tab.Navigator
            screenListeners={{
                focus: () => {
                    Animated.timing(av, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                },
            }}>
            <Tab.Screen name='IEC' component={IEC} />
            <Tab.Screen name='ANSI' component={ANSI} />
            <Tab.Screen name='UNIONES' component={UNIONES} />
            <Tab.Screen name='OTROS' component={OTROS} />
        </Tab.Navigator>
    );
}