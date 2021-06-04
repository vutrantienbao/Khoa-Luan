import React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from './src/components/Dashboard';
import Infor from './src/components/Infor';
import Intro from './src/components/Intro';
import NavigationAuth from './src/navigators/NavigationAuth';
import { DrawerContent } from './DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigating Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>

        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: '#bbcfff',
            marginTop: -15,
          }}>
          <Image
            source={require('./src/assets/menu.png')}
            style={{
              width: 30,
              height: 30,
              marginTop: 5.5,
              marginLeft: 10,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

function dashboardScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTransparent: true,
          headerTitle: null,
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

function loginScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={NavigationAuth}
        options={{
          headerTransparent: true,
          headerTitle: null,
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}


function inforScreenStack({ navigation }) {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Information"
        component={Infor}
        options={{
          headerTransparent: true,
          headerTitle: null,
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}
function introScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Introduce"
        component={Intro}
        options={{
          headerTransparent: true,
          headerTitle: null,
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}></Stack.Screen>

    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Dashboard"
          options={{ drawerLabel: 'Trang chính' }}
          component={dashboardScreenStack}
        />
        <Drawer.Screen
          name="Thông tin"
          options={{ drawerLabel: 'Thông tin' }}
          component={inforScreenStack}
        />
        <Drawer.Screen
          name="Giới thiệu"
          options={{ drawerLabel: 'Giới thiệu' }}
          component={introScreenStack}
        />
        <Drawer.Screen
          name="Số liệu"
          options={{ drawerLabel: "Số liệu" }}
          component={loginScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
