import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import tailwind from 'tailwind-rn';

import Loader from '../containers/Loader';

const Regis = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);
    const usernameInputRef = createRef();
    const emailInputRef = createRef();
    const phoneInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmpasswordInputRef = createRef();
    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPhone) {
            alert('Please fill Phone');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        if (!confirmPass) {
            alert('Please confirm Password');
            return;
        }
        //Show Loader
        setLoading(true);
        var dataToSend = {
            name: userName,
            email: userEmail,
            phone: userPhone,
            password: userPassword,
            confirm: confirmPass
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://api-rn.glitch.me/api/user/register', {
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
                    setIsRegistraionSuccess(true);
                    console.log(
                        'Registration Successful. Please Login to proceed'
                    );
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={[tailwind('flex-1 flex-col  justify-center items-center')]
                }>
                <Image
                    source={require('../assets/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={[tailwind('bg-indigo-300 flex justify-center items-center rounded-lg'), styles.btnRegis]}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate(' ')}>
                    <Text style={[tailwind("text-white font-bold text-xl"), styles.txtRegis]}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={tailwind('flex-1 flex-col justify-center items-center bg-white')}>
            <Loader loading={loading} />
            <Text style={[tailwind('text-purple-600 font-bold text-2xl'), { fontFamily: "serif" }]}>Đăng ký</Text>
            <View style={[tailwind('flex flex-col pt-8 pb-4 ')]}>
                <Text style={[tailwind('text-blue-400')]}>User Name</Text>
                <TextInput

                    style={[tailwind('text-white bg-white'), styles.txtInput]}
                    underlineColorAndroid="transparent"
                    placeholder="Enter User Name" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        usernameInputRef.current &&
                        usernameInputRef.current.focus()
                    }
                    onChangeText={(UserName) =>
                        setUserName(UserName)
                    }
                />
            </View>
            <View style={[tailwind('flex flex-col pb-4 ')]}>
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
                        emailInputRef.current &&
                        emailInputRef.current.focus()
                    }
                    onChangeText={(UserEmail) =>
                        setUserEmail(UserEmail)
                    }
                />
            </View>
            <View style={[tailwind('flex flex-col pb-4 ')]}>
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
                    onSubmitEditing={() =>
                        passwordInputRef.current &&
                        passwordInputRef.current.focus()
                    }
                    returnKeyType="next"
                    onChangeText={(UserPassword) =>
                        setUserPassword(UserPassword)
                    }

                />
            </View>
            <View style={[tailwind('flex flex-col pb-4 ')]}>
                <Text style={[tailwind('text-blue-400 ')]}>Confirm Password</Text>
                <TextInput placeholder=""
                    placeholderTextColor="black"
                    style={[tailwind('text-white bg-white'), styles.txtInput]}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    placeholder="Confirm Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={confirmpasswordInputRef}
                    onSubmitEditing={() =>
                        confirmpasswordInputRef.current &&
                        confirmpasswordInputRef.current.focus()
                    }
                    returnKeyType="next"
                    onChangeText={(ConfirmPassword) =>
                        setConfirmPass(ConfirmPassword)
                    }

                />
            </View>
            <View style={[tailwind('flex flex-col pb-10 ')]}>
                <Text style={[tailwind('text-blue-400')]}>Phone number</Text>
                <TextInput placeholder=""

                    style={[tailwind('text-white bg-white'), styles.txtInput]}
                    underlineColorAndroid="transparent"
                    placeholder="Enter phone number" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        phoneInputRef.current &&
                        phoneInputRef.current.focus()
                    }
                    onChangeText={(UserPhone) =>
                        setUserPhone(UserPhone)
                    }
                />
            </View>

            {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                    {errortext}
                </Text>
            ) : null}
            <TouchableOpacity style={[tailwind('bg-blue-300 flex justify-center items-center rounded-full'), styles.btnRegis]} onPress={handleSubmitButton}>
                <Text style={[tailwind("text-white font-bold text-xl"), styles.txtRegis]}>ĐĂNG KÝ</Text>
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
    container: {

    },
    txtInput: {

        color: "black",
        width: DEVICE_WIDTH - 80,
        borderColor: '#0080ff', // if you need 
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 10,

    },
    btnRegis: {
        width: DEVICE_WIDTH - 80,
        marginTop: 2,
        padding: 10,


    },
    txtRegis: {
        fontFamily: "serif"
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
})

export default Regis
