import React, { useState,useEffect, useRef, Component } from 'react';
import { StyleSheet,View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import geohash from "ngeohash";


// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     PublisherBanner,
//     AdMobRewarded,
//     setTestDeviceIDAsync,
//   } from 'expo-ads-admob';


//Custom Componenets
import firebase from '../../shared/firebase'
import Card from '../../shared/card'
import Button from '../../shared/button'
import GoogleAutocomplete from '../../shared/googleautocomplete'
import DateTimeImage from '../../shared/dateTimeImage'
import DateTimePicker from '../../shared/dateTimePicker'
import Header from '../../shared/header'
import DismissKeyBoard from '../../shared/dismissKeyboard';



const FindFun = ({navigation}) =>{ 
  
    useEffect(()=>{
        firebase.auth().currentUser.reload().then(()=>{  
        setUsername(firebase.auth())
        firebase.firestore().collection('users').where('email' ,'==', firebase.auth().currentUser.email).get().then(snapshot =>{
            if(snapshot.empty){
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({username: firebase.auth().currentUser.displayName,email:firebase.auth().currentUser.email, name:'', lastName: '', userId: firebase.auth().currentUser.uid})
                findAndSetDefaultImage();
            }
        })
    })     
}) 

    // const initialRender = useRef(true);
    // useEffect(() => {
    //     if(!initialRender.current) {
    //         moveToResults()
    //     } else {
    //       initialRender.current = false;
    //     }
    
    // }, [arrEvents]) // Listening on arr change
    
    
/******************************* 
 * FUNCTIONS AREA
 * 
 ********************************/

 const getGeohashRange = (latitude,longitude,distance)=>{
    console.log(distance);
    if(distance == undefined){distance=0}
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile
  
    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;
  
    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;
  
    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);
  
    return {
      lower,
      upper
    };
}


const findAndSetDefaultImage = async() =>{
    const reference = firebase.storage().ref('userImages/'+ 'Unknown-person.png');
    const imageUri = await reference.getDownloadURL();
    let blob = await fetch(imageUri).then(r => r.blob());
     var ref = firebase.storage().ref().child("userImages/" + firebase.auth().currentUser.uid)
     //console.log('Here',blob)
     ref.put(blob);
    
}

 
const moveToResults = () =>{ 
    if(arrEvents.length > 0 || arrActivities.length > 0){
        console.log('Sending',funImage[0])
        navigation.navigate('Results', {data: {arrEvents: arrEvents,arrActivities: arrActivities, funImage:funImage,profilePicture:profilePicture, profilePictureEvent: profilePictureEvent}})
        setArrActivities([]);
        setArrEvents([]);
        setFunImage([]);
        setProfilePicture([]);
    }else{
      Alert.alert(
          "Place not selected",
          "Please select a place where you want to find fun, then click on Search, then click on Go To Results",
      )
    }}

const showDatepicker = () => {
    if(show === false){
        showMode('date');
    }
    else{
      setShow(false);
    }

 }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
}

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
}

const handlePress = (values)=>{
    var listEvents = [];
    var listActivities = []; 
    const range = getGeohashRange(lat,long,dist);

    //  firebase.firestore().collection('PostedFunEvents').where("location", "==" , place).get().then((querySnapshot) =>{
    //     querySnapshot.forEach((doc) =>{ 
    //         listEvents.push(doc.data());                                         
    //         })
    //         setArrEvents(listEvents);   
    //     });

    
    firebase.firestore().collection('PostedFunEvents').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{ 
                listEvents.push(doc.data());                                         
                })
                setArrEvents(listEvents);   
            });

     firebase.firestore().collection('PostedFunActivities').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) =>{ 
            listActivities.push(doc.data());                                         
            })
            setArrActivities(listActivities);   
        });

     firebase.firestore().collection('PostedFunActivities').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then(async (querySnapshot) =>{
        const images = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
            const ref = firebase.storage().ref('images/'+ doc.data().image)
            const result = await ref.getDownloadURL();
           // console.log('results', result); 
            return result;    
                                               
        }));
            setFunImage(images);
     }).catch(console.log('Handling')); 

     firebase.firestore().collection('PostedFunActivities').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then(async (querySnapshot) =>{
        const profilePictures = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
            const reference = firebase.storage().ref('userImages/'+ doc.data().userId)
            const results = await reference.getDownloadURL();
         //   console.log(results)
            return results;                                         
        }));
            setProfilePicture(profilePictures);
     }).catch(console.log('Handling')); 

     
     firebase.firestore().collection('PostedFunEvents').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then(async (querySnapshot) =>{
        const profilePictures = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
            const reference = firebase.storage().ref('userImages/'+ doc.data().userId)
            const results = await reference.getDownloadURL();
            console.log('THIS RESULT' ,results)
            return results;                                         
        }));
            setProfilePictureEvent(profilePictures);
     }).catch(console.log('Handling')); 

}

/*******************************
 * 
 * 
 ********************************/

