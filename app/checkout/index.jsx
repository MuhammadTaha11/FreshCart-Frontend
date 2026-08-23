import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/api";
import { ThemedText } from "../../components/themed-text";

const Checkout = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const cart = useLocalSearchParams();
  const [productsMap, setProductsMap] = useState({});

  const cartItems = JSON.parse(cart.cart);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );

  const fetchProductById = async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      setProductsMap((prev) => ({ ...prev, [productId]: response.data }));
      // console.log("Fetched product", response.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log(cartItems);
  });

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    const ids = [
      ...new Set(cartItems.map((i) => i?.productId).filter(Boolean)),
    ];
    ids.forEach((id) => {
      if (!productsMap[id]) {
        fetchProductById(id);
      }
    });
  }, [cartItems]);

  const placeOrder = async () => {
    try {
      const res = await api.post("/orders");
      console.log(res.data);
      router.push({
        pathname: "/checkout/Success",
        params: { orderData: JSON.stringify(res.data.order) },
      });
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ marginBottom: 85 }}>
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
            Checkout
          </ThemedText>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex w-[90%] mt-4 mx-auto h-full"
        >
          <View className="flex flex-row justify-between items-center w-full mt-2">
            <ThemedText className="font-bold text-lg">
              Delivery Address
            </ThemedText>
            <Text className="text-[#22c55e]">Change</Text>
          </View>
          <View className="border w-full border-gray-500 mt-4 p-5 rounded-lg">
            <ThemedText>John Doe</ThemedText>
            <ThemedText className="font-thin w-48 mt-1">
              221B Baker Street, London, NWT 6XE, UK +44 20 7946 0958
            </ThemedText>
          </View>
          <View className="flex flex-row justify-between items-center w-full mt-8">
            <ThemedText className="font-bold text-lg">Order Summary</ThemedText>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-[#22c55e]">Edit Cart</Text>
            </TouchableOpacity>
          </View>
          <View className="border w-full border-gray-500 mt-5 p-5 rounded-lg gap-3">
            {cartItems.map((item) => {
              const product = productsMap[item?.productId];
              return (
                <View
                  key={item?.productId}
                  className="flex flex-row justify-between items-center w-full"
                >
                  <View className="flex flex-row gap-3 items-center">
                    <Image
                      source={{ uri: product?.image }}
                      className="w-14 h-14 rounded-lg bg-contain"
                    />
                    <ThemedText
                      className="text-lg font-bold"
                      style={{ textTransform: "capitalize" }}
                    >
                      {product?.name}
                    </ThemedText>
                    <ThemedText className="font-thin">
                      ({product?.quantity})
                    </ThemedText>
                    <ThemedText className="font-thin">
                      x {item?.quantity}
                    </ThemedText>
                  </View>
                  <ThemedText style={{ fontSize: 14 }} className="font-bold">
                    PKR. {item?.totalPrice}
                  </ThemedText>
                </View>
              );
            })}
            <View className="gap-2 border-t border-gray-500 mt-4 pt-4">
              <View className="flex flex-row justify-between items-center w-full mt-4">
                <ThemedText style={{ fontSize: 17 }}>Subtotal</ThemedText>
                <ThemedText className="font-bold">PKR. {cartTotal}</ThemedText>
              </View>
              <View className="flex flex-row justify-between items-center w-full mt-4">
                <ThemedText style={{ fontSize: 17 }}>Delivery</ThemedText>
                <ThemedText className="font-bold">PKR. 100</ThemedText>
              </View>
              <View className="flex flex-row justify-between items-center w-full mt-4">
                <ThemedText style={{ fontSize: 17, fontWeight: "bold" }}>
                  Total
                </ThemedText>
                <ThemedText className="font-bold" style={{ color: "#22c55e" }}>
                  PKR. {cartTotal + 100}
                </ThemedText>
              </View>
            </View>
          </View>
          <ThemedText className="font-bold text-lg mt-8">
            Payment Method
          </ThemedText>
          <View className="border border-[#22c55e] mt-4 p-5 rounded-xl flex-row items-center gap-5">
            <AntDesign name="truck" size={24} color="#22c55e" />
            <Ionicons name="cash-outline" size={24} color="#22c55e" />
            <ThemedText className="font-bold">Cash on Delivery</ThemedText>
          </View>
          <TouchableOpacity
            onPress={placeOrder}
            className="bg-[#22c55e] p-5 rounded-xl mt-4"
          >
            <Text className="text-white font-bold text-lg text-center">
              Place Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Checkout;
