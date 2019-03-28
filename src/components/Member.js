// @flow
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WhiteText from './WhiteText';

import type { MemberType } from './utils/dataTypes';

const flexStyleProps = {
        flex: 1
}

const Member = ({member}: {member: MemberType}) => {

    const [isOpen, setOpen] = React.useState(false);

    const LeadsAndDeals = (m: MemberType) => {
        console.log(m);
        let leads = null;
        let deals = null;
        let noData = null;
    
        if (m.leads.length > 0)
            leads = m.leads.map(lead => (
                <View key={lead.id} style={[styles.row, styles.item, styles.lead]} >
                    <WhiteText {...flexStyleProps}>{lead.name}</WhiteText>
                    <WhiteText>{lead.company}</WhiteText>
                </View>
            ))
        if (m.deals.length > 0)
            deals = m.deals.map(deal => (
                <View key={deal.id} style={[styles.item, styles.deal]} >
                    <View style={styles.row}>
                        <WhiteText {...flexStyleProps} >{deal.name}</WhiteText>
                        <WhiteText>{deal.amount} €</WhiteText>
                    </View>
                    <View style={styles.row}>
                        <WhiteText {...flexStyleProps} >work amount: {deal.workAmount}</WhiteText>
                        <WhiteText>close: {deal.closeDate}</WhiteText>
                    </View>
                </View>
            ))

        if (leads === null && deals === null)
                noData = <Text>No data</Text>
        const leadsAndDeals = 
        <View style={{ padding: 5, backgroundColor: '#eeeeee' }} >
            {leads}
            {deals}
            {noData}
        </View>
        return leadsAndDeals
    }

    return(
    <>
        <View style={styles.member}>
            <Text style={{flex: 1}} >{member.name}</Text>
                <TouchableOpacity style={isOpen && {backgroundColor: '#eeeeee'}} onPress={() => setOpen(t => !t)} >
                        <Text>Leads/Deals</Text>
                </TouchableOpacity>
        </View>
        {isOpen ? <LeadsAndDeals {...member} /> : null}
    </>
    )

}

const styles = StyleSheet.create({
    member: {
        display: 'flex',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        padding: 10,
        paddingBottom: 0,
        paddingRight: 0,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        marginBottom: 2,
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 2,
    },
    deal: {
        backgroundColor: '#1976D2'
    },
    lead: {
        backgroundColor: '#67a1e4'
    }
})

export default Member;