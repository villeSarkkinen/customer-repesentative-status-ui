// @flow
import React from 'react';
import { Text } from 'react-native';

type ChildType = Array<number | string>;

const WhiteText = ({children, ...rest}: $Rest<Object, ChildType>) => {

    console.log(rest);
    
    return(
        <Text style={{color: 'white', margin: 5, ...rest}}  >{children}</Text>
    );
}

export default WhiteText;