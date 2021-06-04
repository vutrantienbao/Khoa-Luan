import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

export function DrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('./src/assets/logoRE.png')}
        style={styles.sideMenuLogo}
      />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  sideMenuLogo: {
    resizeMode: 'center',
    width: 280,
    height: 250,
    alignSelf: 'center',
  },
});
