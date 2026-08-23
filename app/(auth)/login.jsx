import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/themed-text";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import api from "../../api/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();

  const {login} = useAuth()

  const handleLogin = async () => {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });


    console.log("LOGIN:", res.data);
    await login(res.data.token);

  } catch (error) {
      alert(error.response.data)
  }
};

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          className="flex h-full w-[90%] mx-auto"
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/logoname.png")}
            className="w-72 h-52 mb-12"
          />
          {/* <ThemedText style={{ fontSize: 24 }} className="font-medium ">
            Welcome Back To Our Grocery App
          </ThemedText> */}
          <ThemedText
            style={{ fontSize: 20 }}
            className="text-center font-light mb-8"
          >
            Please Login to continue
          </ThemedText>
          <ThemedText
            style={{ fontSize: 16 }}
            className="font-medium self-start ml-9"
          >
            Email
          </ThemedText>
          <TextInput
            style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}
            className="w-[85%] h-16 border border-gray-600 rounded-2xl px-4 mt-2 outline-none focus:border-green-500 focus:border-[1.5px] duration-1000"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <ThemedText
            style={{ fontSize: 16 }}
            className="font-medium self-start ml-9 mt-4"
          >
            Password
          </ThemedText>
          <KeyboardAvoidingView
            style={{ width: "100%" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={50}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}
                className="w-[85%] h-16 border border-gray-600 rounded-2xl outline-none px-4 mt-2 focus:border-green-500 focus:border-[1.5px] duration-1000"
                placeholder="Enter Your Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
            </ScrollView>
          </KeyboardAvoidingView>
          <TouchableOpacity
            onPress={handleLogin}
            className="w-[85%] h-16 bg-green-500 rounded-2xl flex items-center justify-center mt-14"
          >
            <ThemedText className="text-white text-lg font-medium">
              Login
            </ThemedText>
          </TouchableOpacity>
          <View className="w-[75%] h-[1px] mt-6 bg-gray-400 rounded-full"></View>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text className="text-center mt-[16px] mx-auto text-green-600">
              {`Don't Have An Account?`}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;
