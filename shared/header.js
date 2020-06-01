import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


// create the functional component for the header
const Header = () =>{

    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>FunEverywhere</Text>
        </View>
    )
};

/*******************************
 * STYLE AREA
 * 
 ********************************/
const styles = StyleSheet.create({
    header:{
        height:70,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'flex-end',   
    },
    headerText:{
        fontSize: 35,
        color: '#694fad',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: 'Roboto'
      
    }
})
/*******************************
 * 
 * 
 ********************************/

 export default Header;