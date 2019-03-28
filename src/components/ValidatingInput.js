// @flow
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Notification from './Notification';

type ValidatingProps = {
    isValid: boolean,
    placeHolder: string,
    STE?: boolean, 
    onTextChange: Function, 
    msg: string
}



const ValidatingInput = ({isValid, placeHolder, STE, onTextChange, msg}: ValidatingProps) => (
    <View style={{margin: 50}} >
        <TextInput 
            style={!isValid && styles.invalid}
            placeholder={placeHolder}
            secureTextEntry={STE}
            onChangeText={(text: string) => onTextChange(text)}
            autoCapitalize='none'
            autoCorrect={false}
        />
        {!isValid && <Notification msg={msg} type='ERROR' />}
    </View>
)

const styles = StyleSheet.create({
    invalid: {
        borderColor: 'red',
        borderWidth: 1,
        borderBottomWidth: 0
    }
})

ValidatingInput.defaultProps = {
    STE: false
}

export default ValidatingInput;