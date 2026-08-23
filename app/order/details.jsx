import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "../../components/themed-text";

const Details = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const { order } = useLocalSearchParams();

  const data = JSON.parse(order);

  const deliveryFee = 100;

  const statusColors = {
    pending: {
      bg: "#FEF3C7",
      text: "#D97706",
    },
    completed: {
      bg: "#DCFCE7",
      text: "#16A34A",
    },
    cancelled: {
      bg: "#FEE2E2",
      text: "#DC2626",
    },
  };

  const colors =
    statusColors[data.status] ?? statusColors.pending;

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center h-16 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={colorScheme === "dark" ? "white" : "black"}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <ThemedText className="text-3xl font-bold w-[80%] text-center">
          Order Details
        </ThemedText>
      </View>

      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Status */}
        <View
          className="rounded-2xl p-5 mt-5"
          style={{ backgroundColor: colors.bg }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "700",
              fontSize: 22,
              textTransform: "capitalize",
            }}
          >
            {data.status}
          </Text>

          <Text className="font-bold mt-2 text-lg">
            #{data._id.slice(-8).toUpperCase()}
          </Text>

          <Text className="mt-1">
            {new Date(data.createdAt).toLocaleString()}
          </Text>
        </View>

        {/* Items */}
        <ThemedText className="font-bold text-xl mt-8 mb-4">
          Items ({data.items.length})
        </ThemedText>

        <View className="border border-gray-300 rounded-2xl p-4">
          {data.items.map((item) => (
            <View
              key={item._id}
              className="flex-row justify-between items-center py-4 "
            >
              <View className="flex-row items-center flex-1">
                <Image
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="contain"
                  className="w-16 h-16 rounded-xl bg-white"
                />

                <View className="ml-4 flex-1">
                  <ThemedText className="font-bold">
                    {item.name}
                  </ThemedText>

                  <ThemedText className="text-gray-500">
                    Qty: {item.quantity}
                  </ThemedText>

                  <ThemedText className="text-green-600 font-bold mt-1">
                    PKR. {item.price}
                  </ThemedText>
                </View>
              </View>

              <ThemedText className="font-bold">
                PKR. {item.price * item.quantity}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <ThemedText className="font-bold text-xl mt-8 mb-4">
          Payment Summary
        </ThemedText>

        <View className="border border-gray-300 rounded-2xl p-5">
          <View className="flex-row justify-between">
            <ThemedText>Subtotal</ThemedText>
            <ThemedText>PKR. {data.totalPrice}</ThemedText>
          </View>

          <View className="flex-row justify-between mt-4">
            <ThemedText>Delivery</ThemedText>
            <ThemedText>PKR. {deliveryFee}</ThemedText>
          </View>

          <View className="border-t border-gray-300 mt-5 pt-5 flex-row justify-between">
            <ThemedText className="font-bold text-lg">
              Total
            </ThemedText>

            <Text
              style={{
                color: "#22c55e",
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              PKR. {data.totalPrice + deliveryFee}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <ThemedText className="font-bold text-xl mt-8 mb-4">
          Payment Method
        </ThemedText>

        <View className="border border-gray-300 rounded-2xl p-5 flex-row items-center">
          <Ionicons
            name="cash-outline"
            size={24}
            color="#22c55e"
          />

          <ThemedText className="ml-4 font-bold">
            Cash on Delivery
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;