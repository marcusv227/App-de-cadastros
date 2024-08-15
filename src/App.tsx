import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Primeiro from './components/Primeiro'
import Segundo from './components/Segundo'
import { View } from "react-native";
import Icon  from "react-native-vector-icons/AntDesign";
import IconList  from "react-native-vector-icons/Entypo";

const Tab = createBottomTabNavigator()

function App() {
    return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Cadastro" component={Primeiro} options={{headerShown: false, tabBarIcon: ({focused}) => {
                return (<View><Icon name="home" size={24} color={focused? 'blue' : 'grey'}></Icon></View>)
            }}}/>
            <Tab.Screen name="Lista" component={Segundo} options={{headerShown: false, tabBarIcon: ({focused}) => {
                return (<View><IconList name="list" size={24} color={focused? 'blue' : 'grey'}></IconList></View>)
            }}}/>
        </Tab.Navigator>
    </NavigationContainer>
    )
}
export default App;