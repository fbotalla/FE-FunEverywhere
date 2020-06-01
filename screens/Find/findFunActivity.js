import React, {useEffect} from 'react';
import { View, Text,StyleSheet, ScrollView, Image } from 'react-native';
import Card from '../../shared/card'


import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

const FindFunActivity = ({data,image,profilePictures}) =>{

    useEffect(() => {
        console.log('Logging profiles: ',profilePictures[1])
        console.log("Images are: ", image[1]);
    })

    
    return(
        <View>
            <ScrollView>
            <Text>Rendering...</Text>
           {data.map((item, key)=>(  
                    <Card key={key}>  
                             <View style={styles.cardImageFirst}><Image source= {{uri: profilePictures[key]}}  style={styles.profilePic} /><Text style={{...styles.txt,...styles.addMarginUser}}>{item.user}</Text></View>
                             <View><Text style={styles.txt}>{item.title}</Text></View>
                             <View style={styles.cardFirstLine}><Text style={{...styles.txt,...styles.addMarginLocation}}>{item.location}</Text></View>
                             <View><Text style={styles.txt}>{item.datePosted}</Text></View>
                             <View style={styles.cardImage}><Image source= {{uri: image[key]}}  style={styles.imageFire} /></View>
                             <View><Text style={styles.txt}>{item.description}</Text></View>
                             <View><Text style={styles.txt}>{item.eventDate}</Text></View>
                             <View><Text style={styles.txt}>{item.comments}</Text></View>   

                               <View style={styles.ad}><AdMobBanner
                                    style={styles.bottomBanner}
                                    bannerSize="smartBannerPortrait"
                                    adUnitID="ca-app-pub-3940256099942544/6300978111"/></View> 

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
    cardImageFirst:{
        padding: 5,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
    },
    profilePic:{
        width:40,
        height:40,
        borderRadius:400/2,
        borderWidth: StyleSheet.hairlineWidth,
    },
    txt:{
        fontFamily:'Bellota-Regular',
        fontSize: 18,
    },
    addMarginLocation:{
        marginLeft: 40,
        fontFamily:'Bellota-Bold',
    },
    addMarginUser:{
        marginLeft: 20,
        fontFamily:'Bellota-Bold',
    },
    ad:{
        marginHorizontal: -25,
        marginVertical: 20,
    },
    bottomBanner:{
    }
})
    

export default FindFunActivity;