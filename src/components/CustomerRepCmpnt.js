// @flow
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Member from './Member';
import type { DataType } from './utils/dataTypes';

const CustomerRepCmpnt = ({data}: {data: DataType}) => {

    const didFail = data === 'data';


    const GroupMap = () => data.groups.map(group => (
        <View key={group.id} style={styles.group}>
        <View>
            <Text>Group {group.id}</Text>
        </View>
            {group.members.map(member => (
                <Member key={member.id} member={member} />
            ))}
        </View>
    ))

    const CoverFailAndNoData = () => {
        let component;

        if (didFail)
            component = <Text>Failed</Text>;
        // else if (data.groups.length === 0)
          //  component = <Text>No data</Text>;
        else
            component = <View style={styles.groupContainer} ><GroupMap /></View>;
        return component;
    }
    
    return (
        <>
            <ScrollView style={styles.scrollStyle} >
                <CoverFailAndNoData />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollStyle: {
        marginBottom: 20,
    },
    groupContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        maxWidth: 1060
    },
    group: {
        width: 280,
        borderWidth: 1,
        borderColor: '#eeeeee',
        margin: 20,
        borderRadius: 4,
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 4,
        backgroundColor: 'white',
    }
})


export default CustomerRepCmpnt;
