import { View, Text, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Login Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
