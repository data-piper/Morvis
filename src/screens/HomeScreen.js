import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Voice from '@react-native-community/voice';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
//import { apiCall } from '../api/openAI';
//import Tts from 'react-native-tts';
import { dummyMessages } from '../constants';
import { apiCall } from '../api/openAI';

//export default function HomeScreen() {
const App = () => {
  const [result, setResult] = useState('');
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const clear = ()=>{
    setMessages([]);
  }

  const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {

    console.log('speech result event: ',e);
    const text = e.value[0];
    setResult(text);
  };

  const speechErrorHandler = e=>{
    console.log('speech error: ',e);
  }
  const startRecording = async ()=>{
    setRecording(true);
    try{
      await Voice.start('en-US');
    }catch(error) {
      console.log('error during recording: ', error)
    }
  }
  const stopRecording = async ()=>{
    try{
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('error during recording: ', error);
    }
  }

 const fetchResponse = ()=>{
    if(result.trim(). length>0){
      setLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      apiCall(result.trim(), newMessages).then(res=>{
        //console.log('got api data: ', res);
        setLoading(false);
        if(res.success){
          setMessages([...res.data]);
          setResult('');
        }else{
          Alert.alert('Error', res.msg);
        }
      })
    }
  }

  const stopSpeaking = ()=>{
    Tts.stop();
    setSpeaking(false);
  }
  useEffect(()=>{
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return ()=>{
      //destroy the voice instance
      Voice.destroy().then(Voice.removeAllListeners);
    }
  },[])

  console.log('result: ', result);
  return (
    <View className="flex-1 bg-white">
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView className="flex-1 flex mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image  
              source={require('../../assets/images/bot.png')}
              style={{height: hp(15), width: hp(15)}}
          />
        </View>
        {/* Features */}
        {
          messages.length > 0 ? (
            <View className="space-y-2 flex-1">
              <Text style={{fontSize: wp(5)}} className="text-gray-700 font-semibold ml-1">
                Assistant
              </Text>
              <View
              style={{height: hp(58)}}
              className="bg-neutral-200 rounded-3xl p-4">
              <ScrollView
              bounces={false}
              className="space-y-4"
              showsVerticalScrollIndicator={false}
              >
              {
                messages.map((message, index)=>{
                  if (message.role == 'assistant'){
                    if(message.content.includes('https')){
                      // its an ai image  
                            return (
                      <View key={index} className="flex-row justify-start">
                        <View
                          className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                          <Image 
                            source={{uri:message.content}}
                                      className="rounded-2xl"  
                                      resizeMode="contain" 
                            style={{height: wp(60), width: wp(60)}}
                            />
                        </View>
                      </View>      
                            )
                    }else{
                      // its a text
                      return(
                        <View
                                key={index} style={{width: wp(70)}} 
                                className="bg-emerald-100 p-2 rounded-xl rounded-tl-none">
                                <Text className="text-neutral-800" style={{fontSize: wp(4)}}  >
                            {message.content}
                          </Text>
                        </View>
                      )
                    }
                  }else{
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View 
                          style={{width: wp(70)}}
                           className="bg-white rounded-xl p-2 rounded-tr-none">
                                <Text style={{fontSize: wp(4)}}  >
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    )
                  }
                  return (
                    <View>
                      <Text>(message.count)</Text>
                    </View>
                  )
                })
              }
              </ScrollView>

              </View>

            </View>
          ): (
            <Features />
          )
        }
        
        <View className="flex justify-center items-center">
        {
          recording ? (
                <TouchableOpacity className="space-y-2" onPress={stopRecording}>
          {/** recording stop button */}
              <Image
                className="rounded-full"
                source={require('../../assets/images/voiceLoading.gif')}
                style={{width: hp(10), height: hp(10)}}
              />
          </TouchableOpacity>
          ): (
            <TouchableOpacity onPress={startRecording}>
              {/** recording start button */}
              <Image
                className="rounded-full"
                source={require('../../assets/images/recordingIcon.png')}
                style={{width: hp(10), height: hp(10)}}
              />
          </TouchableOpacity>
          )
        }
        {
          messages.length>0 && (
            <TouchableOpacity
            onPress={clear}
            className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
              <Text className="text-white font-semibold">Clear</Text>
              
            </TouchableOpacity>
          )
        }
        {
          speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-10">
              <Text className="text-white font-semibold"> Stop</Text>
            </TouchableOpacity>
          )
        }
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;