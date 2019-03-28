// @flow
import React, { useReducer } from 'react';
import { AsyncStorage, SafeAreaView } from 'react-native';
import { colorRed } from "./components/utils/constants";

import Navigation from './containers/Navigation';
// import loginReducer from './components/utils/loginReducer';
// import useAsyncEffect from './components/utils/useAsyncEffect';
// import * as loginActionCreators from './components/utils/loginActionCreators';

import {Router} from './components/utils/RouterPackage';

const _loginObject = {
  isAuthenticated: false,
  email: { isValid: true, msg: "" },
  password: { isValid: true, msg: "" }
}

const App = () => {
/*
  const [loginObject, dispatch] = useReducer(loginReducer, _loginObject);
    
  useAsyncEffect(async () => {
      const isLoggedIn = await AsyncStorage.getItem('Auth');
      console.log(isLoggedIn);
      if (isLoggedIn != null) {
          dispatch({type: loginActionCreators.loggedIn, payload: null});
      }
  },[])
  */

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colorRed}}>
        <Router>
          <Navigation />
        </Router>
      </SafeAreaView>
    );
  }

  export default App;