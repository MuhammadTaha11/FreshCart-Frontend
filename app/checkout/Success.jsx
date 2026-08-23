import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../../components/themed-text";
import { useLocalSearchParams, useRouter } from "expo-router";

const Success = () => {
  const orderData = useLocalSearchParams();
  const data = JSON.parse(orderData.orderData);
  const router = useRouter()
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="flex items-center justify-center h-full w-[90%] mx-auto">
          <View className="flex items-center justify-center gap-4">
            <Ionicons
              name="checkmark-circle-outline"
              size={100}
              color="green"
              className="mt-4"
            />
            <View className="flex items-center justify-center gap-4 w-[80%]">
              <Text
                style={{ lineHeight: 40 }}
                className="text-4xl text-center font-bold text-green-600"
              >
                Order Placed Successfully! 🎉
              </Text>
              <ThemedText
                className="text-center"
                style={{ fontSize: 22, lineHeight: 30 }}
              >
                Thank you for shopping with us. Your order has been placed
                successfully.
              </ThemedText>
            </View>
          </View>
          <View className="mt-8 px-4 border rounded-xl border-gray-500">
            <View className="flex-row items-center w-full justify-between h-20">
              <ThemedText style={{ fontSize: 18 }}>Order ID</ThemedText>
              <ThemedText className="font-bold">#{data._id.slice(-8).toUpperCase()}</ThemedText>
            </View>
            <View className="flex-row items-center w-full justify-between h-20 border-t border-t-gray-600">
              <ThemedText style={{ fontSize: 18 }}>Order Date</ThemedText>
              <ThemedText className="font-bold">{new Date(data.createdAt).toLocaleDateString()}</ThemedText>
            </View>
            <View className="flex-row items-center w-full justify-between h-20 border-t border-t-gray-600">
              <ThemedText style={{ fontSize: 18 }}>Total Amount</ThemedText>
              <Text
                style={{ fontWeight: "bold" }}
                className="text-lg text-green-600"
              >
                PKR. {data.totalPrice}
              </Text>
            </View>
          </View>
          <View className="w-full">
            <TouchableOpacity onPress={()=>router.push("/(tabs)/orders")} className="bg-green-600 h-16 rounded-xl justify-center items-center  mt-6">
              <Text className="text-whitse text-xl font-bold">
                Go To Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push("/(tabs)")} className="border border-green-600 h-16 rounded-xl justify-center items-center  mt-4">
              <Text className="text-green-600 text-xl font-bold">
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Success;
