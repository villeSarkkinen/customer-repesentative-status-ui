// @flow
import React from 'react';
// import { View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import RouterPackage from './utils/RouterPackage';


const { Redirect, Route } = RouterPackage;

const ProtectedRoute = ({component: Component, ...rest}: $Rest<Function, Object>) => {


        return(
            <Route render={ () =>(
                rest.isAuthenticated ? (<Component {...rest} />) : <Redirect to='/login' />
            )} />
        )
    }

export default ProtectedRoute;