import React, { useState, useEffect }from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert,  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import geohash from "ngeohash";

//Custome Components
import firebase from '../../shared/firebase';
import DismissKeyBoard from '../../shared/dismissKeyboard';
import GoogleAutocomplete from '../../shared/googleautocomplete'
import Button from '../../shared/button'


const PostEvent = () =>{

useEffect(()=>{
    setUsername(firebase.auth())
    setPicked(false);
},[userName])    
    
/*******************************
 * FUNCTIONS AREA
 * 
 ********************************/
const logInfo = (values) =>{  
    console.log(date.toString());
  }
 

const findImage = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync();

    if(!result.cancelled){
        setName(Math.random().toString());
        setPicked(true);
        global.finalImage = result.uri;
        setIma(global.finalImage);
     }else{
        setPicked(false);
     }
 }

const uploadImage = async() => {
    const response = await fetch(global.finalImage);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + name);
    global.s = blob
    return ref.put(blob);
}

  
/*******************************
 *
 * 
 ********************************/
/*******************************
 *STATE AREA
* 
********************************/
 
const [name, setName] = useState();
const [picked, setPicked] = useState(false);
const [ima, setIma] = useState();

const [userName, setUsername] = useState({currentUser:{email:null, displayName:null}});

  const initialValues = {
        user: userName.currentUser.displayName, 
        description: '',
        datePosted: new Date(), 
        location: '', 
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

                if(values.description != '' && values.title != '' && values.location != ''  && name != undefined){
                    uploadImage();
                   
                    firebase.firestore().collection('PostedFunActivities').add({
                        user: firebase.auth().currentUser.displayName,
                        description: values.description,
                        datePosted: values.datePosted.toDateString(),
                        timePosted: values.datePosted.toTimeString(),
                        location: values.location,
                        title: values.title,
                        image: name,
                        userId : firebase.auth().currentUser.uid,
                        geolocation: values.geolocation,
                        });  
                        Alert.alert(
                           'Submitted!',
                           'Thank you for submitting an activity!'
                       )
                       resetForm({values: initialValues})
                       setIma('');
                       global.googlePlacesAutocomplete.setAddressText("");
                    }else{
                       Alert.alert(
                           'Error!',
                           'Please make sure to have all inputs filled'
                       )
                    }
               }
            
            }>
            {props =>(
            <ScrollView keyboardShouldPersistTaps='always'>
            <DismissKeyBoard>
            <View style={{flex:1}}>
            {/* <View  style={styles.form}><Text  style={styles.textNonEditable}>POST ACTIVITY:</Text></View> */}
               
                <View>
                <View  style={styles.form}><Text  style={styles.textNonEditable}>POST ACTIVITY:</Text></View>     

                    <GoogleAutocomplete 
                            placeholder = 'Insert location '
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
                    {/* <Text style={styles.textNonEditable}>{userName.currentUser.displayName}</Text> */}
                    <TextInput
                        placeholder= 'Title'
                        onChangeText = {props.handleChange('title')}
                        value = {props.values.title} 
                        style={styles.text}/>
                    <TextInput
                        placeholder= 'Description'
                        multiline={true}
                        onChangeText = {props.handleChange('description')}
                        value = {props.values.description} 
                        style={styles.textBox}/>

                    <Button onPress={findImage}>Select Image...</Button>
                    <View style={styles.cardImage}><Image source={{uri: ima}} style={styles.imageFire}/></View>
                    <Text style={{fontSize:12}}>{picked ? 'Image has been selected' : 'No image selected'}</Text>
                        
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
     textNonEditable:{
        paddingTop:15, 
        fontFamily:'Bellota-Regular',
        fontSize: 20,
     },
     text:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        paddingTop:15, 
        fontFamily:'Bellota-Regular',
        fontSize: 20,
        marginBottom:6,
        marginBottom:20,
        backgroundColor:'#ffffff',
        padding:10,
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
        padding: 10
    },
    recap:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        padding: 5,
        width: '90%',
        margin: 15,
    },
    cardImage:{ 
        margin:20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        width: '75%',
        height:250,
        
    },
    imageFire:{
        width:'100%',
        height:'100%',
    },
})

/*******************************
 * 
 * 
 ********************************/

export default PostEvent;