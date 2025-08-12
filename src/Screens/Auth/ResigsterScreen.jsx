import React, { useState, useEffect, useRef } from 'react';
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

  // Track if component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    // On unmount, set isMounted to false
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleRegister = async () => {
    if (!fullname || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Signup user with metadata
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullname,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          if (!isMounted.current) return;
          Alert.alert('Registration Error', 'Email is already registered. Please log in.');
        } else {
          if (!isMounted.current) return;
          Alert.alert('Registration Error', signUpError.message);
        }
        return;
      }

      // Insert full name into profiles table
      const userId = signUpData.user.id;

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, full_name: fullname, email: email }]);

      if (profileError) {
        if (!isMounted.current) return;
        Alert.alert('Profile Error', profileError.message);
        return;
      }

      if (!isMounted.current) return;
      Alert.alert('Registration Successful', 'You can now log in with your account!');
      navigation.navigate('Login');
    } catch (error) {
      if (!isMounted.current) return;
      Alert.alert('Unexpected Error', error.message);
    }
  };

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
