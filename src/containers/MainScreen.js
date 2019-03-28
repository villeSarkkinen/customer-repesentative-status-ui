// @flow
import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// import { url } from '../components/utils/constants';
import useAsyncEffect from '../components/utils/useAsyncEffect';
import CustomerRepCmpnt from '../components/CustomerRepCmpnt';

const mockData = require('../components/utils/mock.json');

// const { Redirect } = RouterPackage;

const useMedia = (queries: Array<string>, columns: Array<number>, defaultValue: number) => {
    const match = () => columns[queries.findIndex(q => matchMedia(q).matches)] || defaultValue;
    const [ columnValue, setColumnValue ] = React.useState(match);

    React.useEffect(() => {
        window.addEventListener('resize', () => setColumnValue(match));
        return window.removeEventListener(setColumnValue(match))
    }, []);
    return columnValue;

}

const MainScreen = ({logout}: {logout: Function}) => {

    const [ isLoading, setLoading ] = React.useState(true);
    const [ data, setData ] = React.useState({groups: []});
    const [ didErr, setDidErr ] = React.useState(false);

    useAsyncEffect( async() => {
        /*
        const token = await AsyncStorage.getItem('Auth');

        axios.get(`${url}/data.php`, 
        { headers: { "Bearer": token
    }}
        ).then(response => {
                setLoading(false);
                setData(response.data);
                console.log(response)
        }).catch(error => {
            console.log('Something went wrong', error);
            setDidErr(true);
            setLoading(false);
            
        })
        */
       setLoading(false);
       setData(mockData);
    }, [])

    React.useEffect(() => {

    },[])

    const spinner = isLoading ? <Text>Loading...</Text> : <CustomerRepCmpnt data={data} />;
    const loader = didErr ? <Text>Something went wrong</Text> : spinner;

    return(
        <>
            {loader}
        </>
    )
}

export default MainScreen;