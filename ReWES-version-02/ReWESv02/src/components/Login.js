import React, { useState, createRef } from 'react'
import { Platform, StyleSheet, Text, Alert, View, TouchableOpacity, TextInput, Image, Dimensions, Button, Keyboard, } from 'react-native';
import tailwind from 'tailwind-rn';
import AsyncStorage from '@react-native-community/async-storage';


import Loader from '../containers/Loader';



const Login = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);
        let dataToSend = { email: userEmail, password: userPassword };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://api-rn.glitch.me/api/user/login', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    AsyncStorage.setItem('user_id', responseJson.data.email);
                    console.log(responseJson.data.email);
                    navigation.replace('  ');
                } else {
                    setErrortext(responseJson.msg);
                    console.log('Please check your email id or password');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.log("asd");
                console.error(error);
            });
    };

    return (
        <View style={tailwind('flex-1 flex-col justify-center items-center bg-white')}>
            <Loader loading={loading} />
            <Text style={[tailwind('text-purple-600 font-bold text-2xl'), { fontFamily: "serif" }]}>Đăng nhập để xem số liệu</Text>
            <View style={[tailwind('flex flex-col pt-8 pb-4 ')]}>
                <Text style={[tailwind('text-blue-400')]}>Email</Text>
                <TextInput placeholder=""

                    style={[tailwind('text-white bg-white'), styles.txtInput]}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        passwordInputRef.current &&
                        passwordInputRef.current.focus()
                    }
                    onChangeText={(UserEmail) =>
                        setUserEmail(UserEmail)
                    }
                />
            </View>
            <View style={[tailwind('flex flex-col pb-10 ')]}>
                <Text style={[tailwind('text-blue-400 ')]}>Password</Text>
                <TextInput placeholder=""
                    placeholderTextColor="black"
                    style={[tailwind('text-white bg-white'), styles.txtInput]}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType="next"
                    onChangeText={(UserPassword) =>
                        setUserPassword(UserPassword)
                    }

                />
            </View>
            {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                    {errortext}
                </Text>
            ) : null}
            <TouchableOpacity style={[tailwind('bg-blue-300 flex justify-center items-center rounded-full'), styles.btnLogin]} onPress={handleSubmitPress}>
                <Text style={[tailwind("text-white font-bold text-xl"), styles.txtLogin]}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <Text style={[tailwind("py-8 text-sm"), { fontFamily: "monospace" }]}>- - Hoặc - -</Text>
            <TouchableOpacity style={[tailwind('bg-purple-300 flex justify-center items-center rounded-full'), styles.btnLogin]} onPress={() => { navigation.navigate('Login') }}>
                <Text style={[tailwind("text-white font-bold text-xl"), styles.txtLogin]}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
        </View>

    );
}

const DEVICE_WIDTH = Dimensions.get('window').width;


const styles = StyleSheet.create({
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },

    txtInput: {
        color: "black",
        width: DEVICE_WIDTH - 80,
        borderColor: '#0080ff', // if you need 
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 10,
        height: 50,

    },
    btnLogin: {
        width: DEVICE_WIDTH - 80,
        marginTop: 2,
        padding: 10,
    },
    txtLogin: {
        fontFamily: "serif"
    }
})

export default Login
