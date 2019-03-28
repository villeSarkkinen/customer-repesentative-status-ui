// @flow
import React, { useReducer } from 'react';
import { View, AsyncStorage, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';

import RouterPackage from '../components/utils/RouterPackage';
// import ProtectedRoute from '../components/protectedRoute';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import ProtectedRoute from '../components/protectedRoute';
// import loginReducer from '../components/utils/loginReducer';
import useAsyncEffect from '../components/utils/useAsyncEffect';
// import * as loginActionCreators from '../components/utils/loginActionCreators';
import { url, colorRed } from "../components/utils/constants";
import WhiteText from '../components/WhiteText';
// import _loginObject from '../components/utils/loginObject';

const { Switch, Route } = RouterPackage;

const _loginObject = {
    isAuthenticated: false,
    isValid: true,
    msg: "",
    email: { isValid: true, msg: "" },
    password: { isValid: true, msg: "" }
  }

const Navigation = () => {

    // const [loginObject, dispatch] = useReducer(loginReducer, _loginObject);
    const [ auth, setAuth ] = React.useState(false);
    const [ emailMsg, setEmailMsg ] = React.useState('');
    const [ passMsg, setPassMsg ] = React.useState('');
    const [ isLoading, setLoading ] = React.useState(false);
    

    const login = async(email: string, password: string) => {
        if (email === '')
            setEmailMsg('Email cannot be empty');
        else
            setEmailMsg('');
        if (password === '')
            setPassMsg('Password cannot be empty');
        else
            setPassMsg('');

        if (email !== '' && password !== '')
            {
                setLoading(true);
                const data = {
                    email, password
                }
                console.log(data);
                
                if (email === password)
                    {
                        setAuth(true);
                        AsyncStorage.setItem('Auth', 'true');
                    }
                else {
                    console.log('error');
                    setEmailMsg('Email or password is invalid');
                }
                setLoading(false);

                /*
                axios.post(
                    `${url}/login.php`, { 
                data }).then((response) => {
                        console.log(response);
                        if (response.data === 'token')
                            {
                                setAuth(true);
                                AsyncStorage.setItem('Auth', 'true');
                            }
                        else {
                            console.log('error');
                            setEmailMsg('Email or password is invalid');
                        }
                        setLoading(false);
                    })
                    .catch(ex  => {
                        console.log("Something went wrong", ex);
                        setLoading(false);
                        setEmailMsg('Something went wrong');
                    })
                    */
                
            }
    }

    const logout = async() => {
        await AsyncStorage.removeItem('Auth');
        setAuth(false);
    }



    useAsyncEffect(async () => {
        const isLoggedIn = await AsyncStorage.getItem('Auth');
        
        if (isLoggedIn != null) {
            setAuth(true);
        }
    },[])

    
    const newProps = {isAuthenticated: auth, logout};
    const loginProps = { isAuthenticated: auth, login, isLoading, passMsg, emailMsg }
    const logoTextProps = {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
    };

    return(
        <>
            <View style={styles.logoContainer} >
                <StatusBar backgroundColor={colorRed} barStyle="light-content" />
                    <WhiteText {...logoTextProps} >
                        Asiakasvastaavaviikkosparrausstatus
                    </WhiteText>
                    {auth ?
                    (<TouchableOpacity style={{alignContent: 'center'}} onPress={logout} >
                        <WhiteText fontWeight='bold' margin='auto' >Logout</WhiteText>
                    </TouchableOpacity>)
                    :
                    null}
            </View>
                <View style={styles.container}>
                <Switch>
                    <Route path='/login' render={() => <LoginScreen {...loginProps} />} />
                    <ProtectedRoute component={MainScreen} {...newProps} />
                </Switch>
            </View>
        </>
    )
}

export default Navigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#edeff2'
    },
    logoContainer: {
        display: 'flex',
        backgroundColor: colorRed,
        flexDirection: 'row',
        padding: 5,
    }
})


// <Route render={() => <MainScreen authenticated={props.loginObject.isAuthenticated} dispatch={props.dispatch} />} />