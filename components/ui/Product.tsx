import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "../themed-text";
import api from "../../api/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductProps = {
  id?: string | number;
  name?: string;
  image?: string;
  price?: number;
  quantity?: string;
};

const Product = (props: ProductProps) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const payload = {
      productId: props?.id,
      totalPrice: props?.price,
      quantity: 1,
    };
    try {
      setLoading(true);
      const res = await api.post("/cart", payload);
      console.log("Add to cart response:", res.data);
      Alert.alert("Added", `${props.name} was added to your cart.`);
    } catch (err: any) {
      console.log("STATUS:", err.response?.status);

      console.log("DATA:", err.response?.data);

      console.log("MESSAGE:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-[110px] border border-gray-500 rounded-lg">
      <Image
        source={{ uri: props?.image }}
        resizeMode="cover"
        className="w-full h-28 rounded-t-lg"
      />
      <ThemedText className="text-sm font-bold mt-2 ml-2">
        {props?.name}
      </ThemedText>
      <ThemedText style={{ fontSize: 12 }} className="text-gray-500 ml-2">
        {props?.quantity}
      </ThemedText>
      <ThemedText style={{ fontSize: 14 }} className="text-gray-500 mt-1 ml-2">
        PKR. {props?.price}
      </ThemedText>
      <View className="flex-row items-end justify-end px-2 pb-2">
        <TouchableOpacity
          onPress={handleAddToCart}
          disabled={loading}
          className="bg-green-500 rounded-lg w-9 items-center py-1 justify-center"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ThemedText className="text-white font-bold">+</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Product;
