import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../Utils/supabase';
import '../../../global.css';

export default function LoginScreen({ navigation }) {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      navigation.navigate('Home');
      Alert.alert('Login Successful', 'Welcome back!');
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <View className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-8">
        <View className="space-y-3">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">Login</Text>
        </View>

        <View className="space-y-6 gap-4">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
            className="w-full p-4 border-2 border-gray-300 rounded-xl"
            placeholderTextColor="#6b7280"
          />
          
          <View className="relative">
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              className="w-full p-4 border-2 border-gray-300 rounded-xl pr-12"
              placeholderTextColor="#6b7280"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="absolute right-3 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialCommunityIcons 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color="#6b7280" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="self-end -mt-2 mb-4"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text className="text-blue-600 text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} className="w-full bg-blue-600 p-4 rounded-xl">
            <Text className="text-white text-center font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-2 py-4">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="text-gray-400 text-sm px-4 py-2 bg-gray-50 rounded-full">OR CONTINUE WITH</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <View className="flex-row gap-4 space-x-6">
          <TouchableOpacity 
            className="flex-1 items-center justify-center p-4 border-2 border-gray-200 rounded-xl"
            onPress={() => {}}
          >
            <MaterialCommunityIcons name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 items-center justify-center p-4 border-2 border-gray-200 rounded-xl"
            onPress={() => {}}
          >
            <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-4 space-x-1">
          <Text className="text-gray-500">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-blue-600 font-semibold"> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
