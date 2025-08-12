
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../Utils/supabase';
import '../../../global.css';

export default function RegisterScreen({ navigation }) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async ()  => {
    if (! fullname || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
        },
      },
    })

    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      navigation.navigate('Login');
      Alert.alert('Registration Successful', 'Please check your email to confirm your account.');
    }
  }
  

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <View className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-8">
        <View className="space-y-3">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</Text>
          <Text className="text-gray-500 text-center">Get started with your free account</Text>
        </View>

        <View className="space-y-6 gap-4">
          <TextInput
            placeholder="Full Name"
            value={fullname}
            onChangeText={setFullName}
            autoCapitalize='words'
            className="w-full p-4 border-2 border-gray-300 rounded-xl"
            placeholderTextColor="#6b7280"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            className="w-full p-4 border-2 border-gray-300 rounded-xl"
            placeholderTextColor="#6b7280"
            keyboardType="email-address"
          />

          <View className="relative">
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize='none'
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

          <View className="relative">
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize='none'
              className="w-full p-4 border-2 border-gray-300 rounded-xl pr-12"
              placeholderTextColor="#6b7280"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              className="absolute right-3 top-4"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialCommunityIcons 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={20} 
                color="#6b7280" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleRegister} className="w-full bg-blue-600 p-4 rounded-xl">
            <Text className="text-white text-center font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-4 space-x-1">
          <Text className="text-gray-500">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600 font-semibold"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
