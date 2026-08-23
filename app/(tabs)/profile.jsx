import { View, Text, useColorScheme, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '../../components/themed-text'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import api from "../../api/api.js"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons, MaterialCommunityIcons, } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import { useAuth } from '../../context/AuthContext.jsx'

const Profile = () => {

  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([])
  const router = useRouter()


  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const fetchProfile = async () => {
    try {
      // await AsyncStorage.removeItem("token");
      const res = await api.get("/profile");

      console.log("USER:", res.data.user);

      setUser(res.data.user);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  ).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView className="w-[90%] mx-auto">
        <ThemedText style={{ fontSize: 25 }} className="mt-4">My Profile</ThemedText>
        <Text className="text-gray-500 mt-2">Manage your account and preferences.</Text>
        <View className="flex-row items-center mt-6">
          <Ionicons name="person-circle" className="rounded-full" size={70} color={colorScheme === "dark" ? "white" : "black"}
          />
          <ThemedText className="text-lg font-bold ml-2">{user?.email}</ThemedText>
        </View>
        <View className="flex-row mt-6 h-32 rounded-lg justify-around items-center" style={{ backgroundColor: colorScheme === "dark" ? "#1F2937" : "#e5e7eb" }}>
          <View className="justify-center items-center">
            <View className="w-10 h-10 bg-[#DCFCE7] rounded-full justify-center items-center">
              <Ionicons name="bag-handle-outline" size={22} color="#16A34A" />
            </View>
            <ThemedText className="font-bold mt-2">{orders.length}</ThemedText>
            <ThemedText style={{ fontSize: 14 }} className="text-gray-500 text-sm">Total Orders</ThemedText>
          </View>
          <View className="justify-center items-center">
            <View className="w-10 h-10 bg-[#FEF3C7] rounded-full justify-center items-center">
              <Ionicons name="time-outline" size={22} color="#D97706" />
            </View>
            <ThemedText className="font-bold mt-2">{pendingOrders}</ThemedText>
            <ThemedText style={{ fontSize: 14 }} className="text-gray-500 text-sm">Pending</ThemedText>
          </View>
          <View className="justify-center items-center">
            <View className="w-10 h-10 bg-[#F3E8FF] rounded-full justify-center items-center">
              <MaterialCommunityIcons name="truck-fast-outline" size={22} color="#3B0764" />
            </View>
            <ThemedText className="font-bold mt-2">{completedOrders}</ThemedText>
            <ThemedText style={{ fontSize: 14 }} className="text-gray-500 text-sm">Completed</ThemedText>
          </View>
          <View className="justify-center items-center">
            <View className="w-10 h-10 bg-[#FEE2E2] rounded-full justify-center items-center">
              <MaterialCommunityIcons name="cancel" size={22} color="#DC2626" />
            </View>
            <ThemedText className="font-bold mt-2">{cancelledOrders}</ThemedText>
            <ThemedText style={{ fontSize: 14 }} className="text-gray-500">Cancelled</ThemedText>
          </View>
        </View>
        <View className="mt-5">
          <TouchableOpacity onPress={() => router.push("/(tabs)")} className="border-b border-b-gray-400 py-4 px-2 flex-row items-center justify-between">
            <ThemedText className="text-lg">Go To Home</ThemedText>
            <MaterialCommunityIcons name='arrow-top-right' size={20} color={colorScheme === "dark" ? 'white' : "black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/cart")} className="border-b border-b-gray-400 py-4 px-2 flex-row items-center justify-between">
            <ThemedText className="text-lg">Check Your Cart</ThemedText>
            <MaterialCommunityIcons name='arrow-top-right' size={20} color={colorScheme === "dark" ? 'white' : "black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/orders")} className="border-b border-b-gray-400 py-4 px-2 flex-row items-center justify-between">
            <ThemedText className="text-lg">Track Your Orders</ThemedText>
            <MaterialCommunityIcons name='arrow-top-right' size={20} color={colorScheme === "dark" ? 'white' : "black"} />
          </TouchableOpacity>
          <TouchableOpacity className="border-b border-b-gray-400 py-4 px-2 flex-row items-center justify-between">
            <ThemedText className="text-lg">Contact Us</ThemedText>
            <MaterialCommunityIcons name='arrow-top-right' size={20} color={colorScheme === "dark" ? 'white' : "black"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout} className="h-14 border border-red-500 rounded-xl justify-center items-center mt-10">
          <Text className="text-lg text-red-500">Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Profile