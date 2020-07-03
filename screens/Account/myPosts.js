import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView, Alert, Modal,TextInput,RefreshControl, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import geohash from "ngeohash";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

import firebase from '../../shared/firebase'
import Card from '../../shared/card'
import Button from '../../shared/button'
import DateTimeImage from '../../shared/dateTimeImage'
import DateTimePicker from '../../shared/dateTimePicker'
import DismissKeyBoard from '../../shared/dismissKeyboard';
import GoogleAutocomplete from '../../shared/googleautocomplete'

//var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date());

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const myPosts = () =>{

    const displayPosts = ()=>{
        console.log(firebase.auth().currentUser.uid)
        var listEvents = [];
        var listActivities = [];  

        var listEventsDocId = [];
        var listActivitiesDocId = [];

        firebase.firestore().collection('PostedFunEvents').where("userId", "==" , firebase.auth().currentUser.uid).get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{ 
                listEvents.push(doc.data());                                         
                })
                setArrEvents(listEvents);   
            });

            firebase.firestore().collection('PostedFunActivities').where("userId", "==" , firebase.auth().currentUser.uid).get().then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{ 
                    listActivities.push(doc.data());                                         
                    })
                    setArrActivities(listActivities);   
                });
        
            if(setArrActivities.length > 0){
             firebase.firestore().collection('PostedFunActivities').where("userId", "==" , firebase.auth().currentUser.uid).get().then(async (querySnapshot) =>{
                const images = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
                    const ref = firebase.storage().ref('images/'+ doc.data().image)
                    const result = await ref.getDownloadURL();
                    return result;                                         
                }));
                    setFunImage(images);
             });
            } 

            firebase.firestore().collection('PostedFunActivities').where("userId", "==" , firebase.auth().currentUser.uid).get().then(async (querySnapshot) =>{
                const profilePictures = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
                    const reference = firebase.storage().ref('userImages/'+ doc.data().userId)
                    const results = await reference.getDownloadURL();
                    return results;                                         
                }));
                    setProfilePicture(profilePictures);
             });

             firebase.firestore().collection('PostedFunEvents').where("userId", "==" , firebase.auth().currentUser.uid).get().then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{ 
                    listEventsDocId.push(doc.id);                            
                    })
                    setEventsId(listEventsDocId)
                
                });

            firebase.firestore().collection('PostedFunActivities').where("userId", "==" , firebase.auth().currentUser.uid).get().then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{ 
                    listActivitiesDocId.push(doc.id);                            
                })
                setActivitiesId(listActivitiesDocId)
                
                });
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

     const uploadImage = async(x,y) => {
        console.log('in here');
        firebase.storage().ref().child("images/" + x).delete();
        const response = await fetch(y);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + x);
        global.s = blob
        return ref.put(blob);
    }


     const onRefresh = React.useCallback(() => { 
        setRefreshing(true);
        wait(3000).then(() => setRefreshing(false));
      }, [refreshing]);

      const closeOutModal = (text)=>{
          if(text == 'event'){
         setModalEventsOpen({visible:false, arr:''})
          }else if (text == 'activity'){
         setModalActivitiesOpen({visible:false, arr:''})
          }
      }

    const [arrEvents, setArrEvents] = useState([]); 
    const [arrActivities, setArrActivities] = useState([]);
    const [funImage, setFunImage] = useState([]);
    const [profilePicture, setProfilePicture] = useState([]);

    const [eventsId, setEventsId] = useState([]);
    const [activitiesId, setActivitiesId] = useState([]);

    const [modalEventsOpen, setModalEventsOpen] = useState({visible:false, key:'', arr:''});
    const [modalActivitiesOpen, setModalActivitiesOpen] = useState({visible:false, key:'', arr:''});
    const [refreshing, setRefreshing] = React.useState(false);
    

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    return(    
    <View>
        <Modal visible={modalEventsOpen.visible} animationType= 'slide' >
        <Formik
            
            initialValues ={{user:firebase.auth().currentUser.displayName,title:modalEventsOpen.arr.title, description:modalEventsOpen.arr.description,eventTime:modalEventsOpen.arr.eventTime, eventDate:modalEventsOpen.arr.eventDate, datePosted:modalEventsOpen.arr.datePosted, location:modalEventsOpen.arr.location, geolocation: modalEventsOpen.arr.geolocation}}
            onSubmit = {(values)=>{
                //console.log(modalEventsOpen.key);
               console.log(date);
               const dateToUpdate =  new Date().toDateString();
               const eventDateUpdate = firebase.firestore.Timestamp.fromDate(date);
               const eventTimeUpdate = firebase.firestore.Timestamp.fromDate(date);

             firebase.firestore().collection('PostedFunEvents').doc(eventsId[modalEventsOpen.key]).update({
                datePosted: dateToUpdate,
                description: values.description, 
                eventDate: eventDateUpdate,
                eventTime:eventTimeUpdate,
                location: values.location,
                geolocation: values.geolocation,
                title: values.title,
                user: firebase.auth().currentUser.displayName,
                userId : firebase.auth().currentUser.uid 
                });
                Alert.alert(
                    'Updated'
                )
                setTimeout(()=> {
                    closeOutModal('event');
                }, 3000)
               // firebase.firestore().collection('PostedFunEvents').doc(eventsId[key]).delete();
            }}
            >
            {props =>(
                     <ScrollView keyboardShouldPersistTaps='always'>
                        
                     <DismissKeyBoard>
                     <View style={{flex:1}}>
                     <View>
                    <View style={styles.form}><Text  style={styles.textNonEditable}>YOUR EVENT:</Text></View>
                             <GoogleAutocomplete 
                                 placeholder = 'Insert new location '
                                 setAddressText= {props.values.location}
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
                             <View style={{width:'60%'}}>
                            <Text style={styles.textNonEditable}>{props.values.location}</Text>
                            </View>
                             <TextInput
                                 onChangeText = {props.handleChange('title')} 
                                 value= {props.values.title}
                                 style={styles.text}/>
                             <TextInput
                                 multiline={true}
                                 onChangeText = {props.handleChange('description')}
                                 value= {props.values.description}
                                 style={styles.textBox}/>
         
                             {/* <Text  style={styles.text} >Click on the below icons to pick a time and a date for the event</Text> */}
                             {/* {props.values.eventTime.toDate().toLocaleTimeString('en-US' ,{timeZone: 'UTC', hour:'2-digit', minute:'2-digit', hour12: false})} */}
                             <DateTimeImage onPress={showTimepicker} name = 'alarm'>{Platform.OS === 'ios' ? props.values.eventTime.toDate().toUTCString().slice(17,22) : ''}</DateTimeImage> 
                             <DateTimeImage onPress={showDatepicker} name = 'calendar'>{Platform.OS === 'ios' ? props.values.eventDate.toDate().toDateString() : ''}</DateTimeImage> 
                         
                              {show && (<DateTimePicker onChange={(event, selectedDate) => {
                                                                const currentDate = selectedDate || date;
                                                                if(Platform.OS !== 'ios'){
                                                                   console.log('I am an Androi')
                                                                   
                                                                  setDate(currentDate);
                                                                   setShow(false);
                                                                }else{
                                                                    console.log('APPLE JERE')
                                                                    mode === 'time' ? props.values.eventTime =  firebase.firestore.Timestamp.fromDate(currentDate) : props.values.eventDate = firebase.firestore.Timestamp.fromDate(currentDate);
                                                                    setDate(currentDate);
                                                                }
                                                               
                                                              //  console.log(firebase.firestore.Timestamp.fromDate(currentDate).toDate().toLocaleTimeString())
                        
                                                                
                                                            }}value = {date} mode = {mode} >
                                        </DateTimePicker>)}

                              <View style={{flexDirection:'row',justifyContent:'space-evenly', width:'60%'}}><MaterialIcons name="cancel" size={26} onPress={()=>{setModalEventsOpen({visible:false, arr:''})}} /><MaterialIcons name="save" size={26} onPress={props.handleSubmit} /></View>
         
                             </View>    
                           
                     </View>       
                     </DismissKeyBoard>     
                     </ScrollView>
                )}
            </Formik>
        </Modal>


        <Modal visible={modalActivitiesOpen.visible} animationType= 'slide'>
        <Formik
            initialValues ={{user:firebase.auth().currentUser.displayName,title:modalActivitiesOpen.arr.title, description:modalActivitiesOpen.arr.description,eventTime:modalActivitiesOpen.arr.eventTime, eventDate:modalActivitiesOpen.arr.eventDate, datePosted:modalActivitiesOpen.arr.datePosted, location:modalActivitiesOpen.arr.location, geolocation: modalActivitiesOpen.arr.geolocation, funImage: modalActivitiesOpen.funImage }}
            onSubmit = {(values)=>{
                console.log(modalActivitiesOpen.key);
               
               const dateToUpdate =  new Date();

             firebase.firestore().collection('PostedFunActivities').doc(activitiesId[modalActivitiesOpen.key]).update({
                datePosted: dateToUpdate.toDateString(),
                description: values.description, 
                image: modalActivitiesOpen.arr.image,
                timePosted: dateToUpdate.toTimeString(),
                location: values.location,
                geolocation: values.geolocation,
                title: values.title,
                user: firebase.auth().currentUser.displayName,
                userId : firebase.auth().currentUser.uid 
                });
                uploadImage(modalActivitiesOpen.arr.image,values.funImage)
                Alert.alert(
                    'Updated'
                )
                setTimeout(()=> {
                    closeOutModal('activity');
                }, 3000)
               // firebase.firestore().collection('PostedFunEvents').doc(eventsId[key]).delete();
            }}
            >
            {props =>(
                     <ScrollView keyboardShouldPersistTaps='always'
                     refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                        
                     <DismissKeyBoard>
                     <View style={{flex:1}}>
                     <View>
                    <View style={styles.form}><Text  style={styles.textNonEditable}>YOUR ACTIVITY:</Text></View>
                             <GoogleAutocomplete 
                                 placeholder = 'Insert new location '
                                 setAddressText= {props.values.location}
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
                            <View style={{width:'60%'}}>
                            <Text style={styles.textNonEditable}>{props.values.location}</Text>
                            </View>
                             <TextInput
                                 onChangeText = {props.handleChange('title')} 
                                 value= {props.values.title}
                                 style={styles.text}/>
                             <TextInput
                                 multiline={true}
                                 onChangeText = {props.handleChange('description')}
                                 value= {props.values.description}
                                 style={styles.textBox}/>
         
                             {/* <Text  style={styles.text} >Click on the below icons to pick a time and a date for the event</Text> */}
                            <View style={styles.cardImage}> 
                             <TouchableOpacity onPress={async()=>{
                                 let result = await ImagePicker.launchImageLibraryAsync();
                                 if(!result.cancelled){
                                     props.values.funImage = result.uri;
                                  }

                             }}><Image source={{uri: props.values.funImage}} style={styles.imageFire} /></TouchableOpacity></View>
                            
                             <View style={{flexDirection:'row',justifyContent:'space-evenly', width:'60%'}}><MaterialIcons name="cancel" size={26} onPress={()=>{setModalActivitiesOpen({visible:false, arr:''})}} /><MaterialIcons name="save" size={26} onPress={props.handleSubmit} /></View>
        
                             </View>    
                           
                     </View>       
                     </DismissKeyBoard>     
                     </ScrollView>
                )}
            </Formik>
        </Modal>




        <ScrollView>
        <View style={{alignItems:'center'}}><Button onPress={displayPosts}>Load your posts</Button></View>
        <Text style={{alignSelf:'center', fontSize:25, margin:20}}>{arrEvents.length > 0 ? 'Your Posted Events' : null }</Text>
        {arrEvents.map((item, key)=>(  
            <Card key={key}>  
                         <View style={styles.cardImageFirst}><Image source= {{uri: profilePicture[0]}}  style={styles.profilePic} /><Text style={styles.txtTitle}> {item.title}</Text></View>
                         <View style={styles.cardFirstLine}><Text style={styles.txt}>{item.location}</Text></View>
                         <View><Text style={styles.txt}> Posted on: {item.datePosted}</Text></View>
                         <View><Text style={styles.txt}> {item.description}</Text></View>
                         <View style={{flexDirection:'row'}}><Text style={styles.txt}> Event Date: {item.eventDate.toDate().toDateString()}</Text></View>
                         <View><Text style={styles.txt}> Event Time: {item.eventTime.toDate().toUTCString().slice(17,22)}</Text></View> 
                    <View style={{flexDirection:'row', alignSelf:'center', width:'50%', justifyContent:'space-around'}}><TouchableOpacity onPress={()=> {
                            console.log(eventsId[key]);
                            //firebase.firestore().collection('PostedFunEvents').doc(eventsId[key]).delete();
                            Alert.alert(
                                "Are you sure you want to delete this post?",
                                "",
                                [
                                  {
                                    text: "Undo",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                  },
                                  { text: "Delete", onPress: () => firebase.firestore().collection('PostedFunEvents').doc(eventsId[key]).delete().then(
                                      Alert.alert(
                                          'Deleted',
                                          'Click on "Load your posts" to view the change'
                                      )
                                  ) }
                                ],
                                { cancelable: false }
                              );
                    }}>
                   
                    <MaterialCommunityIcons name="delete" size={36}/></TouchableOpacity><TouchableOpacity><MaterialIcons name="edit" size={36} onPress={()=>{setModalEventsOpen({visible:true, key:eventsId[key], arr:item, key:key})}} /></TouchableOpacity></View>
                   
                    <View style={styles.ad}><AdMobBanner
                                    style={styles.bottomBanner}
                                    bannerSize="smartBannerPortrait"
                                    adUnitID="ca-app-pub-3162403518854486/3285357598"/></View> 

                                    {/*    ca-app-pub-3162403518854486/3285357598         */}
            </Card>
            ))}
    
        <Text style={{alignSelf:'center', fontSize:25,margin:20}}>{arrActivities.length > 0 ? 'Your Posted Activities' : null }</Text>
        {arrActivities.map((item, key)=>(  
            <Card key={key}>  
                      <View style={styles.cardImageFirst}><Image source= {{uri: profilePicture[0]}}  style={styles.profilePic} /><Text style={styles.txtTitle}> {item.title}</Text></View>
                        <View style={styles.cardFirstLine}><Text style={styles.txt}>{item.location}</Text></View>
                        <View><Text style={styles.txt}> Posted on: {item.datePosted}</Text></View>
                        <View style={styles.cardImage}><Image source= {{uri: funImage[key]}}  style={styles.imageFire} /></View>
                        <View><Text style={styles.txt}>Description: {item.description}</Text></View>
                        <View><Text style={styles.txt}>{item.eventDate}</Text></View>

                        <View style={{flexDirection:'row', alignSelf:'center', width:'50%', justifyContent:'space-around'}}><TouchableOpacity onPress={()=> {
                            console.log(eventsId[key]);
                           // firebase.firestore().collection('PostedFunActivities').doc(activitiesId[key]).delete();
                           Alert.alert(
                            "Are you sure you want to delete this post?",
                            "",
                            [
                              {
                                text: "Undo",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "Delete", onPress: () => firebase.firestore().collection('PostedFunActivities').doc(activitiesId[key]).delete().then(
                                  Alert.alert(
                                      'Deleted',
                                      'Click on "Load your posts" to view the change'
                                  )
                              ) }
                            ],
                            { cancelable: false }
                          );
                    }}><MaterialCommunityIcons name="delete" size={36}  /></TouchableOpacity><TouchableOpacity><MaterialIcons name="edit" size={36} onPress={()=>{setModalActivitiesOpen({visible:true, key:key, arr:item, funImage:funImage[key] })}} /></TouchableOpacity></View>
            
                        <View style={styles.ad}><AdMobBanner
                                    style={styles.bottomBanner}
                                    bannerSize="smartBannerPortrait"
                                    adUnitID="ca-app-pub-3162403518854486/3285357598"/></View> 

                                    {/*    ca-app-pub-3162403518854486/3285357598         */}
            
            </Card>
            ))}
        </ScrollView>
    </View>
    )
}


const styles = StyleSheet.create({
    cardFirstLine:{
        padding: 5,
        flexDirection:'row',
        alignSelf:'center',
        marginBottom:10,
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
    profilePic:{
        width:50,
        height:50,
        borderRadius:400/2,
        borderWidth: StyleSheet.hairlineWidth,
    },
    cardImageFirst:{
        padding: 5,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        
    },
    form:{
        alignItems: 'flex-start',
        marginTop:'6%',
        alignItems: 'center',
        marginBottom:20,
    },
    formText:{
        marginTop:'3%',
        alignItems:'center'
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
        marginLeft:'1%',
        marginBottom: 15,
    },
    textBox:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        padding:10,
        height: 90,
        width: '70%',
        backgroundColor:'#ffffff',
        borderRadius: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        fontFamily:'Bellota-Regular',
        marginLeft:'1%',
        marginTop:'2%',
    }, 
    ad:{
        marginHorizontal: -25,
        marginVertical: 20,
    },
    bottomBanner:{
    },
    txt:{
        fontFamily:'Bellota-Regular',
        fontSize: 18,
        margin:10,
    },
    txtTitle:{
        fontFamily:'Bellota-Bold',
        fontSize: 20,
    },
    
})
    

export default myPosts;