import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Card from '../../shared/card'

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';



const FindFunEvent = ({data, profilePictures}) =>{
    return(
    <View>
        <ScrollView>
        <Text>Rendering...</Text>
       {data.map((item, key)=>(  
                <Card key={key}>  
                         <View style={styles.cardImageFirst}><Image source= {{uri: profilePictures[key]}}  style={styles.profilePic} /><Text style={{...styles.txt,...styles.addMarginUser}}>{item.user}</Text></View>
                         <View><Text style={styles.txt}>{item.title}</Text></View>
                         <View style={styles.cardFirstLine}><Text style={styles.txt}>{item.location}</Text></View>
                         <View><Text style={styles.txt}>{item.description}</Text></View>
                         <View style={{flexDirection:'row'}}><Text style={styles.txt}>{item.eventDate}</Text><Text style={styles.txt}> at {item.eventTime}</Text></View>
                        

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

    ad:{
        marginHorizontal: -25,
        marginVertical: 20,
    },
    bottomBanner:{
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
    cardFirstLine:{
        padding: 5,
        flexDirection:'row',
    },
    addMarginLocation:{
        marginLeft: 40,
        fontFamily:'Bellota-Bold',
    },
    addMarginUser:{
        marginLeft: 20,
        fontFamily:'Bellota-Bold',
    },
    txt:{
        fontFamily:'Bellota-Regular',
        fontSize: 18,
    },
})

export default FindFunEvent;