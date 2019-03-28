// @flow
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// import * as loginActionCreators from '../components/utils/loginActionCreators';
// eslint-disable-next-line import/no-unresolved
import RouterPackage from '../components/utils/RouterPackage';
import ValidatingInput from '../components/ValidatingInput';

const { Redirect } = RouterPackage;


const LoginScreen = ({ emailMsg, passMsg, login, isLoading, isAuthenticated}: {
    emailMsg: string, passMsg: string, login: Function, isLoading: boolean, isAuthenticated: boolean}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    // const [ isloading, setLoading ] = useState(false);
    /*
    const login = () => {
        if(email  !== "" && password !== "")
            if (email === password) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    console.log('Stop loading!');                 
                }, 3000)
            }
    }
    */

    return (
    <View>
        {isAuthenticated ? <Redirect to='/' /> :
        <><ValidatingInput
            placeHolder="Email"
            onTextChange={setEmail}
            isValid={emailMsg === ''}
            msg={emailMsg}
        />
        <ValidatingInput 
            placeHolder="Password"
            onTextChange={setPassword}
            isValid={passMsg === ''}
            msg={passMsg}
            STE
        />
        
        {!isLoading ?
        <TouchableOpacity testID='loginButton' onPress={() => login(email, password)} >
            <Text>Login</Text>
        </TouchableOpacity> :
        <Text>Loading</Text>}
        </> }
    </View>
    )
}

export default LoginScreen;
/*
{!loginObject.isValid &&
        <Notification 
            type='ERROR'
            msg={loginObject.msg}
        />}
*/