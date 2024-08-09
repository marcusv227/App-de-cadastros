import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Primeiro from './components/Primeiro'
import Segundo from './components/Segundo'
import { Image } from "react-native";

const Tab = createBottomTabNavigator()

function App() {
    return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Cadastro" component={Primeiro} options={{headerShown: false}}/>
            <Tab.Screen name="Lista" component={Segundo} options={{headerShown: false}}/>
        </Tab.Navigator>
    </NavigationContainer>
    )
}
export default App;