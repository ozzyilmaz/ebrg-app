import React,{useEffect,useRef,useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,BackHandler,Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {StatusBar} from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import {activateKeepAwakeAsync} from 'expo-keep-awake';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync().catch(()=>{});
const URL='https://ebrg.iyziweb.app/?app=1';
export default function App(){
 const wv=useRef(null);const [err,setErr]=useState(false);const [key,setKey]=useState(0);
 useEffect(()=>{ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(()=>{});activateKeepAwakeAsync().catch(()=>{});
  const s=BackHandler.addEventListener('hardwareBackPress',()=>{wv.current&&wv.current.goBack();return true});return()=>s.remove()},[]);
 return <View style={st.f}><StatusBar hidden/>
  {err?<View style={st.e}><Text style={st.t}>Bağlantı yok</Text><TouchableOpacity style={st.b} onPress={()=>{setErr(false);setKey(k=>k+1)}}><Text style={st.bt}>TEKRAR DENE</Text></TouchableOpacity></View>:
  <WebView key={key} ref={wv} source={{uri:URL}} style={st.f} originWhitelist={['*']} javaScriptEnabled domStorageEnabled
   allowsInlineMediaPlayback mediaPlaybackRequiresUserAction={false} bounces={false} scrollEnabled={false} overScrollMode="never"
   setSupportMultipleWindows={false} allowsBackForwardNavigationGestures={false} textZoom={100} cacheEnabled
   onLoadEnd={()=>SplashScreen.hideAsync().catch(()=>{})} onError={()=>{setErr(true);SplashScreen.hideAsync().catch(()=>{})}}
   onHttpError={()=>{}} webviewDebuggingEnabled={false}/>}
 </View>}
const st=StyleSheet.create({f:{flex:1,backgroundColor:'#0b0e13'},e:{flex:1,backgroundColor:'#0b0e13',alignItems:'center',justifyContent:'center',gap:16},t:{color:'#fff',fontSize:18,fontWeight:'700'},b:{backgroundColor:'#ff9b3d',paddingHorizontal:26,paddingVertical:12,borderRadius:12},bt:{color:'#1a0d00',fontWeight:'900'}});
