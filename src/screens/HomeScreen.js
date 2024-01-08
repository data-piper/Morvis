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
//import Voice from '@react-native-community/voice';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
//import { apiCall } from '../api/openAI';
//import Tts from 'react-native-tts';
import { dummyMessages } from '../constants';

export default function HomeScreen() {
  const [messages, setMesseages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);

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
            <View className="capce-y-2 flex-1">
              <Text style={{fontSize: wp(5)}} className="text-gray-700 font-semibold ml-1">
                Assistant
              </Text>
              <View
              style={{height: hp(58)}}
              className="bg-neutral-200 rounded-3xl p-4"
              >
              <ScrollView
              bounces={false}
              className="space-y-4"
              showsVerticalScrollIndicator={false}
              >
              {
                messages.map((message, index)=>{
                  if (message.role == 'assisteant'){
                    if(message.content.includes('https'))
                    {
                      // its an ai image  
                      <View key={index} className="flex-row justify-start">
                        <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                          <Image 
                            source={{uri:message.content}}
                            className="roudned-2xl"
                            resizeMode="contains"
                            style={{height: wp(60), width: wp(60)}}
                            />
                        </View>
                      </View>      
                    }else{
                      // its a text
                      return(
                        <View
                          style={{width: wp(70)}}
                           className="bg-emerald-100 rounded-xl p-2 rounded-tl-none">
                          <Text>
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
                          <Text>
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
        {
          <View className="flex justify-center items-center">
          {
            recording ? (
            <TouchableOpacity>
                <Image
                  className="rounded-full"
                  source={require('../../assets/images/voiceLoading.gif')}
                  style={{width: hp(10), height: hp(10)}}
                />
            </TouchableOpacity>
            ): (
              <TouchableOpacity>
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
              className="bg-neutral-400 roudned-3xl p-2 absolute right-2">
              <Text className="text-white font-semibold ">
                clear
              </Text>
              </TouchableOpacity>
            )
          }
          </View>
        }
      </SafeAreaView>
    </View>
  );
}
