import React, { useState, useEffect }from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import geohash from "ngeohash";



//Custom Components
import firebase from '../../shared/firebase';
import DismissKeyBoard from '../../shared/dismissKeyboard';
import GoogleAutocomplete from '../../shared/googleautocomplete'
import Button from '../../shared/button'
import DateTimeImage from '../../shared/dateTimeImage'
import DateTimePicker from '../../shared/dateTimePicker'


var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date());

const PostEvent = () =>{

useEffect(()=>{
    setUsername(firebase.auth())
},[userName])    
    
/*******************************
 * FUNCTIONS AREA
 * 
 ********************************/
const logInfo = (values) =>{  
    console.log(date.toString());
  }
 
const showTimepicker = () => {
    if(show === false){
        showMode('time');
    }else{
        setShow(false);
    }
  };

 const showDatepicker = () => {
    if(show === false){
        showMode('date');
    }else{
        setShow(false);
    }
  };
 
   const showMode = currentMode => {
     setShow(true);
     setMode(currentMode);
 }
 
   const onChange = (event, selectedDate) => {
     const currentDate = selectedDate || date;
     setShow(Platform.OS === 'ios');
     setDate(currentDate);    
 }

 const tester = ()=>{
    
 }

  
/*******************************
 *
 * 
 ********************************/
/*******************************
 *STATE AREA
* 
********************************/
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [userName, setUsername] = useState({currentUser:{email:null, displayName:null}});

    const initialValues = {
        user: userName.currentUser.displayName, 
        description: '',
        datePosted:  new Date(),//firebase.firestore.Timestamp.fromDate(new Date()),
        location: '', 
        eventDate: '', 
        title: '',
        geolocation: ''
  }

/*******************************
 *
 * 
 ********************************/
    return(
     
       <Formik
            initialValues ={initialValues}
            onSubmit ={(values, {resetForm}) =>{
                if(values.location != '' && values.description != '' && values.datePosted != '' && date != '' && values.title != ''){
                    firebase.firestore().collection('PostedFunEvents').add({
                        datePosted: values.datePosted.toDateString(),
                        description: values.description, 
                        eventDate: date.toDateString(),
                        eventTime: date.toTimeString(),
                        location: values.location,
                        geolocation: values.geolocation,
                        title: values.title,
                        user: firebase.auth().currentUser.displayName,
                        userId : firebase.auth().currentUser.uid
                                               
                        });
                        Alert.alert(
                           'Submitted!',
                           'Thank you for submitting an event!'
                       )
                       resetForm({values: initialValues})
                       global.googlePlacesAutocomplete.setAddressText("");
                    }else{
                       Alert.alert(
                           'Error!',
                           'Please make sure to have all inputs filled'
                       )
                    }     
            }}>
                
            {props =>(
            <ScrollView keyboardShouldPersistTaps='always'>
            <DismissKeyBoard>
            <View style={{flex:1}}>
            
                <View>
                <View  style={styles.form}><Text  style={styles.textNonEditable}>POST EVENT:</Text></View>
                    <GoogleAutocomplete 
                        placeholder = 'Insert location '
                        value= {props.values.location}
                        
                        onPress={(data, details) => {
                                const latitude = details.geometry.location.lat;
                                const longitude = details.geometry.location.lng;

                                const hash = geohash.encode(latitude,longitude);
                                {props.values.location = data.description}
                                {props.values.geolocation = hash}   
                               
                            }}>     
                    </GoogleAutocomplete>
                </View >
                  
                   <View style={styles.formText}>    

                    {/* <Text style={styles.text}>{userName.currentUser.displayName}</Text> */}
                    <TextInput
                        placeholder= 'Title'
                        onChangeText = {props.handleChange('title')} 
                        value= {props.values.title}
                        style={styles.text}/>
                    <TextInput
                        placeholder= 'Description'
                        multiline={true}
                        onChangeText = {props.handleChange('description')}
                        value= {props.values.description}
                        style={styles.textBox}/>

                    {/* <Text  style={styles.text} >Click on the below icons to pick a time and a date for the event</Text> */}

                    <DateTimeImage onPress={showTimepicker} name = 'alarm'>Time:</DateTimeImage> 
                    <DateTimeImage onPress={showDatepicker} name = 'calendar'>Date:</DateTimeImage> 
                
                     {show && (<DateTimePicker onChange={onChange} value = {date} mode = {mode}></DateTimePicker>)}
                        
                    <View style={styles.recap}><Text style={styles.txt}> {props.values.title != '' ? firebase.auth().currentUser.displayName + ' is posting an event with the title '
                                                             + props.values.title + ' on ' + date.toDateString() + ' at ' + date.toTimeString() + ' Location: ' + props.values.location  : ''}</Text></View>
                   
                    <Button onPress={props.handleSubmit}>Submit</Button>
                    </View>    
                  
            </View>       
            </DismissKeyBoard>     
            </ScrollView>
            )}
        </Formik> 
    )
}

/*******************************
 * STYLE AREA
 * 
 ********************************/
const styles = StyleSheet.create({
    form:{
        alignItems: 'flex-start',
        marginTop:'6%',
        alignItems: 'center',
        marginBottom:20,
    },
    formText:{
        alignItems: 'flex-start',
        marginTop:'3%',
        alignItems: 'center',
     },
     container:{
         paddingTop:20,
     },
     text:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        paddingTop:15, 
        fontFamily:'Bellota-Regular',
        fontSize: 20,
        marginBottom:20,
        backgroundColor:'#ffffff',
        padding:10,
    },
    textNonEditable:{
        paddingTop:15, 
        fontFamily:'Bellota-Regular',
        fontSize: 20,
     },
     textBox:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        marginBottom: 8,
        marginTop: 6,
        padding:10,
        height: 90,
        width: '80%',
        backgroundColor:'#ffffff',
        borderRadius: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        fontFamily:'Bellota-Regular',
    },
    viewbtn:{
        paddingTop:15,
    },
    txt:{
        padding:10,
        fontFamily:'Bellota-Regular',
        fontSize: 16,
    },
    recap:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        padding: 5,
        width: '90%',
        marginTop: 8,
    },
    map:{
        width:100,
        height: 100,
    }

})

/*******************************
 * 
 * 
 ********************************/

export default PostEvent;