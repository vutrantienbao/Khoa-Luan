import * as React from 'react';
import {
    Button,
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import tailwind from 'tailwind-rn';

const Data = ({ navigation }) => {
    const logOut = () => {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        AsyncStorage.clear();
                        navigation.replace(' ');
                    },
                },
            ],
            { cancelable: false },
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[tailwind('bg-red-300 rounded-md flex justify-center items-center'), styles.btnLogout]} onPress={logOut} >
                    <Text style={[tailwind('text-white font-bold text-sm'), { fontFamily: "serif" }]}>
                        ĐĂNG XUẤT
                        </Text>
                </TouchableOpacity>
            </View>
            <View style={[tailwind('flex flex-col  justify-center items-center'), styles.container]}>
                <View style={tailwind('flex flex-row justify-around items-center pb-8')}>
                    <TouchableOpacity style={[tailwind('bg-blue-300 flex justify-center items-center rounded-full '), styles.datags]} onPress={() =>
                        Linking.openURL(
                            'https://api-rewes.glitch.me',
                        )}>
                        <Text style={[tailwind("text-white font-bold text-sm text-center"), styles.txt]}>API DATA ESP (MONGODB)</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.3 }} />
                    <TouchableOpacity style={[tailwind('bg-blue-300 flex justify-center items-center rounded-full'), styles.datags]} onPress={() =>
                        Linking.openURL(
                            'https://api-ibm.glitch.me',
                        )}>
                        <Text style={[tailwind("text-white font-bold text-sm text-center"), styles.txt]}>API DATA NI (MONGODB)</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
};



export default Data;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btnLogout: {
        height: 40,
        width: DEVICE_WIDTH - 280,
        marginTop: 15,
        marginLeft: 15,
        padding: 10,
    },
    datags: {
        width: DEVICE_WIDTH - 250,
        marginTop: 2,
        padding: 8,
    },
    container: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    },
    txt: {
        fontFamily: "serif"
    }
})