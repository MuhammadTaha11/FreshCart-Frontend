import { View, Text, TouchableOpacity, useColorScheme, ScrollView } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "../../components/themed-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../../api/api.js";
import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../components/ui/OrderCard.tsx"

const Orders = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [orders, setOrders] = useState([])

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter(
        (order) =>
          order.status.toLowerCase() === selectedStatus.toLowerCase()
      );

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

  return (
    <SafeAreaView className="pb-5">
      <View className="flex-row items-center h-[60px] border-b border-b-gray-500">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={colorScheme === "dark" ? "white" : "black"}
            className="ml-2"
          />
        </TouchableOpacity>
        <ThemedText className="text-3xl font-bold text-right w-[48%]">
          My Orders
        </ThemedText>
      </View>
      <ScrollView className={"w-[90%] mx-auto"} showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between mt-4 mb-6">
          {["All", "Pending", "Completed", "Cancelled"].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setSelectedStatus(status)}
              className={`px-4 py-3 rounded-full border ${selectedStatus === status
                ? "bg-green-500 border-green-500"
                : "border-gray-400"
                }`}
            >
              <Text
                className={`font-semibold ${selectedStatus === status ? "text-white" : "text-gray-500"
                  }`}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {filteredOrders.length !== 0 ? (filteredOrders.map((order , index) => (
            <OrderCard
                key={order._id ?? `order-${index}`}
              order={order}
              onPress={() =>
                router.push({
                  pathname: "/order/details",
                  params: {
                    order: JSON.stringify(order),
                  },
                })
              }
            />
          ))) : <>
            <ThemedText className="text-center text-gray-500 mt-20 text-lg">
              No orders found.
            </ThemedText>
          </>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
