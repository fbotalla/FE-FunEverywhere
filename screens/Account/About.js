import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert ,ScrollView ,SafeAreaView } from 'react-native';

import Button from '../../shared/button'
import firebase from '../../shared/firebase'
import DismissKeyBoard from '../../shared/dismissKeyboard';




const About = () =>{
    var textInput = ''

    const submitFeedback = ()=>{
        const date = new Date()
        if(feedback !== undefined){
        firebase.firestore().collection('feedbacks/'+ firebase.auth().currentUser.email + '/' + date).add({
            user : firebase.auth().currentUser.displayName,
            comment: feedback,
        })
        setFeedback(undefined);
        textInput.clear();
        Alert.alert(
            'Submitted',
            'Thank you for submitting a feedback'
        )
        }else{
            Alert.alert(
                'Error',
                'Please fill the comment box'
            )
        }
    }

    const [feedback, setFeedback] = useState();

    return(  
    <ScrollView style={{flex:1}}>  

        <View style={styles.about}>
            <Text style={{alignItems:'center', fontFamily:'Bellota-Bold'}}>FE-FunEverywhere is an app designed to give access to activities and events in a determined location</Text>
        </View>

        <View>
            <Text style ={styles.txt}>Version: 1.0.0</Text>
            <Text style ={styles.txt}>Developped by: Fabrizio Botalla botalla.fabrizio@gmail.com</Text>
            <Text style ={styles.txt}>Designed by: Emily Jean Purdy epurdy6@yahoo.com</Text>
            <Text style ={styles.txt}>Contact us by email: botalla.fabrizio@gmail.com</Text>
        </View>

        <View style={styles.feedbackView}>
            <Text>Enter your feedback</Text>
            <TextInput
                values={feedback}
                ref={input => { textInput = input }}
                multiline={true}
                onChangeText = {(val)=>{setFeedback(val)}}
                style= {styles.feedbackBox}
            />

            <Button onPress= {submitFeedback}>Submit</Button>
            
        </View>
        </ScrollView>
     
    )
}

const styles = StyleSheet.create({
    feedbackBox:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000000',
        padding:5,
        width: '90%',
        height:90,
        marginTop: 10,
        textAlignVertical: 'top'
    },
    feedbackView:{
        alignItems:'center',
        marginTop: '10%'
    },
    txt:{
        fontFamily:'Bellota-Regular',
        fontSize: 20,
        marginLeft:'5%',
        marginTop: '8%',

      }, 
      container:{
          flex:1
      },
      about:{
          alignItems:'center',
          justifyContent:'center',
          alignContent:'center',
          marginLeft: '15%',
          marginRight: '10%',
          marginTop: 10,
          paddingBottom: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: '#000000'

      }
})

export default About;