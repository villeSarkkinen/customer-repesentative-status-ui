// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type NotificationTypes = 'ERROR' | 'WARN';

const Notification = ({type, msg}: {type: NotificationTypes, msg: string}) => (
    <View style={[styles.notification, type === 'ERROR' && styles.error]} >
        <Text>{msg}</Text>
    </View>
)

const styles = StyleSheet.create({
    error: {
        borderColor: 'red',
    },
    notification: {
        borderColor: 'yellow',
        borderWidth: 1,
        padding: 10
    }
})

export default Notification;