/*******************************
 * STATE AREA
 * 
 ********************************/

    
     //For the from to send in
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [place, setPlace] = useState('');
    const [miles, setMiles] = useState(); 

    //Firebase state
    const [arrEvents, setArrEvents] = useState([]); 
    const [arrActivities, setArrActivities] = useState([]);
    const [funImage, setFunImage] = useState([]);
    const [profilePicture, setProfilePicture] = useState([]);
    const [profilePictureEvent, setProfilePictureEvent] = useState([]);

    
    const [userName, setUsername] = useState({currentUser:{email:null, displayName:null}}); 

    const [lat, setLatitude] = useState();
    const [long, setLongitude] = useState();
    const [dist, setDistance] = useState();
       
  /*******************************
 *  
 * 
 ********************************/ 

return(
    <ScrollView keyboardShouldPersistTaps='always'>
    <DismissKeyBoard>
    <View>
    <View  style={styles.container}><Text style={{fontSize: 20, marginTop:'8%', fontFamily:'Bellota-Regular'}}>Search for FUN:</Text></View>

    <View style= {{height:100, paddingTop:'4%', borderBottomWidth:StyleSheet.hairlineWidth, borderColor:'black'}}>

        <GoogleAutocomplete 
         placeholder = 'Insert location '
         onPress={(data, details) => {
                {setPlace(data.description)}
                {setLatitude(details.geometry.location.lat)}
                {setLongitude(details.geometry.location.lng)}
            }}>     
        </GoogleAutocomplete>

    </View>
 
       
      <View style={styles.container}>

        <View style = {{...styles.secondLine}}>

            <Text style={styles.txt}>Within </Text>

            <ModalDropdown 
            defaultValue='select' options={["0","5", '10','20','50', '75']}
            onSelect= {(index,value)=>{
                setDistance(value);
            }}
            dropdownStyle = {styles.dropdownStyle}
            style = {styles.mileageDropdown}>  
            </ModalDropdown>

            <Text style={styles.txt}> miles of</Text> 
        </View>  
        <TextInput  editable={false} style={{...styles.txt,...styles.txtdate,fontSize:20}}>{place==='' ? "" : place}</TextInput> 

       
        <View style = {styles.firstLine}>
            <DateTimeImage onPress={showDatepicker} name = 'calendar' ></DateTimeImage>     
            <TouchableOpacity onPress={showDatepicker} style={{alignSelf:'baseline'}}><Text style={{...styles.txt,...styles.txtdate,...styles.textInputContainer}} >{date.toDateString()}</Text></TouchableOpacity>
        </View>
        {show && (<DateTimePicker onChange={onChange} value = {date} mode = {mode}></DateTimePicker>)}
    
            <Button onPress={handlePress}>Search</Button>   
                <Text style={{marginTop: '5%',   fontFamily:'Bellota-Regular', fontSize: 15}} >{arrEvents.length > 0 || arrActivities.length > 0 ? 'We found ' + arrEvents.length + ' Events and ' +  arrActivities.length  + ' Activities': '' }</Text>
                {arrEvents.length > 0 || arrActivities.length > 0 ? <Button onPress={moveToResults}>Go To Results</Button> : null }

      </View> 

      {/* <View style={{marginTop:10}}><AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3162403518854486/3285357598"
         // working ca-app-pub-3940256099942544/6300978111
         //ca-app-pub-3162403518854486/3285357598
          // Test ID, Replace with your-admob-unit-id
          //testDeviceID="EMULATOR"  
        
        /></View> */}

      </View>       
    </DismissKeyBoard>     
    </ScrollView>   
)}               

/*******************************
 * STYLE AREA
 * 
 ********************************/
    const styles = StyleSheet.create({
        fullPage:{
            flex:1,
        },
        container:{
            paddingTop:5,
            margin: 2, 
            alignItems: 'center'
        },
        firstLine:{
            flexDirection: "row",
            marginTop:'6%',
        },
        secondLine:{
            flexDirection: "row",
            margin:'3%',
            alignItems : 'center'
        },
        mileageDropdown:{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
            padding:5,
            paddingTop:5,
            backgroundColor:'#ffffff',
            fontFamily:'Bellota-Regular',    
        },
        dropdownStyle:{
            width: 100,
            backgroundColor:'#ffffff',
            fontFamily:'Bellota-Regular',
          
        },
        txt:{
            fontSize:20, 
            fontFamily:'Bellota-Regular'
        },
        txtdate:{
            borderColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            fontFamily:'Bellota-Regular'
        },
        cardFirstLine:{
            padding: 5,
            flexDirection:'row',
        },
        cardImage:{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'black',
            width: '75%',
            height:100,
        },
        imageFire:{
            width:'100%',
            height:'100%',
        },
        textInputContainer: {
            backgroundColor: '#ffffff', 
            borderTopWidth: 0,
            borderBottomWidth:0,
            padding:2,
            paddingTop:10,
            paddingBottom:5,
            fontFamily:'Bellota-Regular',
            },
      
    }); 
/*******************************
 *  
 * 
 ********************************/

export default FindFun;

