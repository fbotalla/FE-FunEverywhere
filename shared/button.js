import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'

const Button = (props) =>{
  return(
    <View  style={styles.viewbtn}>
        <TouchableOpacity onPress={props.onPress} style={styles.btn} >
             <Text style={styles.txtbtn}>{props.children}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles= StyleSheet.create({
    btn:{
        backgroundColor: '#a3def0',
        marginTop: 20,
        padding:10,
        width: 170,   
        alignItems: 'center',
        borderRadius : 20,
    },
    txtbtn:{
        fontSize: 16,
        color: 'black',     
        fontFamily: 'Bellota-Bold'
    },
})

export default Button;