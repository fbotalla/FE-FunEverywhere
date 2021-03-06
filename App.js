import React from 'react';
import * as Font from 'expo-font';
import Navig from './routes/navig'


/** USE THIS TO MAKE THE DB WORK
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

*/



const getFonts = () => Font.loadAsync({
  'LakkiReddy-Regular' : require('./assets/fonts/LakkiReddy-Regular.ttf'),
  'Bellota-Regular' : require('./assets/fonts/Bellota-Regular.ttf'),
  'Bellota-Bold' : require('./assets/fonts/Bellota-Bold.ttf'),
});

export default function App(){ 

    const [fontLoaded, setFontLoaded] = useState(false);

    if(fontLoaded){
      return(
        <Navig/>
    );
    }else{
      return(
        <AppLoading
          startAsync= {getFonts}
          onFinish={()=> setFontLoaded(true)}/>
      )
  }
}

/** 
 *  This is just to fix the timer bug (DISREGARD)
 * 
 */
import { Platform, InteractionManager } from 'react-native';
import { useState } from 'react';
import { AppLoading } from 'expo';
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }
    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };
  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };
  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
