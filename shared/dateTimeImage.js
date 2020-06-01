import React from 'react'
import {Text, View,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dateTimeImage = (props) =>{
    return(
        <TouchableWithoutFeedback onPress={()=>show = false}>
       <View style={{flexDirection:'row' , marginTop: '1%'}}>
            <Text style={{fontSize:16, fontFamily:'Bellota-Regular', alignSelf:'center'}}>{props.children}</Text>
            <TouchableOpacity onPress={props.onPress}><MaterialCommunityIcons name={props.name} color={'#faa19b'} size={35} spin={true} /></TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
        
    )
}

export default dateTimeImage;