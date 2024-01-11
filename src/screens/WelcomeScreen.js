import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, SafeAreaView, Image, Touchable, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function WelcomeScreen() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
            <Text style={{fontSize: wp(10)}} className="text-center font-bold text-gray-700">
                Morvis
            </Text>
            <Text style={{fontSize: wp(4)}}className="text-center tracking-wider font-semibold text-gray-600">
                The future ...
            </Text>
        </View>
        <View className="flex-row justify-center">
        <Image source={require('../../assets/images/welcome.png')}
        style={{width: wp(55), height: wp(55)}}/>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')} className="bg-emerald-600 mx-5 p-4 rounded-2xl">
        <Text style={{fontSize: wp(6)}} className="text-center font-bold text-white"> Lets Start </Text>
        </TouchableOpacity>
  </SafeAreaView>
  )
}