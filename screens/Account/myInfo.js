import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, RefreshControl,SafeAreaView,ScrollView,TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';

import firebase from '../../shared/firebase'
import Button from '../../shared/button'
import Loader from '../../shared/loader'



function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const myInfo = () =>{

    useEffect(()=>{
      firebase.auth().currentUser.reload().then(()=>{
      setUsername(firebase.auth()) 
      getInfo();
      uploadImage() 
      })
   },[name],[lastName]) 


    const getInfo = ()=>{
        firebase.firestore().collection('users').where("email", "==" , firebase.auth().currentUser.email).get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{ 
                 setName(doc.data().name)  
                 setLastName(doc.data().lastName)     
                 uploadImage();
                 firebase.auth().currentUser.reload();
                })
            });   
    }   

    const signOut = () =>{ 
        firebase.auth().signOut() 
    }

    
    const submitForm = ()=>{
      if(name || lastName){
        if(name != '' || lastName != '' ){
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({email:firebase.auth().currentUser.email, name:name, lastName: lastName, image:true})
          Alert.alert(
            'Saved!',
        )
        }else{
          Alert.alert(
            'Error on name or surname',
            'Enter your name and surname'
        )
        }
      }
      if(pass){
        if(pass.length >= 6){
          firebase.auth().currentUser.updatePassword(pass);
        }else{
          Alert.alert(
            'Error on password',
            'Password must be at least 6 character long'
        )
        }
    }
      setPass('');
    } 

    const findImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
            const response = await fetch(result.uri);
            const blob = await response.blob();
            var ref = firebase.storage().ref().child("userImages/" + firebase.auth().currentUser.uid);
            ref.put(blob);
            await uploadImage();
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({image:true});
            
         }   
     } 
    
    const uploadImage = async() =>{
        firebase.auth().currentUser.updateProfile({photoURL:'true'});
        const ref = firebase.storage().ref('userImages/'+ firebase.auth().currentUser.uid) 
        const result = await ref.getDownloadURL(); 

        setLoading(true);
        
        setUploaded(result);    

        wait(3000).then(() => setLoading(false));
        return result    
    } 
 
    const onRefresh = React.useCallback(() => { 
        getInfo()
        firebase.auth().currentUser.reload().then(()=>{
          uploadImage()
        })
        setRefreshing(true);
        wait(3000).then(() => setRefreshing(false));
      }, [refreshing]);



    const [userName, setUsername] = useState({currentUser:{email:null, displayName:null}});
    const [uploaded, setUploaded] = useState();
    const [refreshing, setRefreshing] = React.useState(false);

    const [name,setName] = useState();
    const [lastName,setLastName] = useState();
    const [pass,setPass] = useState();

    const [loading, setLoading] = useState(false);
  

    return(    
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <View style={styles.touchable}>

        <Loader
              loading={loading} />

        <TouchableOpacity onPress={findImage}>
            <Image 
                source={{uri:uploaded}} 
                style={styles.imageUpload}/>
        <Text style ={styles.txt}>Change your profile picture</Text>
        </TouchableOpacity>
        </View>

        <View style={{flex:1, alignItems:'baseline'}}>
        <View style={{flexDirection: 'row'}}><Text style ={{...styles.txt,...styles.form}}>Username: </Text>
        <Text style ={{...styles.txt,...styles.form,...styles.inputs}}>
           {userName.currentUser.displayName}
        </Text> 
        </View>

        <View style={{flexDirection: 'row'}}><Text style ={{...styles.txt,...styles.form}}>First name: </Text>
        <TextInput 
            value={name}
            onChangeText = {text => setName(text)}
            style ={{...styles.txt,...styles.form,...styles.inputs}}
        /> 
        </View>

        <View style={{flexDirection: 'row'}}><Text style ={{...styles.txt,...styles.form}}>Surname: </Text>
        <TextInput 
            value={lastName}
            onChangeText = {text => setLastName(text)}
            style ={{...styles.txt,...styles.form,...styles.inputs}}
        /> 
        </View>

        <View style={{flexDirection: 'row',}}><Text style ={{...styles.txt,...styles.form}}>Update Password: </Text>
        <TextInput 
            secureTextEntry
            onChangeText = {text => setPass(text)}
            style ={{...styles.txt,...styles.form,...styles.inputs}}
        /> 
        </View>

        {/* <View style={{flexDirection: 'row'}}><Text style ={{...styles.txt,...styles.form}}>Your score: </Text></View> */}

       
        </View>
        <Button onPress={submitForm}>Save</Button>  
        <Button onPress={signOut}>Logout</Button>    
        </ScrollView>
        
   
   
    )
}


const styles = StyleSheet.create({ 
    imageUpload:{
        width:100,
        height:100,
        borderRadius:400/2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    container: {
        marginTop: Constants.statusBarHeight,
        alignItems:'center',
      },
      txt:{
        fontFamily:'Bellota-Regular',
        marginTop: '3%',
      },
      touchable:{
          marginTop: '1%',
          marginBottom: '3%',
          alignSelf:'center',
      },
      form:{
        fontSize: 20,
      },
      inputs:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#000000',
        marginLeft:1,
        marginRight: 2,
        width: '35%'
      },
      scrollView:{
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
     
      }
})

export default myInfo;