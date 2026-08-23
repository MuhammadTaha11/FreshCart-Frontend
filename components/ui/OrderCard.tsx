import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "../themed-text";

type OrderCardProps = {
  order: any;
  onPress?: () => void;
};

const OrderCard = ({ order, onPress }: OrderCardProps) => {
  const statusColor = {
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
    statusColor[order.status as keyof typeof statusColor] ??
    statusColor.pending;

  return (
    <View className="border border-gray-600 rounded-2xl p-4 mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <ThemedText className="font-bold text-lg">
            #{order._id.slice(-8).toUpperCase()}
          </ThemedText>

          <ThemedText className="text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </ThemedText>
        </View>

        <View
          style={{
            backgroundColor: colors.bg,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {order.status}
          </Text>
        </View>
      </View>

      {/* Product Images */}
      <View className="flex-row mt-4">
        {order.items.slice(0, 4).map((item: any, index: number) => (
          <Image
            key={`${item.productId._id}-${index}`}
            source={{ uri: item.image }}
            className="w-14 h-14 rounded-xl mr-2 bg-white"
            resizeMode="contain"
          />
        ))}

        {order.items.length > 4 && (
          <View className="w-14 h-14 rounded-xl bg-gray-200 justify-center items-center">
            <Text>+{order.items.length - 4}</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center mt-5 pt-4 border-t border-gray-300">
        <View>
          <ThemedText className="text-gray-500">
            {order.items.length} item(s)
          </ThemedText>

          <ThemedText className="font-bold text-lg text-green-600">
            PKR. {order.totalPrice}
          </ThemedText>
        </View>

        <TouchableOpacity
          onPress={onPress}
          className="bg-green-500 px-5 py-2 rounded-xl"
        >
          <Text className="text-white font-bold">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCard;
