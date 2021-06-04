import React from 'react'


import { createStackNavigator } from '@react-navigation/stack';

import Login from "../components/Login";
import Regis from '../components/Regis';
import Data from '../components/Data';

const Stack = createStackNavigator();

const NavigationAuth = () => {
    return (

        <Stack.Navigator initialRouteName=" " screenOptions={{
            headerTransparent: true,
        }}>

            <Stack.Screen name="  " component={Data} />
            <Stack.Screen name=" " component={Login} />
            <Stack.Screen name="Login" component={Regis} />
        </Stack.Navigator>

    );
}

export default NavigationAuth